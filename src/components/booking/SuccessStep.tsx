'use client';

import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface SuccessStepProps {
  onClose: () => void;
}

export default function SuccessStep({ onClose }: SuccessStepProps) {
  const bookingId = useMemo(() => Math.random().toString(36).substring(7).toUpperCase(), []);

  return (
    <div className="py-12 text-center space-y-10 animate-in zoom-in-50 duration-700">
      <div className="relative mx-auto w-40 h-40">
         {/* Animated Background Rings */}
         <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] animate-ping duration-[3000ms]" />
         <div className="absolute inset-4 bg-emerald-500/20 rounded-[2.5rem] animate-pulse" />
         
         <div className="relative h-40 w-40 rounded-[3.5rem] bg-emerald-500 flex items-center justify-center text-white shadow-luxury-emerald-lg animate-bounce">
            <CheckCircle2 size={70} strokeWidth={2.5} />
         </div>
      </div>

      <div className="space-y-4">
         <h3 className="text-5xl font-bold text-primary tracking-tighter">Hành trình sẵn sàng!</h3>
         <div className="space-y-2">
            <p className="text-sm font-medium text-primary/40 italic">Mã đặt chỗ đẳng cấp của bạn</p>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary rounded-full">
               <span className="text-lg font-black text-cta uppercase tracking-[0.3em]">#{bookingId}</span>
            </div>
         </div>
         <p className="text-xs font-medium text-primary/30 leading-relaxed max-w-sm mx-auto italic pt-4">
           Thông tin chi tiết đã được gửi tới email và thông báo trong ứng dụng. Chúng tôi sẽ liên hệ trong ít phút để hoàn tất bàn giao.
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-10">
         <Link 
            href="/my-rentals" 
            className="h-16 rounded-2xl bg-primary text-white text-[10px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-4 hover:bg-cta transition-all shadow-luxury-xl"
         >
            XEM HÀNH TRÌNH <ArrowRight size={16} />
         </Link>
         <button 
            onClick={onClose}
            className="h-16 rounded-2xl border border-primary/10 text-[10px] font-black text-primary/40 tracking-[0.3em] uppercase hover:border-cta hover:text-cta transition-all"
         >
            VỀ QUAY LẠI <ArrowLeft size={16} className="-order-1" />
         </button>
      </div>
    </div>
  );
}
