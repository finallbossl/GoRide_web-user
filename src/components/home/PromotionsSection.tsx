'use client';

import { useEffect, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { promotionApi } from '@/services/api';
import { Promotion } from '@goride/shared';
import { ChevronRight, Percent, Loader2 } from 'lucide-react';

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
    <section className="relative overflow-hidden border-t border-[#E7E5E4] bg-[#fdf9f2] py-24 md:py-28">
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
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {promos.map((promo: Promotion) => (
              <div
                key={promo.id}
                className="group relative h-[390px] overflow-hidden rounded-[1.8rem] border border-primary/10 shadow-soft-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-xl"
              >
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16130f] via-[#16130f]/35 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                      <Percent className="text-[#f59e0b]" size={18} strokeWidth={2.8} />
                    </div>
                    <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-[#facc15]">{promo.badge || 'Trạng thái Elite'}</span>
                  </div>

                  <h3 className="mb-3 font-heading text-3xl font-black leading-tight tracking-tight text-white">
                    {promo.title}
                  </h3>

                  <p className="mb-7 line-clamp-2 text-sm leading-relaxed text-white/75">
                    {promo.description}
                  </p>

                  <button className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15] transition-all duration-300 group-hover:gap-4 group-hover:text-white">
                    Xem đặc quyền
                    <ChevronRight size={14} strokeWidth={2.6} />
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
