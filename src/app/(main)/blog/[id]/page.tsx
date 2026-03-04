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

/* ---------------- MOCK COMMENTS ---------------- */
const initialComments = [
  {
    id: 1,
    name: 'Minh Anh',
    avatar: 'https://i.pravatar.cc/100?img=5',
    content: 'Bài viết rất hay, đọc xong chỉ muốn xách xe lên và đi ngay!',
    date: '2 ngày trước',
  },
  {
    id: 2,
    name: 'Hoàng Long',
    avatar: 'https://i.pravatar.cc/100?img=12',
    content: 'Cảm giác chạy xe ven biển đúng là không gì sánh bằng.',
    date: '1 ngày trước',
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');

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

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        name: 'Người dùng',
        avatar: 'https://i.pravatar.cc/100?img=32',
        content: commentText,
        date: 'Vừa xong',
      },
    ]);

    setCommentText('');
  };

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
      <div className="container max-w-4xl pt-40 px-6">
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
      <div className="container max-w-6xl mt-20 grid lg:grid-cols-12 gap-16 px-6">
        {/* Article */}
        <article className="lg:col-span-8">
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

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-white rounded-[3rem] p-10 shadow-luxury-lg border border-primary/5">
            <h4 className="font-black text-primary uppercase tracking-widest mb-8 flex items-center gap-3">
               <Sparkles size={20} className="text-cta" /> Bài viết khác
            </h4>
            <div className="space-y-8">
               <p className="text-sm font-medium text-primary/30 italic">Đang cập nhật đề xuất riêng cho bạn...</p>
            </div>
          </div>

          <div className="bg-primary text-white rounded-[3.5rem] p-12 relative overflow-hidden group shadow-luxury-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
            <h4 className="text-2xl font-bold mb-6 italic leading-tight">
              Sẵn sàng cho hành trình của chính mình?
            </h4>
            <p className="text-white/40 mb-10 text-sm font-medium leading-relaxed">
              Khám phá đội xe GoRide Elite và bắt đầu viết nên câu chuyện hành trình đẳng cấp của bạn.
            </p>
            <Link
              href="/cars"
              className="luxury-btn-primary block w-full text-center py-5 rounded-2xl bg-white text-primary hover:bg-cta hover:text-white border-none text-[10px] font-black tracking-widest"
            >
              KHÁM PHÁ ĐỘI XE
            </Link>
          </div>
        </aside>
      </div>

      {/* ---------------- ACTIONS ---------------- */}
      <div className="container max-w-4xl mt-24 flex gap-12 px-6">
        <button className="flex items-center gap-3 text-sm font-black text-primary/40 hover:text-cta transition-all">
          <div className="h-12 w-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center shadow-soft-sm">
             <Heart size={18} />
          </div>
          1.2k+
        </button>
        <button className="flex items-center gap-3 text-sm font-black text-primary/40 hover:text-cta transition-all">
          <div className="h-12 w-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center shadow-soft-sm">
             <MessageSquare size={18} />
          </div>
          {comments.length}
        </button>
        <button className="flex items-center gap-3 text-sm font-black text-primary/40 hover:text-cta transition-all">
          <div className="h-12 w-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center shadow-soft-sm">
             <Share2 size={18} />
          </div>
          Chia sẻ
        </button>
      </div>

      {/* ---------------- COMMENTS ---------------- */}
      <section className="container max-w-4xl mt-24 pb-40 px-6">
        <h3 className="text-3xl font-bold text-primary mb-12 flex items-baseline gap-4">
          Cảm nhận <span className="text-primary/20 text-sm font-black uppercase tracking-widest">({comments.length})</span>
        </h3>

        {/* List */}
        <div className="space-y-12">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-8 group">
              <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-white shadow-luxury-md shrink-0">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-baseline gap-4">
                  <p className="font-black text-primary text-sm">{comment.name}</p>
                  <span className="text-[10px] text-primary/20 font-bold uppercase tracking-widest">
                    {comment.date}
                  </span>
                </div>
                <p className="text-primary/60 leading-relaxed font-medium italic">
                  &quot;{comment.content}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add comment */}
        <div className="mt-20 p-12 bg-white rounded-[3rem] border border-primary/5 shadow-luxury-lg">
          <h4 className="font-black text-primary uppercase tracking-widest mb-8">
            Viết nên suy nghĩ của bạn
          </h4>

          <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Chia sẻ cảm nhận về hành trình này..."
            className="w-full min-h-[160px] rounded-3xl bg-[#FAF9F6] border border-primary/5 p-8 text-sm font-medium text-primary outline-none focus:border-cta/20 focus:bg-white transition-all resize-none"
          />

          <button
            onClick={handleAddComment}
            className="luxury-btn-primary mt-8 py-5 px-10 text-[10px] font-black tracking-widest"
          >
            GỬI BÌNH LUẬN
          </button>
        </div>
      </section>
    </main>
  );
}

