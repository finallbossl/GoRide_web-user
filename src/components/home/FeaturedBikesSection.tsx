'use client';

import { useEffect, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import CarCard from '@/components/common/CarCard';
import { motorbikeApi } from '@/services/api';
import { Motorbike } from '@goride/shared';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedBikesSection() {
  const [bikes, setBikes] = useState<Motorbike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await motorbikeApi.getAll();
        if (response.success && response.data) {
          const bikeList = response.data.motorbikes || [];
          setBikes(bikeList.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch motorbikes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <section className="bg-[#FAF9F6] py-28 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#CA8A04]/20 to-transparent" />
      <div className="container">
        <SectionHeader
          title="Đội Xe Nổi Bật"
          subtitle="Những mẫu xe đời mới nhất, bảo trì định kỳ, sẵn sàng cùng bạn chinh phục mọi hành trình."
        />

        {loading ? (
          <div className="mt-12 flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes.map((bike: Motorbike) => {
              const bikeTypeLabel = bike.type === 'SCOOTER' ? 'Xe Tay Ga' : bike.type === 'MANUAL' ? 'Xe Số' : 'Xe Côn Tay';
              return (
                <CarCard
                  key={bike.id}
                  id={bike.id}
                  name={bike.name}
                  type={bikeTypeLabel}
                  price={Number(bike.pricePerDay).toLocaleString('vi-VN') + " đ"}
                  rating={4.8}
                  reviews="120+"
                  image={bike.images?.[0] || 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800'}
                  slug={bike.id}
                  status={bike.status}
                />
              );
            })}
            {bikes.length === 0 && (
              <div className="col-span-full text-center py-10 text-rich-text/40 font-medium">
                Chưa có dữ liệu xe.
              </div>
            )}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Link href="/motorbike" className="luxury-btn-outline group flex items-center gap-2 whitespace-nowrap">
            Xem Tất Cả Xe
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
