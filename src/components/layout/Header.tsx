'use client';

import Link from 'next/link';
import { MapPin, Gift, BookOpen, UserCircle, CarFront, ClipboardList, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { name: 'Xe Máy', href: '/motorbike', icon: CarFront },
  { name: 'Địa Điểm', href: '/locations', icon: MapPin },
  { name: 'Tin Tức', href: '/blog', icon: BookOpen },
  { name: 'Ưu Đãi', href: '/promotions', icon: Gift },
];


export default function Header() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    if (!isAccountOpen) return;
    const handleClick = () => {
      setIsAccountOpen(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isAccountOpen]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 ease-out sm:px-6",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 md:px-6",
          scrolled
            ? "border-primary/10 bg-white/95 shadow-soft-lg backdrop-blur-xl"
            : "border-white/35 bg-white/80 shadow-soft-md backdrop-blur-sm"
        )}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-accent shadow-soft-md transition-all duration-300 group-hover:scale-105 group-hover:bg-cta group-hover:text-white">
            <CarFront size={20} strokeWidth={2} />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-primary">
            GoRide
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-rich-text/65 transition-colors duration-200 hover:text-primary"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-cta transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="group hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rich-text/70 transition hover:bg-white hover:text-primary sm:flex"
              >
                <UserCircle size={18} className="transition-colors group-hover:text-cta" />
                Đăng Nhập
              </Link>

              <Link
                href="/register"
                className="luxury-btn-dark hidden sm:flex"
              >
                Đăng Ký
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-3 md:gap-5">
              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAccountOpen(!isAccountOpen);
                  }}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-all",
                    isAccountOpen ? "border-primary/10 bg-white" : "opacity-85 hover:border-primary/10 hover:bg-white hover:opacity-100"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 overflow-hidden rounded-full border-2 shadow-soft-md transition-all",
                    isAccountOpen ? "border-cta ring-4 ring-cta/10" : "border-white group-hover:border-cta"
                  )}>
                    <img src={user?.avatarUrl || 'https://i.pravatar.cc/100?img=12'} alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="mb-1 text-[10px] font-bold uppercase leading-none tracking-widest text-primary/30">Thành viên</p>
                    <p className="text-sm font-bold text-primary leading-none">{user?.name}</p>
                  </div>
                </button>

                {/* Account Dropdown UI */}
                {isAccountOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 z-50 mt-4 w-72 overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white/95 shadow-luxury-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300"
                  >
                    <div className="border-b border-slate-100 bg-slate-50/80 p-8 pb-6 text-center">
                      <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white shadow-soft-lg">
                        <img src={user?.avatarUrl || 'https://i.pravatar.cc/100?img=12'} alt="User Large" className="h-full w-full object-cover" />
                      </div>
                      <h3 className="text-lg font-bold text-primary uppercase tracking-tight">{user?.name}</h3>
                      <p className="text-[10px] font-bold text-cta uppercase tracking-[0.3em] mt-1 italic">Premium User</p>
                    </div>

                    <div className="p-3 space-y-1">
                      <Link
                        href="/"
                        onClick={() => setIsAccountOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60 transition-all group-hover:bg-white/20 group-hover:text-white">
                          <LayoutDashboard size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Trang chủ</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsAccountOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60 transition-all group-hover:bg-white/20 group-hover:text-white">
                          <UserCircle size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Trang cá nhân</span>
                      </Link>
                      <Link
                        href="/my-rentals"
                        onClick={() => setIsAccountOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary/60 transition-all group-hover:bg-white/20 group-hover:text-white">
                          <ClipboardList size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Xe đã thuê</span>
                      </Link>
                    </div>

                    <div className="p-3 pt-0">
                      <button
                        onClick={() => logout()}
                        className="w-full rounded-2xl bg-red-50 py-3.5 text-[10px] font-bold uppercase tracking-widest text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
