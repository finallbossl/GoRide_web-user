'use client';

import { 
  X, CheckCircle2, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  bikeData: any;
  steps: {
    id: number;
    title: string;
    description: string;
    component: React.ReactNode;
  }[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
}

export default function BookingOverlay({ 
  isOpen, 
  onClose, 
  bikeData, 
  steps, 
  currentStep, 
  onNext, 
  onPrev,
  isNextDisabled
}: BookingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      {/* Immersive Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[900px] bg-white rounded-[3.5rem] shadow-luxury-3xl overflow-hidden flex flex-col md:flex-row border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
        
        {/* Left Side: Brand & Bike Summary */}
        <div className="hidden md:flex md:w-[35%] bg-primary p-12 flex-col justify-between relative overflow-hidden">
           {/* Decoration */}
           <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-cta/10 blur-[100px] rounded-full" />
           <div className="absolute bottom-[-5%] left-[-5%] w-40 h-40 bg-white/5 blur-[80px] rounded-full" />
           
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                 <div className="h-10 w-10 rounded-xl bg-cta flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                 </div>
                 <span className="text-xl font-black text-white uppercase tracking-widest">GoRide <span className="text-cta">Elite</span></span>
              </div>
              
              <div className="space-y-6">
                 <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-luxury-lg mb-8">
                    <img src={bikeData.image} className="w-full h-56 object-cover" alt={bikeData.name} />
                 </div>
                 <h2 className="text-3xl font-bold text-white leading-tight">{bikeData.name}</h2>
                 <p className="text-white/40 text-sm font-medium leading-relaxed italic">Hành trình {bikeData.location} của bạn đang được chuẩn bị bởi đội ngũ chuyên gia Elite.</p>
              </div>
           </div>

           <div className="relative z-10 pt-10 border-t border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Tiến độ hồ sơ</p>
              <div className="space-y-4">
                 {steps.map((step) => (
                   <div key={step.id} className="flex items-center gap-4">
                      <div className={cn(
                        "h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all",
                        currentStep === step.id ? "bg-cta text-white" : (currentStep > step.id ? "bg-emerald-500 text-white" : "bg-white/5 text-white/20 underline decoration-white/10")
                      )}>
                         {currentStep > step.id ? <CheckCircle2 size={12} /> : step.id}
                      </div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest transition-colors",
                        currentStep === step.id ? "text-white" : "text-white/20"
                      )}>{step.title}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Side: Step Content & Actions */}
        <div className="flex-1 overflow-y-auto p-8 md:p-20 relative bg-[#FAF9F6]">
           {/* Close Button Mobile */}
           <button 
            onClick={onClose}
            className="absolute top-6 right-8 h-12 w-12 rounded-full flex items-center justify-center bg-primary/5 text-primary/20 hover:text-red-500 transition-colors z-20"
           >
              <X size={24} />
           </button>

           <div className="max-w-xl mx-auto h-full flex flex-col justify-between">
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="mb-12">
                    <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tighter">
                      {steps[currentStep-1].title.split(' ')[0]} <span className="text-cta">{steps[currentStep-1].title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-sm font-medium text-primary/40 italic">{steps[currentStep-1].description}</p>
                 </div>
                 
                 {/* Step Component */}
                 <div className="py-2">
                    {steps[currentStep-1].component}
                 </div>
              </div>

              {/* Action Buttons */}
              {currentStep < steps.length && (
                <div className="mt-16 flex items-center gap-4 pt-10 border-t border-primary/5">
                   {currentStep > 1 && (
                     <button 
                      onClick={onPrev}
                      className="h-16 px-10 rounded-2xl border border-primary/10 text-[10px] font-black text-primary/40 uppercase tracking-widest hover:border-cta hover:text-cta transition-all flex items-center gap-3"
                     >
                        <ArrowLeft size={16} /> Quay lại
                     </button>
                   )}
                   <button 
                    disabled={isNextDisabled}
                    onClick={onNext}
                    className="flex-1 h-16 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-cta transition-all shadow-luxury-xl disabled:opacity-50 disabled:grayscale"
                   >
                      {currentStep === 3 ? 'HOÀN TẤT ĐẶT XE' : 'TIẾP TỤC HÀNH TRÌNH'}
                      <ChevronRight size={18} />
                   </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
