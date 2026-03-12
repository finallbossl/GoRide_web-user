'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft, RefreshCcw, HelpCircle } from 'lucide-react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CancelContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('orderCode');

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-16 md:py-24 px-4" style={{ width: '100vw', maxWidth: '100%' }}>
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-500/5 rounded-full blur-[140px] animate-liquid" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/5 rounded-full blur-[140px] animate-liquid" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="mx-auto glass-card rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-14 text-center space-y-8 md:space-y-10 relative z-10 border-primary/10 shadow-luxury-2xl backdrop-blur-3xl" style={{ width: '100%', maxWidth: '768px', minWidth: 'min(95vw, 600px)', display: 'block' }}>
        
        {/* ICON CANCEL */}
        <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 md:mb-8" style={{ display: 'block' }}>
          <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-red-500/10 animate-pulse blur-xl md:blur-2xl" />
          <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white shadow-luxury-md border border-white/20">
            <XCircle className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={2} />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4 md:space-y-6 block w-full px-1 sm:px-2">
          <div>
            <span className="text-[10px] sm:text-xs md:text-sm text-red-500 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Transaction Terminated</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-4 md:mb-6 tracking-tight font-heading drop-shadow-sm leading-[1.1]">
              Thanh Toán <span className="text-red-500">Bị Hủy</span>
            </h1>
          </div>
          
          <p className="text-sm sm:text-base md:text-xl font-medium text-primary/60 italic leading-relaxed max-w-[500px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Giao dịch của bạn đã bị dừng lại. Nếu đây là lỗi kỹ thuật, hãy thử lại hoặc liên hệ Concierge.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-transparent p-5 sm:p-8 md:p-14 rounded-2xl md:rounded-[3rem] border border-primary/10 shadow-luxury-md mb-8 md:mb-12 text-left animate-in fade-in zoom-in-95 duration-700 delay-300 w-full block">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-primary/10">
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-primary/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] shrink-0">Mã đơn hàng</span>
              <span className="text-sm sm:text-base md:text-xl font-bold text-primary font-mono tracking-widest px-4 sm:px-6 py-2 sm:py-3 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/5 italic shadow-inner break-all">#{orderCode || 'N/A'}</span>
           </div>
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-primary/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] shrink-0">Trạng thái</span>
              <span className="px-4 sm:px-6 py-2 md:py-3 rounded-full bg-red-500/10 text-red-600 text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] border border-red-500/20">Đã hủy (CANCELLED)</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 w-full">
          <Link 
            href="/my-rentals" 
            className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 rounded-2xl md:rounded-[2rem] bg-white border border-primary/10 text-primary flex items-center justify-center gap-3 md:gap-4 text-[11px] sm:text-sm md:text-lg font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 group shadow-sm sm:shadow-luxury-sm px-3 md:px-4"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform shrink-0" />
            <span className="truncate">QUAY LẠI ĐƠN</span>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:flex-1 h-14 sm:h-20 md:h-24 rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-red-500 to-red-700 text-white font-black text-[11px] sm:text-sm md:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-md sm:shadow-luxury-error hover:shadow-luxury-error-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 group px-3 md:px-4"
          >
            <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-700 shrink-0" />
            <span className="truncate">THỬ LẠI</span>
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-primary/30 animate-in fade-in duration-1000 delay-1000">
           <HelpCircle size={18} />
           <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Cần hỗ trợ? Gọi 0987.654.321</span>
        </div>
      </div>
    </main>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <CancelContent />
    </Suspense>
  );
}
