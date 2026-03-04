'use client';

import { ArrowRight, Star, ShieldCheck, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5 pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-cta/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-primary/20 blur-[100px] rounded-full" />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cta/10 border border-primary/20 mb-8">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CA8A04] text-white">
                 <MapPin size={10} strokeWidth={3} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1917]">Dịch vụ di chuyển Elite · Tiếp cận toàn cầu</span>
            </div>

            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-[#1C1917] leading-[0.9] mb-8 tracking-tighter animate-in slide-in-from-left duration-1000">
              KHÁM PHÁ <br />
              <span className="text-[#CA8A04] italic">TỰ DO.</span>
            </h1>

            <p className="text-xl md:text-2xl font-medium text-[#44403C]/70 leading-relaxed mb-12 animate-in fade-in duration-1000 delay-300">
              Trải nghiệm sự độc lập tuyệt đối với bộ sưu tập xe máy cao cấp của chúng tôi. Giá minh bạch, truy cập liền mạch, hỗ trợ tận tâm 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-in fade-in duration-1000 delay-500">
              <Link
                href="/cars"
                className="flex h-16 items-center justify-center gap-3 rounded-luxury bg-[#1C1917] px-10 text-[11px] font-black uppercase tracking-widest text-[#CA8A04] transition-all duration-300 hover:bg-[#CA8A04] hover:text-white hover:scale-105 active:scale-95 shadow-luxury-xl group whitespace-nowrap"
              >
                Trải nghiệm ngay
                <ArrowRight size={20} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                href="/promotions"
                className="flex h-16 items-center justify-center rounded-luxury border-2 border-[#1C1917] bg-transparent px-10 text-[11px] font-black uppercase tracking-widest text-[#1C1917] transition-all duration-300 hover:bg-[#1C1917] hover:text-[#CA8A04] group whitespace-nowrap"
              >
                Ưu đãi độc quyền
              </Link>
            </div>

            <div className="mt-16 flex flex-row justify-between items-start w-full max-w-2xl border-t border-[#1C1917]/5 pt-10 animate-in fade-in duration-1000 delay-700">
              <div className="flex flex-col items-start gap-1">
                <span className="text-4xl font-black text-[#1C1917] tracking-tighter">150<span className="text-[#CA8A04]">+</span></span>
                <span className="text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest">Đội xe Elite</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-4xl font-black text-[#1C1917] tracking-tighter">24<span className="text-[#CA8A04]">/</span>7</span>
                <span className="text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest">Hỗ trợ tận tâm</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-4xl font-black text-[#1C1917] tracking-tighter">5.0</span>
                <span className="text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest">Đánh giá</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-luxury-xl overflow-hidden shadow-luxury-xl border-4 border-white">
              <img
                src="https://sgtravel.vn/wp-content/uploads/2020/11/Quy-Nhon-Phu-Yen-4-sao-1.jpg"
                alt="GoRide Travel"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-luxury shadow-luxury-xl border border-[#1C1917]/5 animate-in slide-in-from-right duration-1000 delay-500">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917]/5 text-[#CA8A04]">
                     <ShieldCheck size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest mb-1">Bảo vệ</p>
                    <p className="text-sm font-black text-[#1C1917] tracking-tight">Bảo hiểm toàn diện</p>
                  </div>
                </div>
              </div>

              {/* Verified Users Bottom Bar */}
              <div className="absolute bottom-10 left-10 right-10 bg-[#1C1917]/95 backdrop-blur-md p-8 rounded-luxury-lg shadow-luxury-xl border border-white/10 animate-in slide-in-from-bottom duration-1000 delay-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-[#CA8A04] uppercase tracking-[0.2em] mb-3">Thành viên đã xác thực</p>
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-[3px] border-[#1C1917] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                          <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="elite user" />
                        </div>
                      ))}
                      <div className="h-10 w-10 rounded-full border-[3px] border-[#1C1917] bg-[#CA8A04] flex items-center justify-center text-[10px] font-black text-white">
                        +1.2k
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-3xl font-black text-white tracking-tighter">99<span className="text-[#CA8A04]">%</span></p>
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Hài lòng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
