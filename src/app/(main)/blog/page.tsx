'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogApi } from '@/services/api';
import { Blog } from '@goride/shared';
import SectionHeader from '@/components/common/SectionHeader';
import { ArrowRight, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
        if (response.success && response.data) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <main className="bg-[#f8f9fa] relative min-h-screen pb-20 selection:bg-cta selection:text-white">
      {/* Hero Section - Refined Editorial */}
      <section className="relative pt-24 pb-16 px-6 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cta/10 border border-cta/20 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cta animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cta">Trung tâm tin tức GoRide</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-6 tracking-tight leading-tight pb-2">
              Khám Phá Quy Nhơn Qua Từng Chuyến Đi.
            </h1>
            <p className="text-lg md:text-xl font-medium text-primary/50 leading-relaxed">
              Cập nhật tin tức mới nhất, kinh nghiệm du lịch bụi và những cung đường tuyệt vời nhất tại thành phố biển.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Feed - Left (8 columns) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h2 className="font-heading text-2xl font-bold text-primary">Tin Tức Mới Nhất</h2>
              <div className="flex gap-4">
                 <button className="text-sm font-bold text-cta border-b-2 border-cta">Mọi lúc</button>
                 <button className="text-sm font-semibold text-primary/40 hover:text-primary transition-colors">Tuần này</button>
                 <button className="text-sm font-semibold text-primary/40 hover:text-primary transition-colors">Tháng này</button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-40">
                <Loader2 className="animate-spin text-cta" size={48} />
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {currentPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.id}`} 
                    className="group flex flex-col md:flex-row gap-6 bg-white p-4 rounded-luxury border border-transparent hover:border-border hover:shadow-soft-lg transition-all duration-300"
                  >
                    <div className="md:w-1/3 lg:w-2/5 aspect-[16/10] overflow-hidden rounded-lg bg-surface flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                    
                    <div className="flex flex-col flex-1 py-2">
                       <div className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-cta mb-3">
                         <span>{post.tag || 'Tạp chí'}</span>
                         <span className="h-1 w-1 rounded-full bg-primary/10" />
                         <span className="text-primary/40 normal-case font-bold tracking-normal italic flex items-center gap-1">
                           <Clock size={12} /> 5 phút đọc
                         </span>
                       </div>
                       
                       <h3 className="font-heading text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-cta transition-colors">
                         {post.title}
                       </h3>
                       
                       <p className="text-sm font-medium text-primary/50 line-clamp-3 leading-relaxed mb-6">
                         {post.description}
                       </p>
                       
                       <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                         <span>Đọc tiếp</span>
                         <ArrowRight size={14} className="text-cta" />
                       </div>
                    </div>
                  </Link>
                ))}
                
                {/* Pagination in Main Feed */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-12 border-t border-border mt-4">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-10 w-10 flex items-center justify-center rounded-luxury border border-border text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-20"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                            currentPage === page
                              ? 'bg-cta text-white shadow-soft-md'
                              : 'text-primary/40 hover:text-primary hover:bg-white'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="h-10 w-10 flex items-center justify-center rounded-luxury border border-border text-primary transition-all hover:bg-primary hover:text-white disabled:opacity-20"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Right (4 columns) */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Sticky Sidebar Content */}
            <div className="sticky top-24 flex flex-col gap-10">
              
              {/* Latest News Widget */}
              <div className="bg-white rounded-luxury-lg border border-border overflow-hidden p-6 shadow-soft-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                  <div className="h-6 w-1 bg-cta rounded-full" />
                  <h3 className="text-lg font-black uppercase tracking-wider text-primary">Tin Mới Nhất</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  {blogs.slice(0, 4).map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="group flex gap-4">
                       <div className="h-20 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                         <img src={post.image} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="flex flex-col justify-center gap-1">
                         <span className="text-[10px] font-bold tracking-widest uppercase text-cta">{post.tag || 'Trending'}</span>
                         <h4 className="text-sm font-bold text-primary group-hover:text-cta transition-colors line-clamp-2 leading-snug">
                           {post.title}
                         </h4>
                       </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-primary p-8 rounded-luxury-lg text-white">
                <h3 className="text-xl font-bold mb-6">Chuyên mục</h3>
                <div className="flex flex-wrap gap-2">
                  {['Du lịch', 'Kinh nghiệm', 'Xe máy', 'Ẩm thực', 'Sự kiện', 'Hướng dẫn'].map((cat) => (
                    <button key={cat} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all border border-white/5">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-white rounded-luxury-lg border border-border p-8 text-center space-y-4 shadow-soft-sm">
                <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto text-cta">
                  <span className="text-2xl font-black">@</span>
                </div>
                <h3 className="text-xl font-bold text-primary">Nhận Tin Mới</h3>
                <p className="text-sm text-primary/50 font-medium">Đăng ký để nhận những thông tin ưu đãi và cẩm nang du lịch sớm nhất.</p>
                <div className="flex flex-col gap-3">
                   <input 
                    type="email" 
                    placeholder="Email của bạn" 
                    className="w-full px-4 py-3 rounded-luxury border border-border text-sm focus:outline-none focus:border-cta font-medium"
                   />
                   <button className="w-full py-3 bg-primary text-white rounded-luxury font-bold text-xs uppercase tracking-widest hover:bg-cta transition-all shadow-soft-md">
                     Đăng ký ngay
                   </button>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
