'use client';

import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
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

            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-[#1C1917] leading-[0.9] mb-8 tracking-tighter">
              KHÁM PHÁ <br />
              <span className="text-[#CA8A04] italic">TỰ DO.</span>
            </h1>


            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link
                href="/motorbike"
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
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-luxury-xl overflow-hidden shadow-luxury-xl border-4 border-white">
              <img
                src="https://sgtravel.vn/wp-content/uploads/2020/11/Quy-Nhon-Phu-Yen-4-sao-1.jpg"
                alt="GoRide Travel"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
