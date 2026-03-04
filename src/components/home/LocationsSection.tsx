'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { locations } from '@/constants/homeData';

export default function LocationsSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeader title="Điểm giao nhận linh hoạt" subtitle="Chúng tôi có mặt tại các vị trí thuận tiện nhất cho bạn" />
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <div 
              key={location.id} 
              className="group relative h-[400px] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-xl"
            >
              <img 
                src={location.image} 
                alt={location.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="absolute bottom-10 left-8 right-8">
                <h3 className="font-heading text-2xl font-black text-white">
                  {location.name}
                </h3>
                <div className="mt-3 inline-flex items-center rounded-full bg-cta px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
                  {location.count} Xe hiện có
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
