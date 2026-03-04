'use client';

import { DollarSign, Zap, RefreshCw, Headset } from 'lucide-react';

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Giá Minh Bạch',
    description: 'Không phí ẩn, giá cả rõ ràng từ đầu đến cuối'
  },
  {
    icon: Zap,
    title: 'Đặt Xe Nhanh Chóng',
    description: 'Chỉ 3 phút để hoàn tất đặt xe trực tuyến'
  },
  {
    icon: RefreshCw,
    title: 'Đổi Xe Linh Hoạt',
    description: 'Thay đổi lịch trình dễ dàng, không mất phí'
  },
  {
    icon: Headset,
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ hỗ trợ luôn sẵn sàng mọi lúc mọi nơi'
  }
];

export default function FeatureBenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-rich-text mb-4">
            Tại Sao Chọn GoRide?
          </h2>
          <p className="text-lg font-medium text-rich-text/60 max-w-2xl mx-auto">
            Chúng tôi mang đến trải nghiệm thuê xe máy tốt nhất với dịch vụ chuyên nghiệp và tận tâm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-luxury-lg bg-gradient-to-br from-surface to-white border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-luxury bg-gradient-to-br from-primary to-cta text-white shadow-soft-md mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold text-rich-text mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm font-medium text-rich-text/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
