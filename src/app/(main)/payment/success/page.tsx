'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Home, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('orderCode');

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-16 md:py-24 px-4" style={{ width: '100vw', maxWidth: '100%' }}>
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] animate-liquid" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[140px] animate-liquid" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="mx-auto glass-card rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-14 text-center space-y-8 md:space-y-10 relative z-10 border-primary/10 shadow-luxury-2xl backdrop-blur-3xl" style={{ width: '100%', maxWidth: '768px', minWidth: 'min(95vw, 600px)', display: 'block' }}>
        
        {/* ICON SUCCESS */}
        <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 md:mb-8" style={{ display: 'block' }}>
          <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-emerald-500/20 animate-pulse blur-xl md:blur-2xl" />
          <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-luxury-md border border-white/20">
            <CheckCircle2 className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={2.5} />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4 md:space-y-6 block w-full px-1 sm:px-2">
          <div>
            <span className="text-[10px] sm:text-xs md:text-sm text-emerald-600 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Payment Verified</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-4 md:mb-6 tracking-tight font-heading drop-shadow-sm leading-[1.1]">
              Thanh Toán <span className="text-emerald-500">Thành Công!</span>
            </h1>
          </div>
          
          <p className="text-sm sm:text-base md:text-xl font-medium text-primary/60 italic leading-relaxed max-w-[500px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            &quot;Hành trình Elite của bạn đã sẵn sàng. Cảm ơn bạn đã tin tưởng dịch vụ cao cấp của GoRide.&quot;
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-transparent p-5 sm:p-8 md:p-14 rounded-2xl md:rounded-[3rem] border border-primary/10 shadow-luxury-md mb-8 md:mb-12 text-left animate-in fade-in zoom-in-95 duration-700 delay-300 w-full block">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-primary/10">
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-primary/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] shrink-0">Mã đơn hàng</span>
              <span className="text-sm sm:text-base md:text-xl font-bold text-primary font-mono tracking-widest px-4 sm:px-6 py-2 sm:py-3 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/5 italic shadow-inner break-all">#{orderCode || 'N/A'}</span>
           </div>
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-primary/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] shrink-0">Trạng thái</span>
              <span className="px-4 sm:px-6 py-2 md:py-3 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] border border-emerald-500/20">Xác nhận PAID</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 w-full">
          <Link 
            href="/my-rentals" 
            className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-emerald-500 to-emerald-700 text-white flex items-center justify-center gap-3 md:gap-4 text-[11px] sm:text-sm md:text-lg font-black tracking-[0.2em] sm:tracking-[0.3em] shadow-md sm:shadow-luxury-success hover:shadow-luxury-success-hover hover:-translate-y-1 transition-all duration-300 group px-3 md:px-4"
          >
            <span className="truncate">XEM ĐƠN THUÊ</span>
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform shrink-0" />
          </Link>
          <Link 
            href="/" 
            className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 rounded-2xl md:rounded-[2rem] border border-primary/10 text-primary/60 font-black text-[11px] sm:text-sm md:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-primary/5 hover:text-primary hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 group shadow-sm sm:shadow-luxury-sm bg-white px-3 md:px-4"
          >
            <span className="truncate">VỀ TRANG CHỦ</span>
            <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
          </Link>
        </div>
      </div>
    </main>
  );
}
