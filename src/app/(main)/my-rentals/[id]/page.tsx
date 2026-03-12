'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { rentalApi, paymentApi } from '@/services/api';
import { RentalStatus } from '@goride/shared';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  MessagesSquare, 
  Phone, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Loader2,
  ExternalLink,
  User,
  Upload,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RentalDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  
  const [rental, setRental] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Return Report Modal States
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnKm, setReturnKm] = useState('');
  const [returnFuel, setReturnFuel] = useState('8');
  const [returnNote, setReturnNote] = useState('');
  const [returnImages, setReturnImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleOnlinePayment = async () => {
    if (!id) return;
    setPaymentLoading(true);
    try {
      const response = await paymentApi.createPaymentLink(id);
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

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchRental = async () => {
      setLoading(true);
      try {
        const response = await rentalApi.getById(id);
        if (response.success && response.data) {
          setRental(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch rental details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRental();
  }, [id, isLoggedIn, router]);

  const getStatusLabel = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.PENDING: return 'Đang chờ xác nhận';
      case RentalStatus.CONFIRMED: return 'Đã xác nhận';
      case RentalStatus.ONGOING: return 'Chuyến đi đang diễn ra';
      case RentalStatus.COMPLETED: return 'Hành trình hoàn thành';
      case RentalStatus.CANCELLED: return 'Hành trình đã hủy';
      default: return status;
    }
  };

  const getStatusColorClass = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.ONGOING: return "bg-cta text-white";
      case RentalStatus.COMPLETED: return "bg-emerald-500 text-white";
      case RentalStatus.CANCELLED: return "bg-red-500 text-white";
      case RentalStatus.PENDING: return "bg-amber-500 text-white";
      default: return "bg-white text-primary border border-primary/5";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <Loader2 className="animate-spin text-cta" size={48} />
        <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Đang tải chi tiết hành trình...</p>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <AlertCircle className="text-cta" size={48} />
        <p className="text-primary font-bold">Không tìm thấy thông tin hành trình</p>
        <Link href="/my-rentals" className="text-cta font-semibold underline">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <>
    <section className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <Link 
            href="/my-rentals" 
            className="inline-flex items-center gap-2 text-primary/40 hover:text-cta transition-colors font-black text-[10px] uppercase tracking-widest mb-6"
          >
            <ArrowLeft size={16} />
            Quay lại danh sách
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">Chi tiết <span className="text-cta">Hành trình</span> {rental.id.substring(0, 8)}</h1>
            <div className={cn(
              "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-md shadow-luxury-sm",
              getStatusColorClass(rental.status)
            )}>
              <Clock size={16} />
              {getStatusLabel(rental.status)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card bg-white rounded-[3rem] overflow-hidden border border-primary/5 shadow-luxury-lg">
              <div className="h-96 relative">
                 <img 
                    src={rental.motorbike?.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200'} 
                    alt={rental.motorbike?.name || 'Motorbike'} 
                    className="h-full w-full object-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{rental.motorbike?.name || 'Xe Máy Elite'}</h2>
                    <p className="text-white/60 font-medium">Biển số: {rental.motorbike?.licensePlate || 'N/A'}</p>
                 </div>
              </div>
              
              <div className="p-10 grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary/30 uppercase text-[9px] font-black tracking-widest">
                    <MapPin size={14} /> Điểm lấy xe
                  </div>
                  <p className="text-sm font-bold text-primary leading-relaxed">{rental.pickupLocation || 'Địa điểm Hub'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary/30 uppercase text-[9px] font-black tracking-widest">
                    <Calendar size={14} /> Thời gian thuê
                  </div>
                  <p className="text-sm font-bold text-primary">
                    {new Date(rental.startDate).toLocaleDateString('vi-VN')} — {new Date(rental.endDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-[10px] text-cta font-black italic tracking-widest">
                    {rental.numberOfDays} ngày trải nghiệm
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary/30 uppercase text-[9px] font-black tracking-widest">
                    <ShieldCheck size={14} /> Bảo hiểm
                  </div>
                  <p className="text-sm font-bold text-primary">GoRide Elite Shield Ready</p>
                </div>
              </div>
            </div>

            <div className="glass-card bg-white p-10 rounded-[3rem] border border-primary/5 shadow-luxury-md">
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-10">Biên bản bàn giao & Thu hồi</h3>
              <div className="space-y-10">
                 {/* Handover Data */}
                 <div className="relative pl-10">
                    <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-cta/10" />
                    <div className="absolute -left-1.5 top-0 h-10 w-10 rounded-2xl bg-white shadow-soft-md border border-primary/5 flex items-center justify-center text-cta z-10">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-cta mb-2">Thông tin bàn bàn giao</p>
                       {rental.handoverKm ? (
                          <div className="grid gap-4 bg-primary/[0.02] p-6 rounded-3xl border border-primary/5">
                             <div className="grid grid-cols-2 gap-6">
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Số KM khi nhận</p>
                                   <p className="text-sm font-bold text-primary">{rental.handoverKm} km</p>
                                </div>
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Mức xăng</p>
                                   <p className="text-sm font-bold text-primary">{rental.handoverFuel}/8 vạch</p>
                                </div>
                             </div>
                             {rental.handoverNote && (
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Ghi chú từ Hub</p>
                                   <p className="text-sm font-medium text-primary/60 italic">"{rental.handoverNote}"</p>
                                </div>
                             )}
                             {rental.handoverImages?.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 pt-2">
                                   {rental.handoverImages.map((img: string, i: number) => (
                                      <img key={i} src={img} className="aspect-square rounded-xl object-cover border border-primary/5" alt="Handover" />
                                   ))}
                                </div>
                             )}
                          </div>
                       ) : (
                          <p className="text-sm font-medium text-primary/40 italic">Chưa có thông tin bàn giao.</p>
                       )}
                    </div>
                 </div>

                 {/* Return Report (User) */}
                 <div className="relative pl-10">
                    <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-cta/10" />
                    <div className="absolute -left-1.5 top-0 h-10 w-10 rounded-2xl bg-white shadow-soft-md border border-primary/5 flex items-center justify-center text-amber-500 z-10">
                       <FileText size={20} />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Báo cáo trả xe (Bạn)</p>
                           {rental.status === RentalStatus.ONGOING && !rental.returnNote && (
                              <button 
                                onClick={() => {
                                  setReturnKm('');
                                  setReturnFuel('8');
                                  setReturnNote('');
                                  setReturnImages([]);
                                  setShowReturnModal(true);
                                }}
                                className="text-[9px] font-black text-cta uppercase tracking-widest border-b border-cta hover:text-primary hover:border-primary transition-all"
                              >
                                GỬI BÁO CÁO NGAY
                              </button>
                           )}
                        </div>
                       {rental.returnNote || rental.returnKm ? (
                          <div className="grid gap-4 bg-amber-500/[0.02] p-6 rounded-3xl border border-amber-500/10">
                             <div className="grid grid-cols-2 gap-6">
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Số KM báo cáo</p>
                                   <p className="text-sm font-bold text-primary">{rental.returnKm || 'N/A'} km</p>
                                </div>
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Mức xăng</p>
                                   <p className="text-sm font-bold text-primary">{rental.returnFuel || 'N/A'}/8 vạch</p>
                                </div>
                             </div>
                             {rental.returnNote && (
                                <div>
                                   <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Ghi chú của bạn</p>
                                   <p className="text-sm font-medium text-primary/60 italic">"{rental.returnNote}"</p>
                                </div>
                             )}
                          </div>
                       ) : (
                          <p className="text-sm font-medium text-primary/40 italic">Bạn chưa gửi báo cáo trả xe.</p>
                       )}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card bg-white p-10 rounded-[3rem] border border-primary/5 shadow-luxury-lg">
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-8">Bản kê chi phí</h3>
              
              {rental.payments?.status !== 'COMPLETED' && rental.status !== RentalStatus.CANCELLED && rental.status !== RentalStatus.CONFIRMED && (
                <div className="mb-8">
                  <div className="p-8 bg-cta/5 rounded-[2.5rem] border border-cta/10 flex flex-col items-center gap-6 text-center shadow-inner-sm mb-6">
                    <div className="bg-white p-4 rounded-3xl shadow-soft-md border border-cta/5">
                      <CreditCard size={48} className="text-cta" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-sm font-black text-primary uppercase tracking-widest">Thanh toán trực tuyến</h4>
                       <p className="text-[10px] text-primary/50 font-medium leading-relaxed max-w-[200px]">
                         Xác nhận hành trình ngay lập tức qua cổng thanh toán PayOS an toàn.
                       </p>
                    </div>
                    
                    <button 
                      onClick={handleOnlinePayment}
                      disabled={paymentLoading}
                      className="w-full py-5 rounded-2xl bg-cta text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-luxury-sm disabled:opacity-50"
                    >
                      {paymentLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          THANH TOÁN NGAY
                          <ExternalLink size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[9px] text-primary/30 font-black uppercase tracking-widest text-center px-6">
                    Hệ thống sẽ tự động cập nhật trạng thái sau khi giao dịch thành công.
                  </p>
                </div>
              )}

              <div className="flex justify-between items-end mb-8 pt-4 border-t border-primary/5">
                 <div>
                    <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-1">Tổng cộng</h4>
                    <p className="text-2xl font-bold text-cta">{Number(rental.totalPrice).toLocaleString('vi-VN')} VNĐ</p>
                 </div>
                 <div className="text-right">
                    <div className={cn(
                      "flex items-center gap-2 font-black text-[9px] uppercase tracking-widest",
                      rental.payments?.status === 'COMPLETED' ? "text-emerald-500" : "text-amber-500"
                    )}>
                       <CreditCard size={12} /> {rental.payments?.status === 'COMPLETED' ? 'Đã xác nhận' : 'Chờ thanh toán'}
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => {
                   if (rental.status === RentalStatus.ONGOING) {
                      setReturnKm('');
                      setReturnFuel('8');
                      setReturnNote('');
                      setReturnImages([]);
                      setShowReturnModal(true);
                   }
                }}
                className={cn(
                  "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3",
                  rental.status === RentalStatus.ONGOING ? "bg-cta text-white hover:bg-primary shadow-luxury-sm" : "bg-primary/5 text-primary/20 cursor-not-allowed"
                )}
              >
                 <ArrowLeft size={16} className="rotate-90" /> BÁO CÁO TRẢ XE
              </button>
            </div>

            <div className="glass-card bg-primary text-white p-10 rounded-[3rem] shadow-luxury-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
              <h3 className="text-lg font-black uppercase tracking-widest mb-8 relative z-10">Hỗ trợ Elite</h3>
              <div className="flex items-center gap-5 mb-8 relative z-10">
                 <div className="h-16 w-16 rounded-[1.5rem] overflow-hidden border-2 border-white/20 shadow-luxury-md bg-white/10 flex items-center justify-center text-cta">
                    <User size={32} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-white mb-1">GoRide Support</h4>
                    <p className="text-[10px] font-black text-cta uppercase tracking-widest">Elite Concierge</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <button className="py-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center gap-3 text-[10px] font-black tracking-widest">
                   <Phone size={14} /> GỌI
                 </button>
                 <button className="py-4 rounded-2xl bg-cta hover:bg-white hover:text-primary text-white transition-all flex items-center justify-center gap-3 text-[10px] font-black tracking-widest">
                   <MessagesSquare size={14} /> CHAT
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    {/* Return Report Modal (Ported from list page) */}
    {showReturnModal && rental && (
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
                        id="detail-return-upload" 
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
                        onClick={() => document.getElementById('detail-return-upload')?.click()}
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
                        const res = await rentalApi.updateMetadata(rental.id, { 
                            km: returnKm, 
                            fuel: returnFuel, 
                            note: returnNote,
                            images: returnImages
                        });
                        if (res.success) {
                            setToast({ message: 'Báo cáo đã được gửi thành công!', type: 'success' });
                            setTimeout(() => setToast(null), 5000);
                            setShowReturnModal(false);
                            // Refresh data
                            const response = await rentalApi.getById(id);
                            if (response.success) setRental(response.data);
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
    </>
  );
}
