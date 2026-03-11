'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  MapPin, Star, Compass, ArrowRight, Award, Wind, Mountain, Loader2
} from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { locationApi } from '@/services/api';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-background text-primary/10 font-black animate-pulse uppercase tracking-[0.5em] text-[10px]">Initialising Elite Network...</div>
});


export default function LocationsPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAll();
        if (response.success && response.data) {
          // Map backend data to frontend structure if necessary
          const mappedData = response.data.map((loc: any) => ({
            id: loc.id.toString(),
            name: loc.name,
            desc: "Điểm đến lý tưởng với đội xe chất lượng cao từ GoRide.", // Placeholder for missing desc
            image: loc.image,
            bikes: loc.count || "100+",
            rating: (4.5 + Math.random() * 0.5).toFixed(1), // Random rating between 4.5 and 5.0
            address: `Elite Hub: ${loc.name}, Việt Nam` // Placeholder for address
          }));
          setLocations(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <main className="bg-background relative min-h-screen pb-40">
      {/* 1. Immersive Elite Hero */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-primary px-8">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600"
          alt="Travel Locations Elite"
          className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-[20s] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-background" />

        <div className="container relative z-10">
          <div className="max-w-4xl text-center lg:text-left mx-auto lg:mx-0 mt-36 ">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-card border-white/20 mb-10 shadow-luxury-xl">
              <Compass size={16} className="text-cta" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cta">National Elite Presence</span>
            </div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-[110px] font-bold text-white tracking-tight leading-[0.85] mb-12">
              Khám Phá Đường Chân Trời
            </h1>
            <p className="text-xl font-medium text-white/40 leading-relaxed mb-16 italic">
              &quot;GoRide Premium hiện diện tại những trung tâm du hành tinh hoa nhất Việt Nam. Một tiêu chuẩn phục vụ tối thượng, hàng triệu trải nghiệm đẳng cấp.&quot;
            </p>
            <Link href="#discovery" className="luxury-btn-primary px-16 py-6 inline-flex items-center gap-5 shadow-luxury-xl rounded-[2.5rem]">
              <span className="text-xs">INITIATE EXPLORATION</span>
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      <div className="container -mt-24 relative z-30 mt-16" id="discovery">
        {/* 2. Map & Grid Curation */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-24 items-start">

          {/* Elite Network Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="glass-card p-12 rounded-[4.5rem] border-white/40 shadow-luxury-xl bg-white/50 backdrop-blur-3xl mb-16 border-[12px] border-white/50">
              <h2 className="font-heading text-4xl font-bold text-primary mb-8 tracking-tight">Mạng Lưới Elite</h2>
              <p className="text-lg font-medium text-primary/30 leading-relaxed italic">&quot;Chọn điểm khởi đầu lý tưởng để khơi nguồn cảm hứng du hành của bạn ngay hôm nay.&quot;</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-cta" size={40} />
              </div>
            ) : (
              locations.map((loc: any) => (
                <Link key={loc.id} href="/motorbike" className="group block glass-card p-12 rounded-[4.5rem] border-transparent hover:border-white/40 transition-all duration-700 hover:shadow-luxury-xl hover:-translate-y-3 liquid-hover bg-white/40 backdrop-blur-md">
                  <div className="flex items-start justify-between mb-10">
                    <div>
                      <h3 className="font-heading text-4xl font-bold text-primary group-hover:text-cta transition-colors tracking-tight">{loc.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/20 mt-4">
                        <MapPin size={14} className="text-cta/60" />
                        {loc.address}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-background border border-primary/5 text-xs font-black text-primary shadow-soft-sm">
                      <Star size={16} className="fill-cta text-cta" />
                      {loc.rating}
                    </div>
                  </div>

                  <p className="text-lg font-medium text-primary/40 leading-relaxed mb-12 italic line-clamp-2">&quot;{loc.desc}&quot;</p>

                  <div className="flex items-center justify-between border-t border-primary/5 pt-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cta mb-1">AVAILABILITY</span>
                      <span className="text-xs font-bold text-primary">{loc.bikes} Elite Units</span>
                    </div>
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-primary text-white transition-all duration-700 group-hover:rotate-45 group-hover:bg-cta group-hover:shadow-luxury-xl shadow-soft-lg">
                      <ArrowRight size={22} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Immersive Map Preview */}
          <div className="hidden lg:block lg:col-span-8 sticky top-32">
            <div className="relative h-[850px] rounded-[5rem] overflow-hidden border-[15px] border-white shadow-luxury-xl group">
              <MapComponent locations={locations} />

              {/* Live Overlays */}
              <div className="absolute top-10 left-10 p-8 glass-card rounded-[3rem] border-white/20 shadow-luxury-xl bg-white/60 backdrop-blur-xl animate-pulse">
                <div className="flex items-center gap-5">
                  <div className="h-4 w-4 rounded-full bg-cta shadow-[0_0_20px_rgba(202,138,4,0.6)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Network Synchronized</span>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 p-16 glass-card rounded-[4.5rem] border-white/30 shadow-luxury-xl backdrop-blur-3xl bg-white/40 border-[10px] border-white/20 translate-y-8 group-hover:translate-y-0 transition-transform duration-1000">
                <div className="flex items-center gap-4 mb-6">
                  <Award size={20} className="text-cta" />
                  <h4 className="font-heading text-3xl font-bold text-primary tracking-tight">Vận Hành Toàn Quốc</h4>
                </div>
                <p className="text-lg font-medium text-primary/40 leading-relaxed italic">&quot;Mỗi chiếc xe tại bất kỳ chi nhánh nào đều trải qua quy trình kiểm chuẩn 100 điểm của GoRide Premium trước khi được bàn giao cho các thành viên Elite.&quot;</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Inspiration Carousel */}
        <section className="mt-32">
          <SectionHeader
            title="Cảm Hứng Du Hành"
            subtitle="Những cung đường huyền thoại được giám tuyển bởi đội ngũ chuyên gia hành trình GoRide Elite."
          />

          <div className="mt-16 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-scroll-left">
              {[...locations, ...locations].map((s, idx) => (
                <div
                  key={idx}
                  className="group relative flex-shrink-0 w-[320px] h-[280px] rounded-luxury-lg overflow-hidden shadow-soft-lg border border-primary/10 transition-all duration-300 hover:shadow-luxury-xl hover:-translate-y-2 hover:scale-105"
                >
                  <img src={s.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="h-12 w-12 flex items-center justify-center rounded-luxury bg-cta text-white shadow-soft-md mb-4 transition-all duration-300 group-hover:scale-110">
                      <MapPin size={20} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">{s.name}</h3>
                    <p className="text-xs font-medium text-white/70 leading-relaxed mb-4 line-clamp-2">{s.desc}</p>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cta opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Khám Phá</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
             @keyframes scroll-left {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
             }
             .animate-scroll-left {
               animation: scroll-left 30s linear infinite;
             }
             .animate-scroll-left:hover {
               animation-play-state: paused;
             }
           `}</style>
        </section>
      </div>
    </main>
  );
}
