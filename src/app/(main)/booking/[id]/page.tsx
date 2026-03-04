'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { motorbikeApi, rentalApi } from '@/services/api';
import { Motorbike, CreateRentalDto, RentalStatus } from '@goride/shared';
import {
  Star, MapPin, Calendar, Clock, ShieldCheck,
  Heart, Share2, MessageSquare, ChevronRight, 
  ArrowLeft, User, Phone, FileText, Upload, 
  CreditCard, CheckCircle2, X, AlertCircle, Camera,
  ChevronDown, Loader2, LocateFixed
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
    if (id) fetchBike();
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
    pickupLocation: 'Quy Nhơn Coastal Hub',
    customPickupLocation: '',
    returnLocation: 'Quy Nhơn Coastal Hub',
    customReturnLocation: '',
    notes: '',
    paymentMethod: 'sepay' // Default to SePay
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdRental, setCreatedRental] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('PENDING');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Polling for payment status
  useEffect(() => {
    let interval: any;
    if (isSuccess && createdRental && bookingData.paymentMethod === 'sepay' && paymentStatus !== 'COMPLETED') {
      interval = setInterval(async () => {
        try {
          const response = await rentalApi.getById(createdRental.id);
          if (response.success && response.data.status === 'CONFIRMED') {
            setPaymentStatus('COMPLETED');
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 5000); // Poll every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isSuccess, createdRental, bookingData.paymentMethod, paymentStatus]);

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
        notes: `SĐT liên hệ: ${bookingData.phone} | Phương thức: ${bookingData.paymentMethod}${bookingData.notes ? ` | Ghi chú: ${bookingData.notes}` : ''}`,
        totalPrice: totalPriceRaw,
        numberOfDays: days
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
    const qrUrl = `/QR_Code.png`;

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-4 py-10 md:py-20 overflow-x-hidden">
      
      <div className="w-full max-w-[640px] bg-white rounded-[40px] md:rounded-[60px] shadow-luxury-2xl border border-primary/5 p-8 md:p-16 text-center space-y-10 relative z-10 mx-auto">

        {/* ICON SUCCESS */}
        <div className="relative mx-auto w-20 h-20 md:w-28 md:h-28">
          <div className="absolute inset-0 rounded-[28px] bg-emerald-500/10 animate-pulse" />
          <div className="relative w-full h-full rounded-[28px] md:rounded-[32px] bg-emerald-500 flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4 px-2 block w-full">
          <h3 className="text-3xl md:text-5xl font-black text-primary leading-[1.2] tracking-tight text-center w-full block">
            {paymentStatus === 'COMPLETED' ? 'Thanh toán thành công!' : 'Hành trình sẵn sàng!'}
          </h3>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] md:text-xs text-primary/30 font-black uppercase tracking-[0.3em]">Mã đặt chỗ</span>
              <span className="text-sm md:text-base text-cta font-bold tracking-widest bg-cta/5 px-6 py-2 rounded-full border border-cta/10 italic">
                #{createdRental.id.substring(0, 8).toUpperCase()}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 py-4 border-y border-primary/5 w-full max-w-sm">
                <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] font-black text-primary/20 uppercase tracking-widest">Nhận xe</span>
                   <span className="text-[11px] font-bold text-primary max-w-[140px] truncate">
                    {bookingData.pickupLocation === 'Giao xe tận nơi' ? (bookingData.customPickupLocation || 'Giao tận nơi') : bookingData.pickupLocation}
                   </span>
                </div>
                <div className="h-8 w-px bg-primary/5 hidden sm:block" />
                <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] font-black text-primary/20 uppercase tracking-widest">Trả xe</span>
                   <span className="text-[11px] font-bold text-primary max-w-[140px] truncate">
                    {bookingData.returnLocation === 'Trả xe tại điểm hẹn' ? (bookingData.customReturnLocation || 'Trả tại điểm hẹn') : bookingData.returnLocation}
                   </span>
                </div>
            </div>
          </div>
        </div>

        {bookingData.paymentMethod === 'sepay' && paymentStatus !== 'COMPLETED' && (
          <div className="bg-[#FAF9F6] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border border-cta/10 space-y-8 shadow-luxury-sm w-full block">
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="space-y-3 w-full">
                 <p className="text-[10px] font-black text-cta/40 uppercase tracking-[0.4em]">VietQR</p>
                 <div className="bg-white p-6 rounded-[2rem] shadow-luxury-md border border-cta/5 inline-block">
                    <img src={qrUrl} alt="VietQR" className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto" />
                 </div>
              </div>
              <div className="text-center space-y-6 w-full block">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-cta uppercase tracking-[0.2em]">Quét mã để thanh toán tự động</p>
                  <p className="text-3xl md:text-5xl font-bold text-primary tracking-tighter italic">
                    {Number(createdRental.totalPrice).toLocaleString('vi-VN')} <span className="text-lg">VNĐ</span>
                  </p>
                </div>

                <div className="grid gap-4 w-full max-w-sm mx-auto">
                   <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-soft-sm flex items-center justify-between group hover:border-cta/20 transition-all">
                      <div className="text-left">
                         <p className="text-[8px] font-black text-primary/30 uppercase tracking-widest mb-1">Nội dung chuyển khoản</p>
                         <p className="text-xs font-bold text-primary tracking-wider">{createdRental.id}</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(createdRental.id)}
                        className="h-10 w-10 rounded-xl bg-cta/5 text-cta flex items-center justify-center hover:bg-cta hover:text-white transition-all shadow-soft-sm"
                      >
                         <FileText size={16} />
                      </button>
                   </div>
                   
                   <div className="bg-white p-4 rounded-2xl border border-primary/5 shadow-soft-sm text-left">
                      <p className="text-[8px] font-black text-primary/30 uppercase tracking-widest mb-1">Thông tin hưởng thụ</p>
                      <p className="text-xs font-bold text-primary">MB Bank - GORIDE ELITE</p>
                      <p className="text-xs font-medium text-primary/60">0393273111</p>
                   </div>
                </div>

                <div className="max-w-[320px] mx-auto bg-cta/5 p-4 rounded-2xl border border-cta/10">
                  <p className="text-[10px] md:text-[11px] text-cta font-bold leading-relaxed italic block">
                    QUAN TRỌNG: Vui lòng giữ nguyên nội dung chuyển khoản để hệ thống tự động xác nhận trong 1-3 phút.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full">
          <Link
            href="/my-rentals"
            className="flex-1 h-16 md:h-20 flex items-center justify-center gap-3 rounded-2xl md:rounded-3xl bg-primary text-white text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-cta transition shadow-luxury-lg px-8 no-wrap"
          >
            XEM HÀNH TRÌNH <ChevronRight size={16} />
          </Link>
          <Link
            href="/"
            className="flex-1 h-16 md:h-20 flex items-center justify-center rounded-2xl md:rounded-3xl border border-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest hover:border-cta hover:text-cta transition px-8 no-wrap"
          >
            VỀ TRANG CHỦ
          </Link>
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
          <div className="flex items-center gap-6 bg-white px-8 py-6 rounded-[2.5rem] border border-primary/5 shadow-luxury-sm">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="h-10 w-10 rounded-full border-4 border-white object-cover" />
                ))}
             </div>
             <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest leading-relaxed">
               <span className="text-primary block">2.4k+ Thành viên</span>
               đã trải nghiệm hành trình này
             </p>
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
                    <p className="text-xs text-primary/30 font-medium italic">Xác thực hồ sơ cho thủ tục bàn giao xe.</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                     <label className="absolute left-8 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] z-10 pointer-events-none">Họ và Tên</label>
                     <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                        <User size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                        <input 
                          value={bookingData.fullName} 
                          onChange={(e) => setBookingData({...bookingData, fullName: e.target.value})} 
                          className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4" 
                        />
                     </div>
                  </div>
                  <div className="relative group">
                     <label className="absolute left-8 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] z-10 pointer-events-none">Số điện thoại</label>
                     <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                        <Phone size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                        <input 
                          placeholder="0xxx xxx xxx" 
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} 
                          className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4" 
                        />
                     </div>
                  </div>
               </div>

               {/* Document Upload Area */}
               <div className="space-y-4">
                  <div className="flex items-baseline justify-between px-2">
                     <h4 className="text-[11px] font-black text-primary/40 uppercase tracking-widest italic flex items-center gap-2">
                        <Camera size={14} className="text-cta" /> Xác thực GPLX / CCCD
                     </h4>
                     <span className="text-[8px] font-black text-cta uppercase tracking-widest px-3 py-1 bg-cta/5 rounded-full">Yêu cầu gốc</span>
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
                          <p className="text-[10px] font-medium text-primary/30 uppercase tracking-widest italic">Kéo thả ảnh GPLX hoặc CCCD của bạn vào đây</p>
                       </div>
                       <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                    </div>
                  ) : (
                    <div className="relative h-72 rounded-[2.5rem] overflow-hidden border-2 border-cta shadow-luxury-xl animate-in zoom-in-95 duration-500">
                       <img src={bookingData.documentImage} className="w-full h-full object-cover" alt="Document" />
                       <div className="absolute inset-0 bg-black/20" />
                       <button 
                        onClick={() => setBookingData({...bookingData, documentImage: null})}
                        className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white text-red-500 shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform"
                       >
                          <X size={20} />
                       </button>
                       <div className="absolute bottom-6 left-6 right-6 bg-cta/95 backdrop-blur-md py-4 rounded-2xl text-center shadow-luxury-sm">
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center justify-center gap-2">
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
                    <p className="text-xs text-primary/30 font-medium italic">Tùy chỉnh điểm giao nhận và yêu cầu đặc biệt.</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div className="relative group">
                        <label className="absolute left-8 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] z-10 pointer-events-none">Điểm nhận xe</label>
                        <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm relative">
                           <MapPin size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                           <select 
                             value={bookingData.pickupLocation}
                             onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                             className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 appearance-none cursor-pointer"
                           >
                              <option value="Quy Nhơn Coastal Hub">Quy Nhơn Coastal Hub</option>
                              <option value="Kỳ Co – Eo Gió Retreat">Kỳ Co – Eo Gió Retreat</option>
                              <option value="Giao xe tận nơi">Giao xe tận nơi (Liên hệ)</option>
                           </select>
                           <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 pointer-events-none mt-2" />
                        </div>
                     </div>
                     {bookingData.pickupLocation === 'Giao xe tận nơi' && (
                        <div className="relative group animate-in slide-in-from-top-2 duration-300">
                           <label className="absolute left-8 top-4 text-[9px] font-black text-cta/40 uppercase tracking-[0.2em] z-10 pointer-events-none">Địa chỉ nhận xe cụ thể</label>
                           <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-cta/5 border border-cta/10 focus-within:border-cta/30 focus-within:ring-4 focus-within:ring-cta/5 transition-all">
                              <LocateFixed size={20} className="text-cta/30 group-focus-within:text-cta transition-colors" />
                              <input 
                                placeholder="Nhập địa chỉ nhà, khách sạn..."
                                value={bookingData.customPickupLocation}
                                onChange={(e) => setBookingData({...bookingData, customPickupLocation: e.target.value})}
                                className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                              />
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="space-y-4">
                     <div className="relative group">
                        <label className="absolute left-8 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] z-10 pointer-events-none">Điểm trả xe</label>
                        <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm relative">
                           <MapPin size={20} className="text-primary/10 group-focus-within:text-cta transition-colors" />
                           <select 
                             value={bookingData.returnLocation}
                             onChange={(e) => setBookingData({...bookingData, returnLocation: e.target.value})}
                             className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 appearance-none cursor-pointer"
                           >
                              <option value="Quy Nhơn Coastal Hub">Quy Nhơn Coastal Hub</option>
                              <option value="Kỳ Co – Eo Gió Retreat">Kỳ Co – Eo Gió Retreat</option>
                              <option value="Trả xe tại điểm hẹn">Trả xe tại điểm hẹn (Liên hệ)</option>
                           </select>
                           <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 pointer-events-none mt-2" />
                        </div>
                     </div>
                     {bookingData.returnLocation === 'Trả xe tại điểm hẹn' && (
                        <div className="relative group animate-in slide-in-from-top-2 duration-300">
                           <label className="absolute left-8 top-4 text-[9px] font-black text-cta/40 uppercase tracking-[0.2em] z-10 pointer-events-none">Địa chỉ trả xe cụ thể</label>
                           <div className="flex items-center gap-4 h-20 pl-8 pr-6 rounded-[1.5rem] bg-cta/5 border border-cta/10 focus-within:border-cta/30 focus-within:ring-4 focus-within:ring-cta/5 transition-all">
                              <LocateFixed size={20} className="text-cta/30 group-focus-within:text-cta transition-colors" />
                              <input 
                                placeholder="Nhập địa chỉ trả xe..."
                                value={bookingData.customReturnLocation}
                                onChange={(e) => setBookingData({...bookingData, customReturnLocation: e.target.value})}
                                className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4"
                              />
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               <div className="relative group">
                  <label className="absolute left-8 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] z-10 pointer-events-none">Ghi chú & Yêu cầu đặc biệt</label>
                  <div className="flex items-start gap-4 min-h-32 pl-8 pr-6 py-6 rounded-[1.5rem] bg-[#FAF9F6] border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-inner-sm">
                     <FileText size={20} className="text-primary/10 group-focus-within:text-cta transition-colors mt-4" />
                     <textarea 
                        placeholder="Ví dụ: Trang bị nón bảo hiểm Elite Gold, giao xe đúng 8 giờ sáng..."
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                        className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 resize-none"
                        rows={3}
                     />
                  </div>
               </div>
            </section>

            {/* Section 3: Payment Options */}
            <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-primary/5 shadow-luxury-lg space-y-10">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-soft-sm">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Phương thức bảo đảm</h3>
                    <p className="text-xs text-primary/30 font-medium italic">Chọn hình thức đặt cọc Elite để giữ chỗ ngay.</p>
                  </div>
               </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { id: 'sepay', label: 'Chuyển khoản SePay', price: 'Tự động xác nhận', desc: 'Thanh toán qua QR ngân hàng, hệ thống tự động xác nhận sau 1-3 phút.', icon: <CheckCircle2 size={18}/> },
                    { id: 'deposit', label: 'Đặt cọc Elite Hub', price: (200000).toLocaleString('vi-VN') + " VNĐ", desc: 'Chỉ cọc phí giữ xe, thanh toán còn lại khi nhận xe.', icon: <CheckCircle2 size={18}/> },
                    { id: 'full', label: 'Thanh toán trọn gói', price: (totalPriceRaw * 0.95).toLocaleString('vi-VN') + " VNĐ", desc: 'Ưu đãi Elite giảm 5% khi thanh toán Online 100%.', icon: <Star size={18}/> }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setBookingData({...bookingData, paymentMethod: method.id})}
                      className={cn(
                        "p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group",
                        bookingData.paymentMethod === method.id 
                          ? "bg-primary border-primary shadow-luxury-2xl" 
                          : "bg-[#FAF9F6] border-primary/5 hover:border-cta/20 shadow-soft-sm"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={cn(
                          "h-10 w-10 rounded-xl border flex items-center justify-center transition-all duration-500",
                          bookingData.paymentMethod === method.id ? "border-cta bg-cta text-primary" : "border-primary/5 bg-white text-cta"
                        )}>
                           {method.icon}
                        </div>
                        {bookingData.paymentMethod === method.id && (
                          <div className="h-6 w-6 rounded-full bg-cta text-primary flex items-center justify-center">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                      </div>
                      <div className="relative z-10">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", bookingData.paymentMethod === method.id ? "text-cta" : "text-primary/30")}>{method.label}</p>
                        <p className={cn("text-2xl font-bold mb-3", bookingData.paymentMethod === method.id ? "text-white" : "text-primary")}>{method.price}</p>
                        <p className={cn("text-[10px] font-medium leading-relaxed italic", bookingData.paymentMethod === method.id ? "text-white/30" : "text-primary/20")}>{method.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="p-6 rounded-[2rem] bg-cta/5 border border-cta/10 flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta shrink-0 animate-pulse">
                     <AlertCircle size={24} />
                  </div>
                  <p className="text-[11px] font-bold text-cta leading-relaxed italic uppercase tracking-[0.1em]">
                    Thông báo: Thanh toán ngay 100% để nhận ngay gói Bảo hiểm Elite Shield Platinum trị giá 200.000đ hoàn toàn miễn phí!
                  </p>
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
                              <div className="flex items-center gap-3 text-white/60 text-[10px] font-bold mt-1">
                                 <span className="flex items-center gap-1 text-cta"><Star size={12} fill="currentColor" /> 4.8</span>
                                 <span>•</span>
                                 <span className="flex items-center gap-1"><MapPin size={12} /> Quy Nhơn Hub</span>
                              </div>
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
                      <h4 className="text-[10px] font-black text-primary/20 uppercase tracking-[0.4em] italic mb-4">Chi tiết hành trình</h4>
                      <div className="grid grid-cols-2 gap-8">
                         <div className="relative p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group hover:bg-white hover:border-cta/20 transition-all">
                            <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-3">Nhận xe</p>
                            <div className="flex items-center gap-3">
                               <Calendar size={18} className="text-cta" />
                               <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent text-xs font-bold text-primary outline-none uppercase cursor-pointer"
                               />
                            </div>
                         </div>
                         <div className="relative p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group hover:bg-white hover:border-cta/20 transition-all">
                            <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-3">Trả xe</p>
                            <div className="flex items-center gap-3">
                               <Calendar size={18} className="text-primary/20 group-hover:text-cta transition-colors" />
                               <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent text-xs font-bold text-primary outline-none uppercase cursor-pointer"
                               />
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-6 rounded-3xl bg-cta/5 border border-cta/10">
                        <div className="flex items-center gap-3">
                           <Clock size={18} className="text-cta" />
                           <span className="text-xs font-bold text-primary italic uppercase tracking-widest">Thời gian thuê: {days} Ngày</span>
                        </div>
                        <ChevronDown size={14} className="text-cta/30" />
                      </div>
                   </div>

                   {/* Price Breakdown */}
                   <div className="pt-10 border-t border-primary/5 space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold text-primary/40 uppercase tracking-widest px-2">
                         <span>Giá thuê xe ({days} ngày)</span>
                         <span className="text-primary">{totalPrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-primary/40 uppercase tracking-widest px-2">
                         <span>Phí dịch vụ Elite</span>
                         <span className="text-emerald-500">Miễn phí</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-primary/40 uppercase tracking-widest px-2">
                         <span>Bảo hiểm Elite Basic</span>
                         <span className="text-primary">Bao gồm</span>
                      </div>
                      
                      <div className="mt-8 p-8 rounded-3xl bg-primary text-white flex justify-between items-center shadow-luxury-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 h-full w-40 bg-white/5 skew-x-[-20deg] translate-x-10 transition-transform group-hover:translate-x-0" />
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cta mb-2 italic">Tổng thanh toán</p>
                            <p className="text-4xl font-bold tracking-tighter">{totalPrice.split(' ')[0]} <span className="text-lg font-medium text-white/40 italic">VNĐ</span></p>
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
                     className="luxury-btn-primary w-full py-7 flex items-center justify-center gap-4 text-xs font-black tracking-[0.4em] shadow-luxury-2xl group disabled:opacity-50 disabled:grayscale transition-all"
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          XÁC NHẬN ĐẶT XE NGAY
                          <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                   
                   <p className="text-center text-[10px] font-black text-primary/20 uppercase tracking-[0.3em] italic">
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
