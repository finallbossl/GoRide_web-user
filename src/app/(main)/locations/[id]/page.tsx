'use client';

// import '../locations.css';
// import '../../home.css'; // For car-card
import Link from 'next/link';

export default function LocationDetailPage() {
  return (
    <main className="location-detail-page bg-white min-h-screen">
      {/* 1. Immersive Hero */}
      <section 
        className="location-detail-hero" 
        style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%), url("https://images.unsplash.com/photo-1559592443-7f8776096d61?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="container detail-hero-content">
           <h1 className="detail-hero-title">Đà Nẵng</h1>
           <p className="detail-hero-subtitle">Cánh cổng dẫn lối tới những cung đường biển bất tận</p>
        </div>
      </section>

      <div className="container">
        {/* 2. Floating Status Card */}
        <div className="floating-status-card">
          <div className="status-badge-row">
            <span className="status-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              HOẠT ĐỘNG: 07:00 - 21:00
            </span>
            <span className="status-indicator" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#0ea5e9' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              PHẢN HỒI: {"<"} 15 PHÚT
            </span>
          </div>
          <p className="text-secondary font-medium leading-relaxed max-w-3xl">
            Tọa lạc tại vị trí đắc địa nhất quận Sơn Trà, cơ sở GoRide Đà Nẵng là điểm xuất phát lý tưởng. 
            Chúng tôi cung cấp dàn xe đời mới, bảo dưỡng kỹ lưỡng để bạn an tâm chinh phục đỉnh Bàn Cờ hay rong ruổi tới Hội An.
          </p>
        </div>

        {/* 3. Main Info Grid */}
        <div className="detail-info-grid">
          <div className="info-content-area">
            {/* Address & Logistics */}
            <div className="flex flex-col gap-6">
              <div className="info-card-modern">
                <h3>Vị trí nhận xe</h3>
                <p>123 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
              </div>
              <div className="info-card-modern" style={{ borderLeftColor: '#f59e0b' }}>
                <h3>Lưu ý nhận xe</h3>
                <p>Quý khách vui lòng mang theo Giấy phép lái xe và CCCD bản gốc để làm thủ tục nhanh chóng.</p>
              </div>
            </div>

            {/* Journey Itineraries */}
            <section className="mt-8">
              <h2 className="section-h2 text-left mb-6">Hành trình gợi ý tại Đà Nẵng</h2>
              <div className="itinerary-container">
                <div className="itinerary-item">
                  <div className="itinerary-number">01</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Chinh phục Bán Đảo Sơn Trà</h4>
                    <p className="text-secondary">Cung đường ven biển vòng quanh bán đảo, dừng chân tại Chùa Linh Ứng và đỉnh Bàn Cờ để ngắm toàn cảnh thành phố.</p>
                  </div>
                </div>
                <div className="itinerary-item">
                  <div className="itinerary-number">02</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Đà Nẵng - Hội An dạo phố</h4>
                    <p className="text-secondary">Hành trình 30km dọc theo đường biển Trường Sa, kết hợp tham quan Ngũ Hành Sơn trước khi tới Phố cổ Hội An.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky CTA Area */}
          <aside className="cta-sidebar">
            <div className="cta-sticky-box">
              <h3 className="font-extrabold text-2xl mb-4">Sẵn sàng trải nghiệm?</h3>
              <div className="space-y-4 mb-6">
                {[
                  "Bảo hiểm sự cố 24/7",
                  "Mũ bảo hiểm đạt chuẩn",
                  "Bản đồ du lịch địa phương",
                  "Không phát sinh chi phí ẩn"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold opacity-90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-cta)" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/cars" className="btn-primary w-full h-14 rounded-xl flex items-center justify-center font-bold tracking-tight">THUÊ XE NGAY</Link>
            </div>
          </aside>
        </div>

        {/* 4. Vehicles at Location */}
        <section className="py-20 border-t border-slate-100 mt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-h2 text-left mb-0">Xe sẵn sàng tại cơ sở</h2>
              <p className="text-secondary font-semibold mt-2">Lựa chọn người bạn đồng hành phù hợp</p>
            </div>
            <Link href="/cars" className="text-cta font-bold hover:underline flex items-center gap-2">
              Xem tất cả xe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="cars-grid">
            <Link href="/cars/honda-sh-150i" className="car-card">
              <div className="car-image-container">
                <span className="car-badge">Có sẵn</span>
                <img src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800" alt="SH" />
              </div>
              <div className="car-info">
                <div>
                  <h3 className="car-name">Honda SH 150i</h3>
                  <p className="car-type">Xe tay ga • Sang trọng</p>
                </div>
                <div className="car-price">
                  <span className="price-value">350k</span>
                  <p className="price-unit">/ngày</p>
                </div>
              </div>
              <div className="car-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>5.0 (320+)</span>
              </div>
            </Link>

            <Link href="/cars/honda-winner-x" className="car-card">
              <div className="car-image-container">
                <span className="car-badge">Hot</span>
                <img src="https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=800" alt="Winner X" />
              </div>
              <div className="car-info">
                <div>
                  <h3 className="car-name">Honda Winner X</h3>
                  <p className="car-type">Xe côn tay • Leo đèo cực khỏe</p>
                </div>
                <div className="car-price">
                  <span className="price-value">180k</span>
                  <p className="price-unit">/ngày</p>
                </div>
              </div>
              <div className="car-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>4.9 (420+)</span>
              </div>
            </Link>

            <Link href="/cars/yamaha-exciter" className="car-card">
              <div className="car-image-container">
                <img src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800" alt="Exciter" />
              </div>
              <div className="car-info">
                <div>
                  <h3 className="car-name">Yamaha Exciter 155</h3>
                  <p className="car-type">Xe côn tay • Thể thao</p>
                </div>
                <div className="car-price">
                  <span className="price-value">150k</span>
                  <p className="price-unit">/ngày</p>
                </div>
              </div>
              <div className="car-rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>4.8 (1.2k)</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 5. Final CTA */}
        <section className="text-center py-24 bg-teal-50/30 rounded-[40px] mb-24">
           <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Cơ sở Đà Nẵng sẵn sàng đón tiếp</h2>
           <p className="text-xl text-slate-600 font-semibold mb-10">Đừng bỏ lỡ những cung đường biển đẹp nhất Việt Nam</p>
           <Link href="/cars" className="btn-primary px-16 h-20 text-xl rounded-full inline-flex items-center font-black shadow-xl shadow-teal-500/20">KHÁM PHÁ NGAY</Link>
        </section>
      </div>
    </main>
  );
}
