'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { rentalApi } from '@/services/api';
import { Rental, RentalStatus } from '@goride/shared';
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
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RentalDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  
  const [rental, setRental] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
    <section className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Back and Title */}
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
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Vehicle Hero Card */}
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

            {/* Status Timeline */}
            <div className="glass-card bg-white p-10 rounded-[3rem] border border-primary/5 shadow-luxury-md">
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-10">Tiến trình hành trình</h3>
              <div className="relative space-y-8 pl-10">
                 <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-primary/5" />
                 
                 <div className="relative">
                    <div className="absolute -left-10 h-7 w-7 rounded-full border-4 border-white shadow-soft-sm flex items-center justify-center bg-emerald-500 z-10">
                       <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Yêu cầu đã được gửi</p>
                       <p className="text-[11px] font-medium text-primary/40 mt-1">{new Date(rental.createdAt).toLocaleString('vi-VN')}</p>
                    </div>
                 </div>

                 <div className="relative">
                    <div className={cn(
                       "absolute -left-10 h-7 w-7 rounded-full border-4 border-white shadow-soft-sm flex items-center justify-center z-10",
                       rental.status === RentalStatus.PENDING ? "bg-cta animate-pulse" : "bg-emerald-500"
                    )}>
                       {rental.status === RentalStatus.PENDING ? <div className="h-1.5 w-1.5 rounded-full bg-white" /> : <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <div>
                       <p className={cn("text-xs font-black uppercase tracking-widest", rental.status === RentalStatus.PENDING ? "text-cta" : "text-emerald-600")}>
                          {rental.status === RentalStatus.PENDING ? "Đang chờ xác nhận" : "Hồ sơ đã xác nhận"}
                       </p>
                       <p className="text-[11px] font-medium text-primary/40 mt-1">Hệ thống GoRide Hub</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Payment Summary */}
            <div className="glass-card bg-white p-10 rounded-[3rem] border border-primary/5 shadow-luxury-lg">
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-8">Bản kê chi phí</h3>
              
              {rental.payments?.status !== 'COMPLETED' && rental.status !== RentalStatus.CANCELLED && (
                <div className="mb-8 p-6 bg-[#FAF9F6] rounded-3xl border border-cta/10 flex flex-col items-center gap-6 text-center shadow-inner-sm">
                   <div className="bg-white p-3 rounded-2xl shadow-soft-sm border border-cta/5">
                     <img 
                       src="/QR_Code.png" 
                       alt="VietQR" 
                       className="w-44 h-44 object-contain mx-auto" 
                     />
                   </div>
                   
                   <div className="w-full space-y-3">
                      <div className="bg-white p-3 rounded-xl border border-primary/5 flex items-center justify-between group transition-all hover:border-cta/20">
                         <div className="text-left">
                            <p className="text-[7px] font-black text-primary/30 uppercase tracking-widest mb-0.5">Nội dung chuyển khoản</p>
                            <p className="text-[10px] font-bold text-primary truncate max-w-[120px]">{rental.id}</p>
                         </div>
                         <button 
                           onClick={() => copyToClipboard(rental.id)}
                           className="h-8 w-8 rounded-lg bg-cta/5 text-cta flex items-center justify-center hover:bg-cta hover:text-white transition-all shadow-soft-sm"
                         >
                            <FileText size={14} />
                         </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-primary/5 text-left">
                         <p className="text-[7px] font-black text-primary/30 uppercase tracking-widest mb-0.5">Tài khoản thụ hưởng</p>
                         <p className="text-[10px] font-bold text-primary">MB Bank - 0393273111</p>
                         <p className="text-[10px] font-medium text-primary/60 uppercase tracking-tighter">GORIDE ELITE</p>
                      </div>

                      <div className="bg-cta/5 p-3 rounded-xl border border-cta/10">
                        <p className="text-[9px] text-cta font-bold leading-tight italic">
                          Hệ thống sẽ tự động xác nhận sau 1-3 phút khi nhận tiền.
                        </p>
                      </div>
                   </div>
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
              <button className="w-full py-4 rounded-2xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3">
                 <FileText size={16} /> Tải biên nhận (PDF)
              </button>
            </div>

            {/* Concierge Support */}
            <div className="glass-card bg-primary text-white p-10 rounded-[3rem] shadow-luxury-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
              
              <h3 className="text-lg font-black uppercase tracking-widest mb-8 relative z-10">Hỗ trợ Elite</h3>
              <div className="flex items-center gap-5 mb-8 relative z-10">
                 <div className="h-16 w-16 rounded-[1.5rem] overflow-hidden border-2 border-white/20 shadow-luxury-md bg-white/10 flex items-center justify-center">
                    <User size={32} className="text-cta" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-white mb-1">GoRide Support</h4>
                    <p className="text-[10px] font-black text-cta uppercase tracking-widest">Elite Concierge Service</p>
                 </div>
              </div>
              <p className="text-sm text-white/40 mb-10 leading-relaxed font-medium relative z-10">
                Đội ngũ Concierge của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 cho bất kỳ yêu cầu nào phát sinh trong hành trình.
              </p>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <button className="py-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary transition-all flex items-center justify-center gap-3 text-[10px] font-black tracking-widest text-center">
                   <Phone size={14} /> GỌI NGAY
                 </button>
                 <button className="py-4 rounded-2xl bg-cta hover:bg-white hover:text-primary text-white transition-all flex items-center justify-center gap-3 text-[10px] font-black tracking-widest text-center">
                   <MessagesSquare size={14} /> NHẮN TIN
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { User } from 'lucide-react';
