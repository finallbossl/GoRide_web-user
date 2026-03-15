'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#f5dca8_0%,_transparent_40%),#fffdf8] px-6 py-24">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-primary/10 bg-white shadow-luxury-xl md:grid-cols-2">

        {/* Left – Visual */}
        <div className="relative hidden flex-col justify-between bg-primary p-14 text-white md:flex">
          <div className="absolute -right-16 top-6 h-48 w-48 rounded-full bg-cta/20 blur-3xl" />
          <div>
            <Link href="/" className="text-2xl font-black tracking-wide">
              GoRide <span className="text-cta">Elite</span>
            </Link>

            <h2 className="mt-16 font-heading text-5xl font-bold leading-tight">
              Tiếp tục <br /> hành trình của bạn
            </h2>

            <p className="mt-5 max-w-sm text-base text-white/70">
              Đăng nhập để trải nghiệm những cung đường đẳng cấp.
            </p>

            <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-white/70">Truy cập nhanh</p>
              <p className="text-sm text-white/90">Quản lý đơn thuê, lưu điểm nhận xe yêu thích và nhận ưu đãi cá nhân.</p>
            </div>
          </div>

          <p className="text-sm text-white/40 italic">
            © 2026 GoRide Elite
          </p>
        </div>

        {/* Right – Form */}
        <div className="p-10 md:p-14">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-[#fffaf2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70">
            <Sparkles size={12} className="text-cta" />
            Bảo mật chuẩn premium
          </div>

          <h1 className="mb-2 font-heading text-4xl font-bold text-primary md:text-[2.6rem]">
            Chào mừng trở lại
          </h1>
          <p className="mb-8 text-primary/60">
            Đăng nhập để tiếp tục
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="ui-label">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ui-input h-13 pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="ui-label">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ui-input h-13 pl-12"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={isLoading}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white transition hover:bg-cta disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Đăng nhập <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-primary/50">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-cta font-semibold">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
