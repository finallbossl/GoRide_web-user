'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { steps } from '@/constants/homeData';

export default function StepsSection() {
  return (
    <section className="bg-surface py-20 overflow-hidden">
      <div className="container">
        <SectionHeader 
          title="Quy Trình Đơn Giản" 
          subtitle="Chỉ 4 bước để bắt đầu hành trình của bạn với GoRide." 
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.number} className="group relative flex flex-col items-center text-center">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-12 left-[60%] right-[-40%] h-0.5 bg-primary/10 hidden lg:block" />
              )}
              
              <div className="relative mb-6">
                 <div className="absolute inset-0 bg-cta/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                 <div className="relative flex h-24 w-24 items-center justify-center rounded-luxury-lg glass-card border-primary/20 shadow-soft-md text-primary font-heading text-4xl font-bold transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:-translate-y-1">
                    {step.number}
                 </div>
              </div>
              
              <h3 className="font-heading text-xl font-bold text-primary mb-3 transition-colors group-hover:text-cta">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-rich-text/60 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
