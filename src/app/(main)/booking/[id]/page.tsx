'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { motorbikeApi, rentalApi, paymentApi, locationApi, promotionApi } from '@/services/api';
import { Motorbike, CreateRentalDto, RentalStatus, DiscountType, MotorbikeStatus, Promotion } from '@goride/shared';
import {
  Star, MapPin, Calendar, Clock, ShieldCheck,
  Heart, Share2, MessageSquare, ChevronRight,
  ArrowLeft, User, Phone, FileText, Upload,
  CreditCard, CheckCircle2, X, AlertCircle, Camera,
  ChevronDown, Loader2, LocateFixed, ExternalLink, Ticket, Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] pt-32 flex items-center justify-center">
        <div className="h-20 w-20 border-4 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const { isLoggedIn, user: authUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // Get initial dates from query params or defaults
  const initialStart = searchParams.get('start') || new Date().toISOString().split('T')[0];
  const initialEnd = searchParams.get('end') || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const id = params.id as string;
  const [bike, setBike] = useState<Motorbike | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Booking State - Dates
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchBike = async () => {
      setLoading(true);
      try {
        const response = await motorbikeApi.getById(id);
        if (response.success && response.data) {
          setBike(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch bike details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAll();
        if (response.success && response.data) {
          setLocations(response.data);
          // Auto-select first location if unselected
          if (response.data.length > 0) {
            setBookingData(prev => ({
              ...prev,
              pickupLocation: prev.pickupLocation || response.data[0].id.toString(),
              returnLocation: prev.returnLocation || response.data[0].id.toString(),
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    if (id) fetchBike();
    fetchLocations();
  }, [id]);

  const { days, totalPrice, totalPriceRaw } = useMemo(() => {
    if (!bike) return { days: 1, totalPrice: "0 VNĐ", totalPriceRaw: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const finalDays = diffDays > 0 ? diffDays : 1;
    const pricePerDay = bike.pricePerDay;
    const total = finalDays * pricePerDay;

    return {
      days: finalDays,
      totalPrice: total.toLocaleString('vi-VN') + " VNĐ",
      totalPriceRaw: total
    };
  }, [startDate, endDate, bike]);

  const [bookingData, setBookingData] = useState({
    fullName: authUser?.name || '',
    phone: '',
    documentImage: null as string | null,
    pickupLocation: '',
    customPickupLocation: '',
    returnLocation: '',
    customReturnLocation: '',
    notes: '',
    paymentMethod: 'online' // Default to Online Payment
  });

  const [paymentLoading, setPaymentLoading] = useState(false);

  // Promotion state
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const calculatePromoDiscount = (promo: Promotion, basePrice: number) => {
    if (basePrice < (promo.minOrderValue || 0)) {
      return 0;
    }

    if (promo.discountType === DiscountType.PERCENTAGE) {
      return Math.round((basePrice * promo.discountValue) / 100);
    }

    return Math.min(promo.discountValue, basePrice);
  };

  const applyPromoByCode = async (code: string) => {
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) return;

    setPromoLoading(true);
    setPromoError(null);
    setAppliedPromo(null);

    try {
      const response = await promotionApi.applyCode(normalizedCode);
      if (response.success && response.data) {
        const promo = response.data as Promotion;
        if (totalPriceRaw < promo.minOrderValue) {
          setPromoError(`Mã này yêu cầu đơn hàng tối thiểu ${promo.minOrderValue.toLocaleString('vi-VN')} VNĐ`);
          return;
        }

        setPromoCode(normalizedCode);
        setAppliedPromo(promo);
      } else {
        setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
      }
    } catch {
      setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    await applyPromoByCode(promoCode);
  };

  const handleApplySuggestedPromo = async (code: string) => {
    await applyPromoByCode(code);
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionApi.getAll();
        if (response.success && response.data) {
          setPromotions(response.data as Promotion[]);
        }
      } catch (fetchError) {
        console.error('Failed to fetch promotions for booking:', fetchError);
      }
    };

    fetchPromotions();
  }, []);

  const eligiblePromotions = useMemo(() => {
    const now = new Date();

    return promotions.filter((promo) => {
      const isInDateRange = (!promo.startDate || new Date(promo.startDate) <= now) && (!promo.endDate || new Date(promo.endDate) >= now);
      return promo.isActive && isInDateRange && totalPriceRaw >= (promo.minOrderValue || 0);
    });
  }, [promotions, totalPriceRaw]);

  const topPromotions = useMemo(() => {
    if (!eligiblePromotions.length) return [] as Promotion[];

    return [...eligiblePromotions]
      .sort((a, b) => {
        const discountA = calculatePromoDiscount(a, totalPriceRaw);
        const discountB = calculatePromoDiscount(b, totalPriceRaw);
        return discountB - discountA;
      })
      .slice(0, 4);
  }, [eligiblePromotions, totalPriceRaw]);

  const bestPromotion = topPromotions[0] || null;

  const discountAmount = useMemo(() => {
    if (!appliedPromo || !totalPriceRaw) return 0;

    // Check min order value
    if (totalPriceRaw < (appliedPromo.minOrderValue || 0)) {
      return 0;
    }

    if (appliedPromo.discountType === DiscountType.PERCENTAGE) {
      return Math.round(totalPriceRaw * appliedPromo.discountValue / 100);
    }
    return Math.min(appliedPromo.discountValue, totalPriceRaw);
  }, [appliedPromo, totalPriceRaw]);

  const finalPrice = totalPriceRaw - discountAmount;

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdRental, setCreatedRental] = useState<any>(null);
  const [paymentStatus] = useState<string>('PENDING');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Online Payment
  const handleOnlinePayment = async () => {
    if (!createdRental?.id) return;
    setPaymentLoading(true);
    try {
      const response = await paymentApi.createPaymentLink(createdRental.id);
      if (response.success && response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert('Không thể tạo liên kết thanh toán. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Có lỗi xảy ra khi kết nối với cổng thanh toán.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookingData(prev => ({ ...prev, documentImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast here if you have one
  };

  const handleCancelUnpaidBooking = async () => {
    if (!createdRental?.id || !bike?.id || cancelLoading) return;

    const confirmed = window.confirm('Bạn có chắc muốn hủy đơn này? Xe sẽ được mở lại để người khác đặt.');
    if (!confirmed) return;

    setCancelLoading(true);
    setCancelError(null);

    try {
      const cancelRentalResponse = await rentalApi.updateStatus(createdRental.id, RentalStatus.CANCELLED);
      if (!cancelRentalResponse.success) {
        throw new Error(cancelRentalResponse.message || 'Không thể hủy đơn đặt xe.');
      }

      const updateBikeResponse = await motorbikeApi.updateStatus(bike.id, MotorbikeStatus.AVAILABLE);
      if (!updateBikeResponse.success) {
        throw new Error(updateBikeResponse.message || 'Đã hủy đơn nhưng chưa thể cập nhật trạng thái xe.');
      }

      setCreatedRental((prev: any) => ({ ...prev, status: RentalStatus.CANCELLED }));
      setBike((prev) => (prev ? { ...prev, status: MotorbikeStatus.AVAILABLE } : prev));
    } catch (err: any) {
      console.error('Cancel booking failed:', err);
      setCancelError(err?.message || 'Hủy đơn thất bại. Vui lòng thử lại sau.');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!bike || !authUser) return;

    if (!bookingData.phone || bookingData.phone.length < 10) {
      setError('Vui lòng nhập số điện thoại liên hệ hợp lệ.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const getFinalLocation = (type: 'pickup' | 'return') => {
        if (type === 'pickup') {
          return bookingData.pickupLocation === 'Giao xe tận nơi'
            ? `Giao tận nơi: ${bookingData.customPickupLocation}`
            : bookingData.pickupLocation;
        }
        return bookingData.returnLocation === 'Trả xe tại điểm hẹn'
          ? `Trả tại điểm hẹn: ${bookingData.customReturnLocation}`
          : bookingData.returnLocation;
      };

      const rentalDto: CreateRentalDto = {
        motorbikeId: bike.id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        pickupLocation: getFinalLocation('pickup'),
        returnLocation: getFinalLocation('return'),
        promoCode: appliedPromo ? promoCode.trim() : undefined,
        notes: `SĐT liên hệ: ${bookingData.phone} | Phương thức: ${bookingData.paymentMethod}${bookingData.notes ? ` | Ghi chú: ${bookingData.notes}` : ''}`,
      };

      const response = await rentalApi.create(rentalDto);
      if (response.success) {
        setCreatedRental(response.data);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(response.message || 'Có lỗi xảy ra khi đặt xe.');
      }
    } catch (err: any) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Không thể kết nối với máy chủ.');
    } finally {
      setSubmitting(false);
    }
  };


  if (isSuccess && createdRental) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden py-16 md:py-24 px-4" style={{ width: '100vw', maxWidth: '100%' }}>
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cta/10 rounded-full blur-[140px] animate-liquid" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[140px] animate-liquid" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="mx-auto glass-card rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-14 text-center space-y-8 md:space-y-12 relative z-10 border-primary/10 shadow-luxury-2xl backdrop-blur-3xl" style={{ width: '100%', maxWidth: '768px', minWidth: 'min(95vw, 600px)', display: 'block' }}>

          {/* ICON SUCCESS */}
          <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 md:mb-8" style={{ display: 'block' }}>
            <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-emerald-500/20 animate-pulse blur-xl md:blur-2xl" />
            <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-luxury-md border border-white/20">
              <CheckCircle2 className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={2.5} />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-4 md:space-y-6 block w-full">
            <div>
              <span className="text-[10px] sm:text-xs md:text-sm text-cta font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Booking Confirmed</span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.1] tracking-tight text-center w-full block drop-shadow-sm px-1 sm:px-2">
                {paymentStatus === 'COMPLETED' ? 'Thanh toán thành công!' : 'Hành trình sẵn sàng!'}
              </h3>
            </div>

            <div className="flex flex-col items-center gap-6 md:gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex flex-col items-center gap-3 md:gap-4 w-full px-2">
                <span className="text-[10px] sm:text-xs md:text-sm text-primary/40 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Mã đặt chỗ</span>
                <span className="text-xl sm:text-2xl md:text-4xl text-primary font-bold tracking-[0.15em] sm:tracking-[0.2em] bg-primary/5 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-2xl md:rounded-[2rem] border border-primary/10 shadow-inner break-all">
                  #{createdRental.id.substring(0, 8).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10 w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm md:shadow-luxury-sm backdrop-blur-md">
                <div className="bg-white/60 p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center gap-2 md:gap-3 transition-all hover:bg-white/80 group">
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-primary/40 uppercase tracking-widest">Nhận xe</span>
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <MapPin className="text-cta shrink-0 group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="text-sm sm:text-base md:text-xl font-bold text-primary text-center">
                      {bookingData.pickupLocation === 'Giao xe tận nơi' ? (bookingData.customPickupLocation || 'Giao tận nơi') : bookingData.pickupLocation}
                    </span>
                  </div>
                </div>
                <div className="bg-white/60 p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center gap-2 md:gap-3 transition-all hover:bg-white/80 group border-t md:border-t-0 md:border-l border-primary/10">
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-primary/40 uppercase tracking-widest">Trả xe</span>
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <LocateFixed className="text-cta shrink-0 group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="text-sm sm:text-base md:text-xl font-bold text-primary text-center">
                      {bookingData.returnLocation === 'Trả xe tại điểm hẹn' ? (bookingData.customReturnLocation || 'Trả tại điểm hẹn') : bookingData.returnLocation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {bookingData.paymentMethod === 'online' && paymentStatus !== 'COMPLETED' && createdRental?.status !== 'CONFIRMED' && createdRental?.status !== RentalStatus.CANCELLED && (
              <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl md:rounded-[3rem] p-5 sm:p-8 md:p-12 border border-primary/10 space-y-8 md:space-y-10 shadow-md md:shadow-luxury-lg w-full block animate-in fade-in zoom-in-95 duration-700 delay-300">
                <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
                  <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-sm md:shadow-luxury-md border border-primary/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-primary relative z-10" />
                  </div>

                  <div className="text-center space-y-3 md:space-y-4 px-1 sm:px-2">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">Thanh toán trực tuyến</h4>
                    <p className="text-sm sm:text-base md:text-lg text-primary/60 font-medium leading-relaxed max-w-[480px] mx-auto italic">
                      Hành trình Elite đang chờ bạn. Hoàn tất thanh toán qua GoRide Pay để mở khóa ưu đãi độc quyền.
                    </p>
                  </div>

                  <div className="w-full space-y-6 md:space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 md:gap-4 pb-6 md:pb-8 border-b border-primary/10">
                      <span className="text-[10px] sm:text-xs md:text-sm font-black text-primary/40 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Thành tiền</span>
                      <div className="text-center sm:text-right">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-cta drop-shadow-[0_0_15px_rgba(202,138,4,0.15)] break-all">{Number(createdRental.totalPrice).toLocaleString('vi-VN')}</span>
                        <span className="text-xs sm:text-base md:text-lg font-bold text-cta ml-2 uppercase">VNĐ</span>
                      </div>
                    </div>

                    <div className="w-full">
                      <button
                        onClick={handleOnlinePayment}
                        disabled={paymentLoading || cancelLoading}
                        className="w-full h-14 sm:h-20 md:h-24 rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-cta to-yellow-600 text-white flex items-center justify-center gap-3 md:gap-4 text-[11px] sm:text-sm md:text-lg font-black tracking-[0.2em] sm:tracking-[0.3em] shadow-md sm:shadow-luxury-cta hover:shadow-luxury-cta-hover hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 group px-3 md:px-4"
                      >
                        {paymentLoading ? (
                          <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        ) : (
                          <>
                            <span className="truncate">THANH TOÁN NGAY</span>
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCancelUnpaidBooking}
                        disabled={cancelLoading || paymentLoading}
                        className="w-full mt-3 h-12 sm:h-14 rounded-2xl border border-red-500/30 text-red-600 bg-red-50/70 hover:bg-red-100 transition-all text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {cancelLoading ? 'ĐANG HỦY ĐƠN...' : 'HỦY ĐƠN CHƯA THANH TOÁN'}
                      </button>

                      {cancelError && (
                        <p className="text-red-500 text-xs font-semibold mt-3 text-center">{cancelError}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 md:gap-3 opacity-50 w-full px-2">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-primary font-black uppercase tracking-widest text-center">
                      Bảo vệ bởi hệ thống mã hóa GoRide Shield
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
              <Link
                href="/my-rentals"
                className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 flex items-center justify-center gap-3 md:gap-4 rounded-2xl md:rounded-[2rem] bg-primary/5 border border-primary/10 text-primary text-[11px] sm:text-sm md:text-lg font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm sm:shadow-luxury-sm group px-3 md:px-4"
              >
                <span className="truncate">QUẢN LÝ ĐƠN</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
              <Link
                href="/"
                className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 flex items-center justify-center rounded-2xl md:rounded-[2rem] bg-white border border-primary/10 text-primary/60 text-[11px] sm:text-sm md:text-lg font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:text-primary hover:-translate-y-1 transition-all duration-300 shadow-sm sm:shadow-luxury-sm px-3 md:px-4"
              >
                <span className="truncate">VỀ TRANG CHỦ</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black text-primary/30 uppercase tracking-[0.4em] hover:text-cta transition-colors mb-4">
              <ArrowLeft size={14} /> Quay lại trang xe
            </button>
            <h1 className="text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none">
              Hoàn tất <span className="text-cta">Đặt xe</span>
            </h1>
            <p className="text-primary/40 text-sm font-medium italic">Vui lòng kiểm tra và cung cấp thông tin để xác thực hành trình Elite của bạn.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT: Booking Information Form */}
          <div className="lg:col-span-7 space-y-12">

            {/* Section 1: Member Identity */}
            <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-primary/5 shadow-luxury-lg space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta shadow-soft-sm">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Thông tin thành viên</h3>
                  <p className="text-sm text-primary/45 font-medium">Xác thực hồ sơ cho thủ tục bàn giao xe.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="absolute left-8 top-4 text-[10px] font-semibold text-primary/45 tracking-[0.04em] z-10 pointer-events-none">Họ và Tên</label>
                  <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                    <User size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                    <input
                      value={bookingData.fullName}
                      onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                      className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute left-8 top-4 text-[10px] font-semibold text-primary/45 tracking-[0.04em] z-10 pointer-events-none">Số điện thoại</label>
                  <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                    <Phone size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                    <input
                      placeholder="0xxx xxx xxx"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload Area */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between px-2">
                  <h4 className="text-xs font-semibold text-primary/60 tracking-[0.04em] flex items-center gap-2">
                    <Camera size={14} className="text-cta" /> Xác thực GPLX / CCCD
                  </h4>
                  <span className="text-[10px] font-semibold text-cta tracking-[0.04em] px-3 py-1 bg-cta/5 rounded-full">Yêu cầu gốc</span>
                </div>

                {!bookingData.documentImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="h-72 rounded-[2.5rem] border-2 border-dashed border-primary/10 bg-[#FAF9F6] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white hover:border-cta/40 transition-all group overflow-hidden relative shadow-soft-sm"
                  >
                    <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary/20 group-hover:text-cta transition-all group-hover:scale-110 duration-500">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-primary mb-1 block">Tải tập tin hoặc chụp ảnh</span>
                      <p className="text-[11px] font-medium text-primary/45">Kéo thả ảnh GPLX hoặc CCCD của bạn vào đây</p>
                    </div>
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                  </div>
                ) : (
                  <div className="relative h-72 rounded-[2.5rem] overflow-hidden border-2 border-cta shadow-luxury-xl animate-in zoom-in-95 duration-500">
                    <img src={bookingData.documentImage} className="w-full h-full object-cover" alt="Document" />
                    <div className="absolute inset-0 bg-black/20" />
                    <button
                      onClick={() => setBookingData({ ...bookingData, documentImage: null })}
                      className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white text-red-500 shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <X size={20} />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6 bg-cta/95 backdrop-blur-md py-4 rounded-2xl text-center shadow-luxury-sm">
                      <span className="text-[11px] font-semibold text-white tracking-[0.04em] flex items-center justify-center gap-2">
                        <CheckCircle2 size={14} /> Hình ảnh đã được xác thực
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Section 2: Itinerary & Special Requests */}
            <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-primary/5 shadow-luxury-lg space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta shadow-soft-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Hành trình & Yêu cầu</h3>
                  <p className="text-sm text-primary/45 font-medium">Tùy chỉnh điểm giao nhận và yêu cầu đặc biệt.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative group">
                    <label className="absolute left-8 top-4 text-[10px] font-semibold text-primary/45 tracking-[0.04em] z-10 pointer-events-none">Điểm nhận xe</label>
                    <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm relative">
                      <MapPin size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                      <select
                        value={bookingData.pickupLocation}
                        onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                        className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 appearance-none cursor-pointer"
                      >
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                        <option value="Giao xe tận nơi">Giao xe tận nơi (Liên hệ)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 pointer-events-none mt-2" />
                    </div>
                  </div>
                  {bookingData.pickupLocation === 'Giao xe tận nơi' && (
                    <div className="relative group animate-in slide-in-from-top-2 duration-300">
                      <label className="absolute left-8 top-4 text-[10px] font-semibold text-cta/60 tracking-[0.04em] z-10 pointer-events-none">Địa chỉ nhận xe cụ thể</label>
                      <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-cta/5 border border-cta/10 focus-within:border-cta/30 focus-within:ring-4 focus-within:ring-cta/5 transition-all">
                        <LocateFixed size={20} className="text-cta/30 group-focus-within:text-cta transition-colors" />
                        <input
                          placeholder="Nhập địa chỉ nhà, khách sạn..."
                          value={bookingData.customPickupLocation}
                          onChange={(e) => setBookingData({ ...bookingData, customPickupLocation: e.target.value })}
                          className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <label className="absolute left-8 top-4 text-[10px] font-semibold text-primary/45 tracking-[0.04em] z-10 pointer-events-none">Điểm trả xe</label>
                    <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm relative">
                      <MapPin size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                      <select
                        value={bookingData.returnLocation}
                        onChange={(e) => setBookingData({ ...bookingData, returnLocation: e.target.value })}
                        className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 appearance-none cursor-pointer"
                      >
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                        <option value="Trả xe tại điểm hẹn">Trả xe tại điểm hẹn (Liên hệ)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 pointer-events-none mt-2" />
                    </div>
                  </div>
                  {bookingData.returnLocation === 'Trả xe tại điểm hẹn' && (
                    <div className="relative group animate-in slide-in-from-top-2 duration-300">
                      <label className="absolute left-8 top-4 text-[10px] font-semibold text-cta/60 tracking-[0.04em] z-10 pointer-events-none">Địa chỉ trả xe cụ thể</label>
                      <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-cta/5 border border-cta/10 focus-within:border-cta/30 focus-within:ring-4 focus-within:ring-cta/5 transition-all">
                        <LocateFixed size={20} className="text-cta/30 group-focus-within:text-cta transition-colors" />
                        <input
                          placeholder="Nhập địa chỉ trả xe..."
                          value={bookingData.customReturnLocation}
                          onChange={(e) => setBookingData({ ...bookingData, customReturnLocation: e.target.value })}
                          className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative group">
                <label className="absolute left-8 top-4 text-[10px] font-semibold text-primary/45 tracking-[0.04em] z-10 pointer-events-none">Ghi chú & Yêu cầu đặc biệt</label>
                <div className="flex items-start gap-4 min-h-32 pl-8 pr-6 py-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                  <FileText size={20} className="text-primary/10 group-focus-within:text-cta transition-colors mt-4" />
                  <textarea
                    placeholder="Ví dụ: Trang bị nón bảo hiểm Elite Gold, giao xe đúng 8 giờ sáng..."
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: Order Summary Sticky */}
          <aside className="lg:col-span-5 sticky top-10">
            <div className="glass-card bg-white rounded-[3.5rem] border border-primary/5 shadow-luxury-2xl overflow-hidden">
              {/* Bike Summary Hero */}
              <div className="relative h-64 overflow-hidden bg-primary/5 flex items-center justify-center">
                {loading ? (
                  <Loader2 size={40} className="text-cta animate-spin" />
                ) : (
                  <>
                    <img src={bike?.images[0] || "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between text-white">
                      <div>
                        <h4 className="text-2xl font-bold tracking-tighter leading-tight">{bike?.name}</h4>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ShieldCheck size={18} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Itinerary Details */}
              <div className="p-10 md:p-12 space-y-10">
                <div className="space-y-6">
                  <h4 className="text-xs font-semibold text-primary/50 tracking-[0.08em] mb-4">Chi tiết hành trình</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="relative p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group hover:bg-white hover:border-cta/20 transition-all">
                      <p className="text-[10px] font-semibold text-primary/45 tracking-[0.04em] mb-3">Nhận xe</p>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-cta" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="relative p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group hover:bg-white hover:border-cta/20 transition-all">
                      <p className="text-[10px] font-semibold text-primary/45 tracking-[0.04em] mb-3">Trả xe</p>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-primary/20 group-hover:text-cta transition-colors" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-3xl bg-cta/5 border border-cta/10">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-cta" />
                      <span className="text-sm font-semibold text-primary tracking-[0.04em]">Thời gian thuê: {days} ngày</span>
                    </div>
                    <ChevronDown size={14} className="text-cta/30" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-10 border-t border-primary/5 space-y-4">
                  <div className="flex justify-between items-center text-sm font-semibold text-primary/60 tracking-[0.04em] px-2">
                    <span>Giá thuê xe ({days} ngày)</span>
                    <span className="text-primary">{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-primary/60 tracking-[0.04em] px-2">
                    <span>Phí dịch vụ Elite</span>
                    <span className="text-emerald-500">Miễn phí</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-primary/60 tracking-[0.04em] px-2">
                    <span>Bảo hiểm Elite Basic</span>
                    <span className="text-primary">Bao gồm</span>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-4 space-y-3">
                    <p className="text-[10px] font-semibold text-primary/55 tracking-[0.04em] px-2 flex items-center gap-2">
                      <Ticket size={12} className="text-cta" /> Mã khuyến mãi
                    </p>

                    {topPromotions.length > 0 && !appliedPromo && (
                      <div className="mx-2 space-y-2">
                        <p className="text-[10px] font-semibold tracking-[0.04em] text-emerald-600">
                          Mã gợi ý cho đơn này ({topPromotions.length})
                        </p>

                        <div className="grid gap-2">
                          {topPromotions.map((promo) => {
                            const saving = calculatePromoDiscount(promo, totalPriceRaw);
                            const isBest = bestPromotion?.id === promo.id;

                            return (
                              <button
                                key={promo.id}
                                onClick={() => handleApplySuggestedPromo(promo.code)}
                                disabled={promoLoading}
                                className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-emerald-100 transition-all disabled:opacity-50"
                              >
                                <div className="min-w-0">
                                  <p className="text-[11px] font-semibold tracking-[0.04em] text-emerald-700 truncate">
                                    {promo.code}
                                  </p>
                                  <p className="text-[10px] font-bold text-emerald-600 truncate">
                                    Tiết kiệm {saving.toLocaleString('vi-VN')} VNĐ
                                  </p>
                                </div>

                                <div className="shrink-0 text-right">
                                  {isBest && (
                                    <p className="text-[9px] font-semibold tracking-[0.04em] text-emerald-500 mb-1">Tốt nhất</p>
                                  )}
                                  <span className="inline-flex h-8 items-center rounded-xl bg-emerald-600 px-3 text-[10px] font-semibold tracking-[0.04em] text-white">
                                    Chọn mã
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <div className="flex-1 relative group">
                        <input
                          value={promoCode}
                          onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(null); setAppliedPromo(null); }}
                          placeholder="NHẬP MÃ GIẢM GIÁ"
                          disabled={!!appliedPromo}
                          className="w-full h-12 pl-4 pr-4 rounded-2xl bg-[#FAF9F6] border border-primary/10 text-sm font-semibold text-primary tracking-[0.02em] outline-none focus:border-cta/40 focus:ring-2 focus:ring-cta/10 transition-all placeholder:text-primary/30 disabled:opacity-60"
                        />
                      </div>
                      {appliedPromo ? (
                        <button
                          onClick={() => { setAppliedPromo(null); setPromoCode(''); setPromoError(null); }}
                          className="h-12 px-4 rounded-2xl bg-red-50 border border-red-200 text-red-500 text-[11px] font-semibold tracking-[0.04em] hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                          <X size={14} /> Bỏ
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyPromo}
                          disabled={!promoCode.trim() || promoLoading}
                          className="h-12 px-4 rounded-2xl bg-cta text-white text-[11px] font-semibold tracking-[0.04em] hover:bg-cta/90 transition-all disabled:opacity-40 flex items-center gap-2 shrink-0"
                        >
                          {promoLoading ? <Loader2 size={14} className="animate-spin" /> : 'Áp dụng'}
                        </button>
                      )}
                    </div>
                    {promoError && (
                      <p className="text-[10px] font-bold text-red-500 flex items-center gap-2 px-2">
                        <AlertCircle size={12} /> {promoError}
                      </p>
                    )}
                    {appliedPromo && (
                      <div className="flex items-center justify-between px-2 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span className="text-[11px] font-semibold text-emerald-600 tracking-[0.04em]">{appliedPromo.title}</span>
                        </div>
                        <span className="text-[10px] font-black text-emerald-600">
                          -{appliedPromo.discountType === DiscountType.PERCENTAGE ? `${appliedPromo.discountValue}%` : `${appliedPromo.discountValue.toLocaleString('vi-VN')}đ`}
                        </span>
                      </div>
                    )}
                    {appliedPromo && discountAmount > 0 && (
                      <div className="flex justify-between items-center text-sm font-semibold tracking-[0.04em] px-2">
                        <span className="text-emerald-500">Giảm giá</span>
                        <span className="text-emerald-500">-{discountAmount.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 p-8 rounded-3xl bg-primary text-white flex justify-between items-center shadow-luxury-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-full w-40 bg-white/5 skew-x-[-20deg] translate-x-10 transition-transform group-hover:translate-x-0" />
                    <div className="relative z-10">
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-cta mb-2">Tổng thanh toán</p>
                      <p className="text-4xl font-bold tracking-tighter">
                        {finalPrice.toLocaleString('vi-VN')} <span className="text-lg font-medium text-white/40 italic">VNĐ</span>
                      </p>
                      {appliedPromo && discountAmount > 0 && (
                        <p className="text-[10px] text-white/40 line-through mt-1">{totalPrice}</p>
                      )}
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cta shadow-inner relative z-10">
                      <ShieldCheck size={28} />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-500 text-xs font-bold italic">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  disabled={!bookingData.fullName || !bookingData.documentImage || submitting || loading}
                  onClick={handleSubmit}
                  className="luxury-btn-primary w-full py-7 flex items-center justify-center gap-4 text-sm font-semibold tracking-[0.08em] shadow-luxury-2xl group disabled:opacity-50 disabled:grayscale transition-all"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Xác nhận đặt xe ngay
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] font-medium text-primary/45 tracking-[0.04em]">
                  Bằng việc đặt xe, bạn đồng ý với <span className="text-cta">Điều khoản Elite</span> của chúng tôi.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
