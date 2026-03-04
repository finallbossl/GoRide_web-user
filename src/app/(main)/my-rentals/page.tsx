'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { rentalApi } from '@/services/api';
import { Rental, RentalStatus } from '@goride/shared';
import { Calendar, ChevronRight, MapPin, Clock, CreditCard, CheckCircle2, History, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MyRentalsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [rentals, setRentals] = useState<any[]>([]);
  const [totalRentals, setTotalRentals] = useState(0);
  const [loading, setLoading] = useState(true);

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
                          <div className="flex -space-x-3">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-surface overflow-hidden">
                                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Concierge" className="h-full w-full object-cover" />
                                </div>
                              ))}
                          </div>
                          <p className="text-[10px] font-bold text-primary/40 italic">Đội ngũ hỗ trợ 24/7 đang túc trực</p>
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
             <p className="text-primary/40 mb-10 max-w-sm mx-auto">Hãy bắt đầu chuyến đi đầu tiên và tận hưởng những đặc quyền Elite dành riêng cho bạn.</p>
             <Link href="/cars" className="luxury-btn-primary inline-flex py-4 px-10">KHÁM PHÁ ĐỘI XE</Link>
          </div>
        )}
      </div>
    </section>
  );
}
