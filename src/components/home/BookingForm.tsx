'use client';

import { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingForm() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (pickupDate) params.append('pickupDate', pickupDate);
    if (returnDate) params.append('returnDate', returnDate);
    
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section id="booking" className="relative z-30 -mt-20 pb-20">
      <div className="container">
        <div className="bg-white rounded-luxury-xl shadow-luxury-2xl border border-[#1C1917]/5 p-2 md:p-4">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-2" onSubmit={handleSubmit}>
            
            {/* Location */}
            <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-[#1C1917]/5 group hover:bg-[#FAF9F6] transition-colors rounded-l-luxury transition-all duration-300">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#44403C]/40 mb-3 whitespace-nowrap">
                Điểm nhận xe Elite
              </label>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#CA8A04] flex-shrink-0" strokeWidth={2.5} />
                <select 
                  className="w-full bg-transparent border-none outline-none font-black text-[#1C1917] cursor-pointer appearance-none text-sm tracking-tight"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Chọn địa điểm...</option>
                  <option value="office">Văn phòng trung tâm Elite</option>
                  <option value="airport">Cảng hàng không quốc tế</option>
                  <option value="station">Ga tàu Heritage</option>
                </select>
              </div>
            </div>

            {/* Pickup Date */}
            <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-[#1C1917]/5 group hover:bg-[#FAF9F6] transition-colors transition-all duration-300">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#44403C]/40 mb-3 whitespace-nowrap">
                Ngày khởi hành
              </label>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#CA8A04] flex-shrink-0" strokeWidth={2.5} />
                <input 
                  type="date" 
                  className="w-full bg-transparent border-none outline-none font-black text-[#1C1917] cursor-pointer text-sm tracking-tight"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-[#1C1917]/5 group hover:bg-[#FAF9F6] transition-colors transition-all duration-300">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#44403C]/40 mb-3 whitespace-nowrap">
                Ngày hoàn trả Elite
              </label>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#CA8A04] flex-shrink-0" strokeWidth={2.5} />
                <input 
                  type="date" 
                  className="w-full bg-transparent border-none outline-none font-black text-[#1C1917] cursor-pointer text-sm tracking-tight"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="p-4 flex items-center">
              <button 
                type="submit" 
                className="flex h-full w-full items-center justify-center gap-3 rounded-luxury bg-[#1C1917] text-[#CA8A04] font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-[#CA8A04] hover:text-white hover:scale-[1.02] shadow-luxury-xl group"
              >
                <Search size={20} strokeWidth={3} />
                <span className="whitespace-nowrap">Tìm kiếm bộ sưu tập</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Benefits */}
        <div className="mt-12 flex flex-wrap justify-center gap-10">
           {['Giao xe tận nơi', 'Bảo hiểm Elite toàn diện', 'Tiêu chuẩn đội xe Elite', 'Hỗ trợ tận tâm 24/7'].map(hint => (
              <div key={hint} className="flex items-center gap-3 group">
                 <div className="h-1 w-1 rounded-full bg-[#CA8A04] group-hover:scale-150 transition-transform duration-300" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#44403C]/40 group-hover:text-[#1C1917] transition-colors">{hint}</span>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
