'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Star, Loader2, AlertCircle } from 'lucide-react';
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
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* Left – Visual */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-primary text-white">
          <div>
            <Link href="/" className="text-2xl font-black tracking-wide">
              GoRide <span className="text-cta">Elite</span>
            </Link>

            <h2 className="mt-20 text-4xl font-bold leading-tight">
              Tiếp tục <br /> hành trình của bạn
            </h2>

            <p className="mt-6 text-white/60 text-lg">
              Đăng nhập để trải nghiệm những cung đường đẳng cấp.
            </p>
          </div>

          <p className="text-sm text-white/40 italic">
            © 2026 GoRide Elite
          </p>
        </div>

        {/* Right – Form */}
        <div className="p-12 md:p-16">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Chào mừng trở lại
          </h1>
          <p className="text-primary/50 mb-10">
            Đăng nhập để tiếp tục
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-12 rounded-xl border border-primary/10 focus:ring-2 focus:ring-cta/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-12 rounded-xl border border-primary/10 focus:ring-2 focus:ring-cta/30"
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
              className="w-full h-14 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-cta transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Đăng nhập <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-primary/50 text-center">
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
