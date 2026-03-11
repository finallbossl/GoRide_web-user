'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motorbikeApi } from '@/services/api';
import { Motorbike, MotorbikeType } from '@goride/shared';
import {
  Star, MapPin, Calendar, Clock, ShieldCheck,
  Heart, Share2, MessageSquare, ChevronRight,
  ArrowLeft, User, Phone, FileText, Upload,
  CreditCard, CheckCircle2, X, AlertCircle, Camera, Loader2
} from 'lucide-react';

export default function CarDetailPage() {
  const { isLoggedIn, user: authUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [bike, setBike] = useState<Motorbike | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking State - Dates
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);

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
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const finalDays = diffDays > 0 ? diffDays : 1;
    const pricePerDay = bike?.pricePerDay || 0;
    const total = finalDays * pricePerDay;

    return {
      days: finalDays,
      totalPrice: total.toLocaleString('vi-VN') + " VNĐ",
      totalPriceRaw: total
    };
  }, [startDate, endDate, bike]);

  const startBooking = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // Pass dates via query params
    router.push(`/booking/${id}?start=${startDate}&end=${endDate}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <Loader2 className="animate-spin text-cta" size={48} />
        <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Đang tải thông tin xe Elite...</p>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <AlertCircle className="text-cta" size={48} />
        <p className="text-primary font-bold">Không tìm thấy xe</p>
        <Link href="/cars" className="text-cta font-semibold underline">Quay lại đội xe</Link>
      </div>
    );
  }

  const bikeTypeLabel = bike.type === MotorbikeType.SCOOTER ? 'Xe Tay Ga' : bike.type === MotorbikeType.MANUAL ? 'Xe Số' : 'Xe Côn Tay';

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">
            <Link href="/" className="hover:text-cta transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/cars" className="hover:text-cta transition-colors">Khám phá xe</Link>
            <ChevronRight size={12} />
            <span className="text-primary/60 italic">{bike.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-12 w-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-primary/40 hover:text-red-500 hover:bg-red-50 transition-all shadow-luxury-sm">
              <Heart size={20} />
            </button>
            <button className="h-12 w-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-primary/40 hover:text-cta hover:bg-cta/5 transition-all shadow-luxury-sm">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT CONTENT: Gallery & Details */}
          <div className="lg:col-span-8 space-y-16">
            {/* Gallery */}
            <section className="relative group">
              <div className="aspect-[16/9] rounded-[3.5rem] overflow-hidden shadow-luxury-2xl border border-white/20">
                <img
                  src={bike.images[0] || "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=1200"}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={bike.name}
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
              </div>
              <div className="absolute bottom-6 right-6 flex gap-3">
                {bike.images.slice(1, 4).map((img: string, i: number) => (
                  <div key={i} className="h-20 w-32 rounded-2xl overflow-hidden border-2 border-white shadow-luxury-lg cursor-pointer hover:scale-105 transition-transform">
                    <img src={img} className="h-full w-full object-cover" />
                  </div>
                ))}
                {bike.images.length > 4 && (
                  <div className="h-20 w-32 rounded-2xl bg-primary/95 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-cta transition-colors">
                    <span className="text-xl font-bold">+{bike.images.length - 4}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest">Ảnh chi tiết</span>
                  </div>
                )}
              </div>
            </section>

            {/* Title & Stats */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-10 bg-cta rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cta italic">The Elite Choice</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tighter mb-4 leading-none lowercase">
                    {bike.name.split(' ')[0]} <span className="text-cta">{bike.name.split(' ').slice(1).join(' ')}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-8 text-primary/40">
                    <div className="flex items-center gap-2">
                      <div className="flex text-cta">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <span className="text-sm font-black text-primary italic">5.0 <span className="text-primary/20 font-medium">/ 324 chuyến</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-cta">
                        <MapPin size={16} />
                      </div>
                      <p className="text-sm font-bold text-primary">Quy Nhơn Elite Hub</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-cta">
                      <span className="px-3 py-1 bg-cta/10 rounded-full text-[10px] tracking-widest uppercase">{bikeTypeLabel}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-[2rem] border border-primary/5 shadow-luxury-sm">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/30 leading-none mb-1">Bảo hiểm</p>
                    <p className="text-xs font-bold text-primary leading-none">Elite Shield 2026 Ready</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <div className="grid md:grid-cols-2 gap-12 border-t border-primary/5 pt-12">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-primary uppercase tracking-widest">Tuyệt tác di chuyển</h3>
                <p className="text-primary/50 leading-relaxed font-medium">
                  {bike.description || `${bike.name} định nghĩa lại chuẩn mực của dòng ${bikeTypeLabel.toLowerCase()} hạng sang. Mỗi hành trình của bạn tại Quy Nhơn không chỉ là di chuyển, mà là một trải nghiệm phong cách sống thượng lưu.`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Năm sản xuất", val: bike.year || "2024", icon: <Clock size={18} /> },
                  { label: "Biển số", val: bike.licensePlate, icon: <Star size={18} /> },
                  { label: "Dung tích", val: bike.fuelCapacity || "N/A", icon: <CreditCard size={18} /> },
                  { label: "Động cơ", val: bike.engineSize || "N/A", icon: <ShieldCheck size={18} /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-white border border-primary/5 flex flex-col gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 text-cta flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-xs font-bold text-primary">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Booking Flow Side */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-10 flex flex-col gap-8">

              {/* Main Booking Interface */}
              <div className="glass-card bg-white rounded-[3.5rem] border border-primary/5 shadow-luxury-2xl overflow-hidden">
                <div className="p-10 space-y-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary tracking-tighter">{bike.pricePerDay.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm text-primary/30 font-black uppercase tracking-widest">/ Ngày</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group transition-all hover:bg-white hover:border-cta/20">
                      <label className="text-[9px] font-black uppercase tracking-widest text-primary/30 mb-3 block italic">Bắt đầu hành trình</label>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-cta" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent text-sm font-bold text-primary outline-none cursor-pointer uppercase"
                        />
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-primary/5 group transition-all hover:bg-white hover:border-cta/20">
                      <label className="text-[9px] font-black uppercase tracking-widest text-primary/30 mb-3 block italic">Trả máy tại Hub</label>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-primary/20 group-hover:text-cta transition-colors" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent text-sm font-bold text-primary outline-none cursor-pointer uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end bg-cta/5 p-6 rounded-3xl border border-cta/10">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-cta mb-1 italic">Tổng tạm tính ({days} ngày)</p>
                      <p className="text-2xl font-bold text-primary">{totalPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Elite Shield Ready</p>
                    </div>
                  </div>

                  <button
                    onClick={startBooking}
                    className="luxury-btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs font-black tracking-[0.4em] shadow-luxury-xl group disabled:opacity-50"
                    disabled={!bike}
                  >
                    BẮT ĐẦU ĐẶT XE
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center justify-center gap-6 pt-4 text-primary/30">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Elite Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Hủy miễn phí</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Quick Card */}
              {/* ... same as before ... */}

              {/* Policy Quick Card */}
              <div className="glass-card bg-primary text-white p-10 rounded-[3.5rem] shadow-luxury-2xl group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-cta">Elite Standard</h4>
                <div className="space-y-8">
                  {[
                    { title: "Kiểm định định kỳ", text: "1.000km / lần", icon: <ShieldCheck size={16} /> },
                    { title: "Hỗ trợ ven biển", text: "24/7 Elite Hub", icon: <Phone size={16} /> },
                    { title: "Độ mới động cơ", text: "Trên 95%", icon: <AlertCircle size={16} /> }
                  ].map((p, i) => (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-cta shrink-0">{p.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-white mb-1">{p.title}</p>
                        <p className="text-[10px] font-medium text-white/40 italic">{p.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
