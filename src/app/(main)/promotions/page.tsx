'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Tag, Calendar, Users, ArrowRight, CheckCircle2,
  Gift, Ticket, Sparkles, Clock, ChevronLeft, ChevronRight, Award, Search, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { promotionApi } from '@/services/api';
import { Promotion } from '@goride/shared';

const ITEMS_PER_PAGE = 3;

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionApi.getAll();
        if (response.success && response.data) {
          setPromotions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const filteredPromotions = useMemo(() => {
    return promotions.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [promotions, searchQuery]);

  const totalPages = Math.ceil(filteredPromotions.length / ITEMS_PER_PAGE);
  const currentItems = filteredPromotions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="bg-[#f8f9fa] relative min-h-screen pb-40 selection:bg-cta selection:text-white">
      {/* 1. Refined Hero Section */}
      <section className="relative pt-24 pb-20 px-6 bg-white border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cta/5 skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-start max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cta/10 border border-cta/20 mb-8 animate-fade-in">
              <Sparkles size={14} className="text-cta" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cta">Ưu đãi độc quyền GoRide</span>
            </div>

            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tighter leading-none">
              Tiết Kiệm Tối Đa Hành Trình.
            </h1>

            <p className="text-xl md:text-2xl font-medium text-primary/50 leading-relaxed max-w-4xl">
              Danh sách những mã giảm giá và chương trình khuyến mãi tốt nhất dành riêng cho bạn. Thu thập voucher và lên đường ngay hôm nay.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 -mt-8 relative z-30">
        {/* 2. Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 bg-white p-6 rounded-2xl shadow-soft-xl border border-border">
          <div className="flex bg-surface p-1 rounded-xl w-full md:w-auto">
            {['Tất cả', 'Mới nhất', 'Sắp hết hạn'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 md:flex-none",
                  tab === 'Tất cả' ? "bg-white text-primary shadow-soft-sm" : "text-primary/40 hover:text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-cta transition-colors" size={18} />
            <input
              type="text"
              placeholder="Tìm mã ưu đãi..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-surface border border-transparent focus:bg-white focus:border-border rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-cta/5 transition-all font-semibold"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="animate-spin text-cta" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((p, idx) => {
              const isExpired = p.endDate ? new Date(p.endDate) < new Date() : false;
              const isActive = p.isActive && !isExpired;

              return (
                <div
                  key={p.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft-lg hover:shadow-luxury-xl border border-border hover:border-cta/20 transition-all duration-500"
                >
                  {/* Top: Image & Status */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm",
                        isActive ? "bg-cta text-white" : "bg-white/20 text-white"
                      )}>
                        {isActive ? 'Đang áp dụng' : 'Hết hạn'}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-3xl font-black italic font-heading tracking-tight leading-none">
                        GIẢM {p.discountType === 'PERCENTAGE' ? `${p.discountValue}%` : `${(p.discountValue || 0).toLocaleString()}K`}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Ticket Notch Effect */}
                  <div className="relative h-4 bg-white flex items-center justify-between px-[-4px]">
                    <div className="h-6 w-3 bg-[#f8f9fa] rounded-r-full border-r border-border -ml-[1px]" />
                    <div className="flex-1 border-t-2 border-dashed border-border mx-2" />
                    <div className="h-6 w-3 bg-[#f8f9fa] rounded-l-full border-l border-border -mr-[1px]" />
                  </div>

                  {/* Bottom: Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-cta transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm font-medium text-primary/40 line-clamp-2 mb-6 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-primary/30">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-cta" />
                          <span>Hết hạn: {p.endDate ? new Date(p.endDate).toLocaleDateString('vi-VN') : 'Vô hạn'}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between bg-surface p-3 rounded-xl border border-dashed border-border">
                          <span className="text-xs font-black tracking-widest text-primary">{p.code}</span>
                          <button
                            className="text-[10px] font-black text-cta hover:underline uppercase"
                            onClick={() => {
                              navigator.clipboard.writeText(p.code);
                              // Optional toast
                            }}
                          >
                            Sao chép
                          </button>
                        </div>

                        {isActive ? (
                          <Link
                            href="/motorbike"
                            className="w-full py-3.5 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-cta transition-all shadow-soft-md group-hover:scale-[1.02] active:scale-95"
                          >
                            Sử dụng ngay
                          </Link>
                        ) : (
                          <div className="w-full py-3.5 bg-border/20 text-primary/20 rounded-xl font-black text-[10px] uppercase tracking-widest text-center cursor-not-allowed">
                            Chương trình kết thúc
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Modern Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-primary/30">
              Trang <span className="text-cta">{currentPage}</span> trên {totalPages}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-12 w-12 rounded-xl bg-white border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-white disabled:opacity-20"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "h-12 w-12 rounded-xl text-sm font-bold transition-all",
                      currentPage === i + 1 ? "bg-cta text-white shadow-soft-md" : "bg-white text-primary/40 border border-border hover:border-primary hover:text-primary"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-12 w-12 rounded-xl bg-white border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-white disabled:opacity-20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* 4. Support Banner */}
        <section className="mt-32 bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-luxury-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-cta/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">Kế hoạch riêng cho doanh nghiệp?</h2>
          <p className="mx-auto text-lg md:text-xl font-medium text-white/40 mb-10 max-w-4xl italic">Chúng tôi cung cấp các giải pháp thuê xe trọn gói và ưu đãi độc quyền cho tổ chức, sự kiện đoàn thể với số lượng lớn.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-4 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cta hover:text-white transition-all shadow-luxury-lg">Liên hệ tư vấn</button>
            <button className="px-10 py-4 border border-white/20 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Dành cho đối tác</button>
          </div>
        </section>
      </div>
    </main>
  );
}
