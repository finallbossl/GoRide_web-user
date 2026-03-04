'use client';

import { CheckCircle2, CreditCard, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentStepProps {
  method: string;
  onChange: (method: string) => void;
  prices: {
    deposit: string;
    full: string;
  };
}

export default function PaymentStep({ method, onChange, prices }: PaymentStepProps) {
  const methods = [
    { 
      id: 'deposit', 
      label: 'Đặt cọc Elite Hub', 
      desc: 'Giữ xe ngay lập tức, trả phần còn lại khi nhận xe tại Hub.',
      price: prices.deposit,
      badge: 'Phổ biến nhất'
    },
    { 
      id: 'full', 
      label: 'Thanh toán trọn gói', 
      desc: 'Hoàn tất thanh toán Online và nhận ưu đãi giảm 5% giá thuê.',
      price: prices.full,
      badge: 'Elite Saving -5%'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-6">
         {methods.map((item) => (
           <div 
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group",
              method === item.id 
                ? "bg-primary border-primary shadow-luxury-2xl scale-[1.02]" 
                : "bg-white border-primary/5 hover:border-cta/20 shadow-soft-xl"
            )}
           >
              {/* Decorative elements for active state */}
              {method === item.id && (
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-cta/10 blur-3xl rounded-full" />
              )}

              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                         method === item.id ? "text-cta" : "text-primary/30"
                       )}>{item.label}</span>
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                         method === item.id ? "bg-cta text-primary" : "bg-primary/5 text-primary/40"
                       )}>{item.badge}</span>
                    </div>
                    <h4 className={cn(
                      "text-3xl font-bold transition-colors",
                      method === item.id ? "text-white" : "text-primary"
                    )}>{item.price}</h4>
                 </div>
                 <div className={cn(
                   "h-10 w-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                   method === item.id ? "border-cta bg-cta text-primary" : "border-primary/5 bg-[#FAF9F6]"
                 )}>
                    {method === item.id ? <CheckCircle2 size={24} /> : <div className="h-3 w-3 rounded-full bg-primary/5" />}
                 </div>
              </div>
              <p className={cn(
                "text-xs font-medium leading-relaxed italic transition-colors max-w-sm",
                method === item.id ? "text-white/40" : "text-primary/20"
              )}>{item.desc}</p>
           </div>
         ))}
         
         <div className="p-6 rounded-[1.5rem] bg-cta/5 border border-cta/10 flex items-center gap-5">
            <div className="h-10 w-10 rounded-2xl bg-cta/10 flex items-center justify-center text-cta shrink-0">
               <AlertCircle size={20} />
            </div>
            <p className="text-[11px] font-bold text-cta leading-relaxed italic uppercase tracking-[0.1em]">
               Ưu đãi: Thanh toán bằng phương thức Online để nhận ngay Elite Voucher 50.000đ áp dụng cho lần thuê tiếp theo!
            </p>
         </div>
      </div>
    </div>
  );
}
