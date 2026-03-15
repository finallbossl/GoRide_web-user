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
    <section className="overflow-hidden border-t border-[#E7E5E4] bg-white py-24 md:py-28">
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
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post: Blog) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-[#fffaf2] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#E7E5E4] shadow-soft-md transition-all duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-xl border border-[#1C1917]/10 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1917] shadow-sm backdrop-blur-sm">
                    {post.tag || 'Kiến thức Elite'}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-1 pb-2 pt-6">
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#57534E]/70">
                    <Clock size={14} strokeWidth={2.5} />
                    <span className="whitespace-nowrap">5 PHÚT ĐỌC</span>
                  </div>
                  <h3 className="mb-3 line-clamp-2 font-heading text-2xl font-black leading-tight tracking-tight text-[#1C1917] transition-colors group-hover:text-[#CA8A04]">
                    {post.title}
                  </h3>
                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#57534E]/85">
                    {post.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#CA8A04] transition-all duration-500 group-hover:gap-3">
                    <span className="whitespace-nowrap">Khám phá câu chuyện</span>
                    <ArrowRight size={14} strokeWidth={2.8} />
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

        <div className="mt-16 flex justify-center">
          <Link
            href="/blog"
            className="group flex h-12 items-center justify-center rounded-xl border border-[#1C1917]/20 bg-white px-7 text-sm font-semibold text-[#1C1917] transition-all duration-300 hover:border-[#CA8A04] hover:text-[#CA8A04] whitespace-nowrap"
          >
            <BookOpen size={18} className="mr-2" />
            <span>Khám phá toàn bộ bộ sưu tập</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
