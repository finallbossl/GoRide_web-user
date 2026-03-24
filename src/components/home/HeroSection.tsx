'use client';

import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-b from-[#f7e9cb]/35 via-[#fffdf8] to-[#fff7e8] pb-20 pt-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute right-[-6%] top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/20 to-cta/25 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-accent/25 to-primary/15 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* Content */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cta text-white">
                <MapPin size={10} strokeWidth={3} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Dịch vụ di chuyển premium tại Quy Nhơn</span>
            </div>

            <h1 className="mb-6 font-heading text-5xl font-black leading-[0.92] tracking-tight text-primary md:text-7xl lg:text-8xl">
              Chạm Máy,
              <br />
              <span className="italic text-cta">Đi Ngay.</span>
            </h1>

            <p className="mb-9 max-w-xl text-base leading-relaxed text-primary-muted md:text-lg">
              Đặt xe chỉ trong vài bước, nhận xe ở nhiều điểm trong thành phố và bắt đầu hành trình của bạn với dịch vụ hỗ trợ 24/7.
            </p>


            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-5">
              <Link
                href="/motorbike"
                className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-soft-lg transition-all duration-300 hover:translate-y-[-1px] hover:bg-cta"
              >
                Trải nghiệm ngay
                <ArrowRight size={18} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/promotions"
                className="flex h-14 items-center justify-center rounded-xl border border-primary/20 bg-white px-7 text-xs font-semibold uppercase tracking-[0.12em] text-primary shadow-sm transition-all duration-300 hover:border-cta hover:text-cta"
              >
                Ưu đãi độc quyền
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-2xl border border-white/30 bg-white/30 backdrop-blur" />
            <div className="relative z-10 w-full h-[64vh] max-h-[760px] min-h-[420px] overflow-hidden rounded-luxury-xl border-4 border-white shadow-luxury-xl">
              <img
                src="https://sgtravel.vn/wp-content/uploads/2020/11/Quy-Nhon-Phu-Yen-4-sao-1.jpg"
                alt="GoRide Travel"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* small badge removed per request */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
