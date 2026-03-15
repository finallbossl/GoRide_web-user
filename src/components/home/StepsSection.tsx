'use client';

import SectionHeader from '@/components/common/SectionHeader';
import { steps } from '@/constants/homeData';

export default function StepsSection() {
  return (
    <section className="overflow-hidden bg-[#fffaf2] py-20 md:py-24">
      <div className="container">
        <SectionHeader
          title="Quy Trình Đơn Giản"
          subtitle="Chỉ 4 bước để bắt đầu hành trình của bạn với GoRide."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.number} className="group relative flex flex-col items-center rounded-2xl border border-primary/10 bg-white p-6 text-center shadow-soft-md transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-[70%] right-[-37%] top-12 hidden h-0.5 bg-primary/10 lg:block" />
              )}

              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-cta/10 blur-xl scale-0 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/15 bg-[#fffaf2] font-heading text-3xl font-bold text-primary shadow-sm transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:-translate-y-1">
                  {step.number}
                </div>
              </div>

              <h3 className="mb-3 font-heading text-xl font-bold text-primary transition-colors group-hover:text-cta">
                {step.title}
              </h3>
              <p className="px-2 text-sm leading-relaxed text-rich-text/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
