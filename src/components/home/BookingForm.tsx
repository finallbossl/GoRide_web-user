'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { locationApi } from '@/services/api';

export default function BookingForm() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [locations, setLocations] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAll();
        if (response.success && response.data) {
          setLocations(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (pickupDate) params.append('pickupDate', pickupDate);
    if (returnDate) params.append('returnDate', returnDate);

    router.push(`/motorbike?${params.toString()}`);
  };

  return (
    <section id="booking" className="relative z-30 -mt-20 pb-20">
      <div className="container">
        <div className="rounded-luxury-xl border border-[#1C1917]/10 bg-white/95 p-4 shadow-luxury-2xl backdrop-blur md:p-6">
          <div className="mb-4 px-2 md:mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78716C]">Đặt xe nhanh</p>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[#1C1917] md:text-xl">Chọn điểm nhận và thời gian thuê</h3>
          </div>

          <form className="grid grid-cols-1 gap-3 md:grid-cols-4" onSubmit={handleSubmit}>

            {/* Location */}
            <div className="space-y-2 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-4 transition-colors duration-300 hover:bg-white md:rounded-l-luxury md:border-r md:border-[#1C1917]/10">
              <label className="block text-xs font-semibold tracking-wide text-[#44403C]">Điểm nhận xe</label>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CA8A04]/10 text-[#CA8A04]">
                  <MapPin size={18} strokeWidth={2.4} />
                </span>
                <select
                  className="h-11 w-full rounded-xl border border-[#D6D3D1] bg-white px-3 text-sm font-medium text-[#1C1917] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#CA8A04]/45"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Chọn địa điểm</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pickup Date */}
            <div className="space-y-2 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-4 transition-colors duration-300 hover:bg-white md:border-r md:border-[#1C1917]/10">
              <label className="block text-xs font-semibold tracking-wide text-[#44403C]">Ngày nhận xe</label>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CA8A04]/10 text-[#CA8A04]">
                  <Calendar size={18} strokeWidth={2.4} />
                </span>
                <input
                  type="date"
                  className="h-11 w-full rounded-xl border border-[#D6D3D1] bg-white px-3 text-sm font-medium text-[#1C1917] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#CA8A04]/45"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="space-y-2 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-4 transition-colors duration-300 hover:bg-white md:border-r md:border-[#1C1917]/10">
              <label className="block text-xs font-semibold tracking-wide text-[#44403C]">Ngày trả xe</label>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CA8A04]/10 text-[#CA8A04]">
                  <Calendar size={18} strokeWidth={2.4} />
                </span>
                <input
                  type="date"
                  className="h-11 w-full rounded-xl border border-[#D6D3D1] bg-white px-3 text-sm font-medium text-[#1C1917] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#CA8A04]/45"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-stretch rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-2 md:border-transparent md:bg-transparent md:p-0">
              <button
                type="submit"
                className="flex h-full min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#1C1917] px-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#292524] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CA8A04]/55"
              >
                <Search size={18} strokeWidth={2.8} />
                <span className="whitespace-nowrap">Tìm xe ngay</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
