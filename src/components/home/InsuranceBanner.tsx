'use client';

import { ShieldCheck } from 'lucide-react';

export default function InsuranceBanner() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 sm:p-12 lg:p-16">
          {/* Background Decorative Element */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cta/10 blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-cta text-white shadow-2xl shadow-cta/20">
              <ShieldCheck size={48} />
            </div>
            
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-3xl font-black text-white sm:text-4xl">
                An tâm trên mọi hành trình
              </h2>
              <p className="mt-4 text-lg font-medium text-white/60">
                Mọi chuyến thuê xe đều bao gồm gói bảo hiểm trách nhiệm dân sự và bảo hiểm tai nạn cho người lái.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start">
                {['BAOVIET', 'PTI', 'LIBERTY', 'VNI'].map((brand) => (
                  <span 
                    key={brand} 
                    className="text-xs font-black tracking-widest text-white/30 transition-colors hover:text-white/60"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="mt-4 w-full rounded-2xl bg-white/10 px-8 py-5 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 lg:ml-auto lg:mt-0 lg:w-auto">
              Xem chi tiết gói bảo hiểm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
