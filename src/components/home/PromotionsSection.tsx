'use client';

import { useEffect, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { promotionApi } from '@/services/api';
import { Promotion } from '@goride/shared';
import { ChevronRight, Percent, Clock, MapPin, Loader2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PromotionsSection() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await promotionApi.getAll();
        if (response.success && response.data) {
          setPromos(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  return (
    <section className="bg-[#FAF9F6] py-28 overflow-hidden relative border-t border-[#E7E5E4]">
      <div className="container">
        <SectionHeader 
          title="Ưu đãi Độc quyền" 
          subtitle="Khám phá những đặc quyền và cơ hội theo mùa được thiết kế riêng cho những khách hàng ưu tú nhất của GoRide." 
        />
        
        {loading ? (
          <div className="mt-12 flex justify-center py-20">
            <Loader2 className="animate-spin text-[#CA8A04]" size={40} />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promos.map((promo: Promotion) => (
              <div 
                key={promo.id} 
                className="group relative h-[400px] overflow-hidden rounded-luxury-xl shadow-luxury-xl transition-all duration-700 hover:shadow-luxury-2xl hover:-translate-y-2 border border-[#1C1917]/5"
              >
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-luxury bg-white/10 backdrop-blur-md border border-white/20">
                          <Percent className="text-[#CA8A04]" size={20} strokeWidth={3} />
                        </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CA8A04] whitespace-nowrap">{promo.badge || 'Trạng thái Elite'}</span>
                  </div>

                  <h3 className="font-heading text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                    {promo.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-white/50 leading-relaxed mb-8 line-clamp-2">
                    {promo.description}
                  </p>

                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#CA8A04] transition-all duration-300 group-hover:gap-5 group-hover:text-white">
                      Xem đặc quyền
                      <ChevronRight size={14} strokeWidth={3} />
                    </button>
                </div>
              </div>
            ))}
            {promos.length === 0 && (
              <div className="col-span-full text-center py-10 text-[#44403C]/40 font-black uppercase tracking-widest">
                Elite privileges soon to be unveiled.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
