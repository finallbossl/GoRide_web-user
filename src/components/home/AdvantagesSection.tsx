'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { advantages } from '@/constants/homeData';
import { Zap, Bike, Banknote, ShieldCheck } from 'lucide-react';

const iconMap = {
  fast: Zap,
  bike: Bike,
  price: Banknote,
  shield: ShieldCheck,
};

export default function AdvantagesSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeader title="Tại sao nên chọn GoRide?" />
        
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => {
            const Icon = iconMap[advantage.iconName] || Zap;
            return (
              <div 
                key={index} 
                className="group flex flex-col items-center text-center transition-all hover:-translate-y-2"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-surface text-cta transition-all group-hover:bg-cta group-hover:text-white group-hover:rotate-6">
                  <Icon size={32} />
                </div>
                <h3 className="mt-8 font-heading text-xl font-extrabold text-primary">
                  {advantage.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-primary/40">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
