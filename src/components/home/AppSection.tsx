'use client';

import { ArrowRight, Smartphone, ShieldCheck, CreditCard } from 'lucide-react';

export default function AppSection() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="container">
        <div className="relative glass-card rounded-luxury-xl p-12 lg:p-16 overflow-hidden border-primary/20 shadow-soft-lg">
          {/* Background Accent */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cta/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 border border-cta/20 text-cta mb-6">
                 <Smartphone size={14} />
                 <span className="text-xs font-semibold">Ứng Dụng Di Động</span>
              </div>

              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-6">
                Chạm Để Khởi Hành
              </h2>
              
              <p className="text-lg font-medium text-rich-text/60 leading-relaxed mb-8">
                Tải ứng dụng GoRide để nhận đặc quyền giảm 30% cho lần thuê đầu tiên. Quản lý toàn bộ hành trình chỉ với một cú chạm.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: ShieldCheck, text: 'Hỗ trợ khẩn cấp 24/7' },
                  { icon: CreditCard, text: 'Thanh toán bảo mật' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-luxury bg-surface text-cta">
                       <item.icon size={18} />
                    </div>
                    <span className="text-sm font-semibold text-primary">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="transition-all hover:-translate-y-1">
                  <img 
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                    alt="App Store" 
                    className="h-12 w-auto shadow-soft-md rounded-luxury" 
                  />
                </a>
                <a href="#" className="transition-all hover:-translate-y-1">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Google Play" 
                    className="h-12 w-auto shadow-soft-md rounded-luxury" 
                  />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 w-full max-w-[300px] mx-auto">
                 <img 
                   src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
                   alt="GoRide App" 
                   className="rounded-luxury-xl border-4 border-white shadow-luxury-xl" 
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
