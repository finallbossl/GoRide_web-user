'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogApi } from '@/services/api';
import { Blog } from '@goride/shared';
import {
  ArrowLeft,
  Calendar,
  Tag,
  Heart,
  MessageSquare,
  Share2,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';


export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getById(id);
        if (response.success && response.data) {
          setPost(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <Loader2 className="animate-spin text-cta" size={48} />
        <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Đang tải câu chuyện hành trình...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF9F6]">
        <AlertCircle className="text-cta" size={48} />
        <p className="text-primary font-bold">Không tìm thấy bài viết</p>
        <Link href="/blog" className="text-cta font-semibold underline">Quay lại Blog</Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FAF9F6] min-h-screen">
      {/* ---------------- HEADER ---------------- */}
      <div className="container max-w-4xl pt-40 px-6 mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-cta transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại Blog
        </Link>

        <div className="mt-10 space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-cta uppercase tracking-widest">
            <Tag size={14} /> {post.tag || 'Khám phá'}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary leading-tight lowercase first-letter:uppercase">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm font-medium text-primary/40">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-cta" /> {new Date(post.createdAt || Date.now()).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-cta" /> {post.author || 'GoRide Elite'}
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="container max-w-4xl m-20 px-6 mx-auto">
        {/* Article */}
        <article>
          <div className="rounded-[3rem] overflow-hidden shadow-luxury-2xl border-4 border-white mb-16 aspect-video">
            <img
              src={post.image || "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=1200"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-2xl font-medium italic text-primary/70 leading-relaxed mb-12 border-l-4 border-cta pl-8 py-2">
              {post.description}
            </p>

            <div
              className="text-primary/80 leading-relaxed text-lg font-medium space-y-8"
              dangerouslySetInnerHTML={{ __html: post.content || '<p>Nội dung đang được cập nhật...</p>' }}
            />
          </div>
        </article>
      </div>
    </main>
  );
}

