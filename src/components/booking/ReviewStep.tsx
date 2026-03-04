'use client';

import { Calendar, CreditCard, ShieldCheck, MapPin } from 'lucide-react';

interface ReviewStepProps {
  bikeData: any;
  bookingDates: {
    start: string;
    end: string;
    days: number;
  };
  totalPrice: string;
}

export default function ReviewStep({ bikeData, bookingDates, totalPrice }: ReviewStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid gap-6">
         <div className="p-8 rounded-[2.5rem] bg-white border border-primary/5 shadow-soft-xl space-y-6">
            <div className="flex justify-between items-center text-xs pb-6 border-b border-primary/5">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-cta">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-primary/20 uppercase tracking-widest">Thời gian thuê</p>
                      <p className="font-bold text-primary">{bookingDates.days} Ngày ({bookingDates.start} - {bookingDates.end})</p>
                   </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center text-xs pb-6 border-b border-primary/5">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-cta">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-primary/20 uppercase tracking-widest">Điểm nhận xe</p>
                      <p className="font-bold text-primary">{bikeData.location}</p>
                   </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-cta">
                      <ShieldCheck size={20} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-primary/20 uppercase tracking-widest">Bảo hiểm mặc định</p>
                      <p className="font-bold text-primary">Elite Basic Protection (Đã bao gồm)</p>
                   </div>
                </div>
            </div>
         </div>

         <div className="p-8 rounded-[2.5rem] bg-cta/5 border border-cta/10 flex justify-between items-center">
            <div>
               <p className="text-[10px] font-black text-cta uppercase tracking-[0.3em] mb-1 italic">Tổng giá trị hành trình</p>
               <p className="text-3xl font-bold text-primary">{totalPrice}</p>
            </div>
            <div className="text-right">
               <span className="px-4 py-2 bg-white rounded-full text-[9px] font-black text-cta uppercase tracking-widest shadow-soft-sm">Elite Member Rate</span>
            </div>
         </div>
      </div>
    </div>
  );
}
