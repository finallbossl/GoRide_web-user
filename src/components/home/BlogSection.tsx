'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { blogApi } from '@/services/api';
import { Blog } from '@goride/shared';
import SectionHeader from '@/components/common/SectionHeader';
import { ArrowRight, BookOpen, Clock, Loader2 } from 'lucide-react';

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
        if (response.success && response.data) {
          setBlogs(response.data.slice(0, 3)); // Only show top 3 on home
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-white py-28 overflow-hidden  border-t border-[#E7E5E4]">
      <div className="container">
        <SectionHeader 
          title="Tạp chí Hành trình Elite" 
          subtitle="Khám phá những điểm đến tuyệt vời và những thông tin du lịch được tuyển chọn bởi các chuyên gia của GoRide."
        />
        
        {loading ? (
          <div className="mt-12 flex justify-center py-20">
            <Loader2 className="animate-spin text-[#CA8A04]" size={40} />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((post: Blog) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`} 
                className="group flex flex-col overflow-hidden transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-luxury-lg shadow-soft-lg group-hover:shadow-luxury-xl border border-[#E7E5E4] transition-all duration-500">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 rounded-luxury bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#1C1917] border border-[#1C1917]/5 shadow-sm">
                    {post.tag || 'Kiến thức Elite'}
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col pt-8">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest mb-4">
                     <Clock size={14} strokeWidth={2.5} />
                     <span className="whitespace-nowrap">5 PHÚT ĐỌC</span>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-[#1C1917] group-hover:text-[#CA8A04] transition-colors mb-4 line-clamp-2 tracking-tight leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm font-medium text-[#44403C]/60 line-clamp-3 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[11px] font-black text-[#CA8A04] uppercase tracking-widest transition-all duration-500 group-hover:gap-4">
                    <span className="whitespace-nowrap italic">Khám phá câu chuyện</span>
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </Link>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full text-center py-10 text-[#44403C]/40 font-bold uppercase tracking-widest">
                Journals coming soon.
              </div>
            )}
          </div>
        )}

        <div className="mt-20 flex justify-center">
          <Link 
            href="/blog" 
            className="flex h-14 items-center justify-center rounded-luxury border-2 border-[#1C1917] bg-transparent px-10 text-[11px] font-black uppercase tracking-widest text-[#1C1917] transition-all duration-300 hover:bg-[#1C1917] hover:text-[#CA8A04] group whitespace-nowrap"
          >
            <BookOpen size={18} className="mr-2" />
            <span>Khám phá toàn bộ bộ sưu tập</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
