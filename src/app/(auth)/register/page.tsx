'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_bottom_left,_#f3d6a4_0%,_transparent_45%),#fffdf8] px-6 py-20">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-primary/10 bg-white shadow-luxury-xl md:grid-cols-2">

        {/* Left – Visual & Benefits */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-14 text-white md:flex">
          <div className="relative z-10">
            <Link href="/" className="text-2xl font-black tracking-wide">
              GoRide <span className="text-cta">Elite</span>
            </Link>

            <h2 className="mt-16 font-heading text-5xl font-bold leading-tight">
              Gia nhập <br /> cộng đồng Elite
            </h2>

            <div className="mt-10 space-y-5">
              {[
                "Giảm 30% cho lần thuê đầu tiên",
                "Tiếp cận đội xe mới nhất",
                "Hỗ trợ ưu tiên 24/7",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-white/70">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cta/20 text-cta">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/40 italic">
            © 2026 GoRide Elite
          </p>

          {/* Decorative element */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cta/5 blur-[80px] rounded-full" />
        </div>

        {/* Right – Form */}
        <div className="p-10 md:p-14">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-[#fffaf2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70">
            <Sparkles size={12} className="text-cta" />
            Tài khoản mới trong 1 phút
          </div>
          <h1 className="mb-2 font-heading text-4xl font-bold text-primary md:text-[2.5rem]">
            Tạo tài khoản mới
          </h1>
          <p className="mb-8 text-primary/60">
            Bắt đầu hành trình của bạn ngay hôm nay
          </p>

          <form className="space-y-5" onSubmit={handleRegister}>
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Đăng ký thành công!</h3>
                <p className="text-primary/50">Đang chuyển hướng đến trang đăng nhập...</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="ui-label">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                    <input
                      type="text"
                      placeholder="Họ và tên của bạn"
                      className="ui-input h-13 pl-12"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="ui-label">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                    <input
                      type="email"
                      placeholder="email@vidu.com"
                      className="ui-input h-13 pl-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      placeholder="••••••••"
                      className="ui-input h-13 pl-12"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-medium text-primary/40">
                    Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số.
                  </p>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-primary/10 text-cta focus:ring-cta/30" required />
                    <span className="text-xs text-primary/50 group-hover:text-primary transition-colors">
                      Tôi đồng ý với <a href="#" className="text-cta font-semibold">Điều khoản & Chính sách</a>
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  disabled={isLoading}
                  className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white shadow-lg transition hover:bg-cta disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Đăng ký ngay <ArrowRight size={18} /></>
                  )}
                </button>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-primary/50">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-cta font-semibold">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
