'use client';

import Link from 'next/link';
import { Menu, MapPin, Gift, BookOpen, UserCircle, X, CarFront, Bell, ClipboardList, MessageSquare } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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
    if (!isNotificationOpen && !isAccountOpen) return;
    const handleClick = () => {
      setIsNotificationOpen(false);
      setIsAccountOpen(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isNotificationOpen, isAccountOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 sm:px-6",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex h-16 items-center justify-between px-6 rounded-luxury border transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-primary/10 shadow-soft-lg"
            : "bg-white/90 backdrop-blur-sm border-white/20"
        )}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-cta shadow-soft-md transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:scale-110">
            <CarFront size={20} strokeWidth={2} />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-primary">
            GoRide
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-rich-text/60 hover:text-primary transition-colors duration-200"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-cta transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-rich-text/60 hover:text-primary transition-colors group"
              >
                <UserCircle size={18} className="group-hover:text-cta transition-colors" />
                Đăng Nhập
              </Link>

              <Link
                href="/register"
                className="luxury-btn-primary py-2.5 px-6 text-sm hidden sm:flex"
              >
                Đăng Ký
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 md:gap-5 relative">
              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAccountOpen(!isAccountOpen);
                    setIsNotificationOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 pl-2 border-l border-primary/5 group transition-all",
                    isAccountOpen ? "opacity-100" : "opacity-80 hover:opacity-100"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-full overflow-hidden border-2 shadow-soft-md transition-all",
                    isAccountOpen ? "border-cta ring-4 ring-cta/10" : "border-white group-hover:border-cta"
                  )}>
                    <img src={user?.avatarUrl || 'https://i.pravatar.cc/100?img=12'} alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30 leading-none mb-1">Thành viên</p>
                    <p className="text-sm font-bold text-primary leading-none">{user?.name}</p>
                  </div>
                </button>

                {/* Account Dropdown UI */}
                {isAccountOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-4 w-72 glass-card bg-white/95 backdrop-blur-xl border-primary/5 shadow-luxury-2xl rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50"
                  >
                    <div className="p-8 pb-6 border-b border-slate-50 bg-slate-50/50 text-center">
                      <div className="h-20 w-20 rounded-2xl overflow-hidden border-4 border-white shadow-luxury-lg mx-auto mb-4">
                        <img src={user?.avatarUrl || 'https://i.pravatar.cc/100?img=12'} alt="User Large" className="h-full w-full object-cover" />
                      </div>
                      <h3 className="text-lg font-bold text-primary uppercase tracking-tight">{user?.name}</h3>
                      <p className="text-[10px] font-bold text-cta uppercase tracking-[0.3em] mt-1 italic">Premium User</p>
                    </div>

                    <div className="p-3 space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 rounded-[1.25rem] hover:bg-primary hover:text-white transition-all duration-300 group"
                      >
                        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary/5 text-primary/60 group-hover:text-white group-hover:bg-white/20 transition-all">
                          <UserCircle size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Trang cá nhân</span>
                      </Link>
                      <Link
                        href="/my-rentals"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 rounded-[1.25rem] hover:bg-primary hover:text-white transition-all duration-300 group"
                      >
                        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary/5 text-primary/60 group-hover:text-white group-hover:bg-white/20 transition-all">
                          <ClipboardList size={18} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Xe đã thuê</span>
                      </Link>
                    </div>

                    <div className="p-3 pt-0">
                      <button
                        onClick={() => logout()}
                        className="w-full py-3.5 rounded-[1.25rem] bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
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
