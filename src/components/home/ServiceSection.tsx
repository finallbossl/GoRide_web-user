'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { MapPin, Headphones, Wrench } from 'lucide-react';

const SERVICES = [
  {
    title: 'Giao xe tận nơi',
    description: 'Miễn phí giao nhận xe trong bán kính 5km từ văn phòng trung tâm, giúp bạn tiết kiệm thời gian.',
    icon: MapPin,
  },
  {
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ kỹ thuật và CSKH luôn sẵn sàng hỗ trợ bạn trên mọi nẻo đường, bất kể thời gian nào.',
    icon: Headphones,
  },
  {
    title: 'Bảo dưỡng định kỳ',
    description: 'Tất cả xe được kiểm tra và bảo dưỡng nghiêm ngặt sau mỗi chuyến đi, đảm bảo an toàn tuyệt đối.',
    icon: Wrench,
  },
];

export default function ServiceSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-8">
        <SectionHeader title="Dịch vụ tận tâm" subtitle="Chúng tôi chăm chút từng chi tiết để bạn có hành trình trọn vẹn nhất" />
        
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className="group rounded-[2.5rem] bg-white p-10 border border-border/50 shadow-sm transition-all hover:shadow-xl hover:shadow-cta/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-cta transition-colors group-hover:bg-cta group-hover:text-white">
                <service.icon size={28} />
              </div>
              <h3 className="mt-8 font-heading text-2xl font-extrabold text-primary">
                {service.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-primary/40">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
