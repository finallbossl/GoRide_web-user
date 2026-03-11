'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { rentalApi } from '@/services/api';
import { Rental, RentalStatus } from '@goride/shared';
import { Calendar, ChevronRight, MapPin, Clock, CreditCard, CheckCircle2, History, AlertCircle, Loader2, Upload, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MyRentalsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [rentals, setRentals] = useState<any[]>([]);
  const [totalRentals, setTotalRentals] = useState(0);
  const [loading, setLoading] = useState(true);

  // Return Report Modal States
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnRental, setReturnRental] = useState<any>(null);
  const [returnKm, setReturnKm] = useState('');
  const [returnFuel, setReturnFuel] = useState('8');
  const [returnNote, setReturnNote] = useState('');
  const [returnImages, setReturnImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // ... rest of useEffect ...

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchRentals = async () => {
      try {
        const response = await rentalApi.getMyRentals();
        if (response.success && response.data) {
          setRentals(response.data.rentals || []);
          setTotalRentals(response.data.total || 0);
        }
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [isLoggedIn, router]);

  const getStatusLabel = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.PENDING: return 'Đang chờ';
      case RentalStatus.CONFIRMED: return 'Đã xác nhận';
      case RentalStatus.ONGOING: return 'Đang diễn ra';
      case RentalStatus.COMPLETED: return 'Hoàn thành';
      case RentalStatus.CANCELLED: return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColorClass = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.ONGOING: return "bg-cta/90 text-white";
      case RentalStatus.COMPLETED: return "bg-emerald-500/90 text-white";
      case RentalStatus.CANCELLED: return "bg-red-500/90 text-white";
      default: return "bg-blue-500/90 text-white";
    }
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <section className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-cta rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Hành trình của bạn</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">Hồ sơ <span className="text-cta">Elite</span> Rentals</h1>
                <p className="text-primary/50 font-medium ">Quản lý và xem lại những cung đường đẳng cấp bạn đã chinh phục cùng GoRide.</p>
              </div>
              <div className="flex gap-4">
                <div className="p-4 rounded-3xl bg-white shadow-soft-xl border border-primary/5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-cta">
                    <History size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest leading-none mb-1">Tổng chuyến đi</p>
                    <p className="text-xl font-bold text-primary leading-none">{totalRentals}</p>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-white shadow-soft-xl border border-primary/5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-cta/10 flex items-center justify-center text-cta">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest leading-none mb-1">Hạng thành viên</p>
                    <p className="text-xl font-bold text-cta leading-none uppercase italic">Gold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rentals List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="grid gap-8">
              {Array.isArray(rentals) && rentals.map((rental) => (
                <div
                  key={rental.id}
                  className="group relative bg-white rounded-[3rem] overflow-hidden border border-primary/5 shadow-luxury-md hover:shadow-luxury-xl transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-12 items-stretch">
                    {/* Left side: Image and Badge */}
                    <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={rental.motorbike?.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'}
                        alt={rental.motorbike?.name || 'Motorbike'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <div className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border border-white/20 shadow-luxury-lg",
                          getStatusColorClass(rental.status)
                        )}>
                          {rental.status === RentalStatus.ONGOING && <Clock size={14} />}
                          {rental.status === RentalStatus.COMPLETED && <CheckCircle2 size={14} />}
                          {rental.status === RentalStatus.CANCELLED && <AlertCircle size={14} />}
                          {getStatusLabel(rental.status)}
                        </div>
                      </div>
                    </div>

                    {/* Right side: Information */}
                    <div className="lg:col-span-8 p-10 lg:p-14 flex flex-col justify-between">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-[10px] font-black text-cta uppercase tracking-[0.4em]">{rental.id.substring(0, 8)}</p>
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                              rental.payments?.status === 'COMPLETED' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                            )}>
                              {rental.payments?.status === 'COMPLETED' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </span>
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight group-hover:text-cta transition-colors">{rental.motorbike?.name || 'Xe Máy'}</h2>
                          <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2.5 text-primary/40 group-hover:text-primary transition-colors">
                              <MapPin size={16} />
                              <span className="text-sm font-semibold">{rental.pickupLocation}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-primary/40 group-hover:text-primary transition-colors">
                              <Calendar size={16} />
                              <span className="text-sm font-semibold">
                                {new Date(rental.startDate).toLocaleDateString('vi-VN')} — {new Date(rental.endDate).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-primary/20 uppercase tracking-widest mb-1 italic">Tổng giá trị</p>
                          <p className="text-2xl font-bold text-primary">{rental.totalPrice.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-8 border-t border-primary/5">
                        <div className="flex items-center gap-4">
                          {rental.status === RentalStatus.ONGOING && (
                            <button
                              onClick={() => {
                                setReturnKm('');
                                setReturnFuel('8');
                                setReturnNote('');
                                setReturnImages([]);
                                setReturnRental(rental);
                                setShowReturnModal(true);
                              }}
                              className="bg-cta text-white py-3 px-6 rounded-2xl text-[10px] font-black tracking-widest hover:bg-cta/90 transition-all shadow-luxury-sm"
                            >
                              BÁO CÁO TRẢ XE
                            </button>
                          )}
                          <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-surface overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Concierge" className="h-full w-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          {rental.payments?.status !== 'COMPLETED' && rental.status !== RentalStatus.CANCELLED && (
                            <Link
                              href={`/my-rentals/${rental.id}`}
                              className="bg-cta/10 text-cta hover:bg-cta hover:text-white transition-all py-3.5 px-6 rounded-2xl text-[10px] font-black tracking-widest flex items-center gap-2"
                            >
                              <CreditCard size={14} /> THANH TOÁN
                            </Link>
                          )}
                          <Link
                            href={`/my-rentals/${rental.id}`}
                            className="luxury-btn-primary py-3.5 px-8 flex items-center gap-3 text-[10px] font-black tracking-widest"
                          >
                            CHI TIẾT
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State Mockup */}
          {!loading && rentals.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-primary/10">
              <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 mx-auto mb-8">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Chưa có hành trình nào</h3>
              <p className="text-primary/40 mb-10 mx-auto">Hãy bắt đầu chuyến đi đầu tiên và tận hưởng những đặc quyền Elite dành riêng cho bạn.</p>
              <Link href="/motorbike" className="luxury-btn-primary inline-flex py-4 px-10">KHÁM PHÁ ĐỘI XE</Link>
            </div>
          )}
        </div>
      </section>

      {/* Return Report Modal */}
      {showReturnModal && returnRental && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-primary/20 animate-in fade-in duration-300">
          <div
            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-luxury-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 w-8 bg-cta rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-cta">Báo cáo tình trạng xe</span>
                  </div>
                  <h3 className="text-3xl font-bold text-primary tracking-tight">Hoàn tất <span className="text-cta">Hành trình</span></h3>
                </div>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="h-10 w-10 rounded-full border border-primary/5 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
                  title="Đóng"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/30 uppercase tracking-widest pl-1">Số KM hiện tại *</label>
                    <input
                      type="number"
                      value={returnKm}
                      onChange={(e) => setReturnKm(e.target.value)}
                      placeholder="VD: 12500"
                      className="w-full bg-[#F5F5F7] border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-cta/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/30 uppercase tracking-widest pl-1">Mức xăng (1-8)</label>
                    <input
                      type="number"
                      value={returnFuel}
                      onChange={(e) => setReturnFuel(e.target.value)}
                      placeholder="8"
                      className="w-full bg-[#F5F5F7] border-none rounded-2xl py-4 px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-cta/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/30 uppercase tracking-widest pl-1">Ghi chú tình trạng</label>
                  <textarea
                    value={returnNote}
                    onChange={(e) => setReturnNote(e.target.value)}
                    placeholder="Xe vẫn hoạt động tốt, không trầy xước mới..."
                    className="w-full bg-[#F5F5F7] border-none rounded-2xl py-4 px-6 text-sm font-medium text-primary focus:ring-2 focus:ring-cta/20 transition-all min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary/30 uppercase tracking-widest pl-1">Hình ảnh thực tế (Tải lên)</label>
                  <div className="grid grid-cols-4 gap-3">
                    <input
                      type="file"
                      id="user-return-upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          const urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
                          setReturnImages([...returnImages, ...urls]);
                        }
                      }}
                    />
                    <button
                      onClick={() => document.getElementById('user-return-upload')?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-primary/10 flex flex-col items-center justify-center text-primary/20 hover:border-cta hover:text-cta transition-all bg-primary/[0.02]"
                    >
                      <Upload size={20} className="mb-1" />
                      <span className="text-[8px] font-black uppercase">Tải lên</span>
                    </button>
                    {returnImages.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-soft-xl border border-primary/5 group">
                        <img src={img} className="h-full w-full object-cover" alt="Preview" />
                        <button
                          onClick={() => setReturnImages(returnImages.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-4 px-8 rounded-2xl border border-primary/5 text-[10px] font-black tracking-[0.2em] text-primary/40 hover:bg-primary/5 transition-all uppercase"
                >
                  Hủy bỏ
                </button>
                <button
                  disabled={!returnKm || submitting}
                  onClick={async () => {
                    setSubmitting(true);
                    try {
                      const res = await rentalApi.updateMetadata(returnRental.id, {
                        km: returnKm,
                        fuel: returnFuel,
                        note: returnNote,
                        images: returnImages
                      });
                      if (res.success) {
                        setToast({ message: 'Báo cáo đã gửi thành công!', type: 'success' });
                        setTimeout(() => setToast(null), 5000);
                        setShowReturnModal(false);
                        // Refresh list
                        const response = await rentalApi.getMyRentals();
                        if (response.success) setRentals(response.data.rentals || []);
                      }
                    } catch (e) {
                      setToast({ message: 'Gửi báo cáo thất bại.', type: 'error' });
                      setTimeout(() => setToast(null), 5000);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="flex-[2] luxury-btn-primary py-4 px-8 rounded-2xl text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all"
                >
                  {submitting ? <Loader2 className="animate-spin" size={14} /> : 'GỬI BÁO CÁO TRẢ XE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-10 duration-500">
          <div className={cn(
            "px-8 py-4 rounded-3xl shadow-luxury-2xl flex items-center gap-4 border backdrop-blur-xl",
            toast.type === 'success' ? "bg-emerald-500/90 text-white border-white/20" : "bg-red-500/90 text-white border-white/20"
          )}>
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <p className="text-xs font-bold uppercase tracking-widest">{toast.message}</p>
          </div>
        </div>
      )}
    </>
  );
}
