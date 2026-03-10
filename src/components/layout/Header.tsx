'use client';

import Link from 'next/link';
import { Menu, MapPin, Gift, BookOpen, UserCircle, X, CarFront, Bell, ClipboardList, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { name: 'Xe Máy', href: '/cars', icon: CarFront },
  { name: 'Địa Điểm', href: '/locations', icon: MapPin },
  { name: 'Tin Tức', href: '/blog', icon: BookOpen },
  { name: 'Ưu Đãi', href: '/promotions', icon: Gift },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Khuyến mãi mới', desc: 'Giảm 20% cho dòng xe Honda SH trong tuần này!', time: '5 phút trước', unread: true },
  { id: 2, title: 'Xác nhận đặt xe', desc: 'Yêu cầu đặt xe SH 150i của bạn đã được duyệt.', time: '2 giờ trước', unread: false },
  { id: 3, title: 'Elite Welcome', desc: 'Chào mừng bạn đến với cộng đồng GoRide Elite.', time: '1 ngày trước', unread: false },
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
          <div className="flex h-10 w-10 items-center justify-center rounded-luxury bg-[#1C1917] text-[#CA8A04] shadow-soft-md transition-all duration-300 group-hover:bg-[#CA8A04] group-hover:text-white group-hover:scale-110">
            <CarFront size={20} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-heading font-black tracking-tight text-[#1C1917]">
            GoRide <span className="text-[#CA8A04] italic">Quy Nhơn</span>
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
              {/* Rental Icon */}
              <Link
                href="/my-rentals"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface text-primary/60 hover:text-cta hover:bg-surface-dark transition-all"
                title="Xe đã thuê"
              >
                <ClipboardList size={20} />
              </Link>

              {/* Notification Icon */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotificationOpen(!isNotificationOpen);
                  }}
                  className={cn(
                    "relative h-10 w-10 flex items-center justify-center rounded-xl transition-all",
                    isNotificationOpen 
                      ? "bg-primary text-white shadow-luxury-sm" 
                      : "bg-surface text-primary/60 hover:text-cta hover:bg-surface-dark"
                  )}
                  title="Thông báo"
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cta ring-2 ring-white" />
                </button>

                {/* Dropdown UI */}
                {isNotificationOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-4 w-80 md:w-96 glass-card bg-white/95 backdrop-blur-xl border-primary/5 shadow-luxury-2xl rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50"
                  >
                    <div className="p-6 border-b border-primary/5 flex justify-between items-center bg-primary/5">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">Thông báo</h3>
                      <span className="text-[10px] font-bold text-cta bg-cta/10 px-3 py-1 rounded-full uppercase">3 Mới</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={cn(
                            "p-5 border-b border-primary/5 hover:bg-surface transition-colors cursor-pointer group",
                            notif.unread && "bg-cta/[0.02]"
                          )}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="text-xs font-black text-primary group-hover:text-cta transition-colors uppercase tracking-wider">{notif.title}</h4>
                             <span className="text-[9px] font-bold text-primary/20 italic">{notif.time}</span>
                          </div>
                          <p className="text-[11px] font-medium text-primary/40 leading-relaxed">{notif.desc}</p>
                          {notif.unread && (
                            <div className="mt-3 flex items-center gap-2">
                               <div className="h-1.5 w-1.5 rounded-full bg-cta" />
                               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cta">Chưa đọc</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 hover:text-cta hover:bg-primary/5 transition-all">
                      Xem tất cả hành trình
                    </button>
                  </div>
                )}
              </div>

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
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/30 leading-none mb-1">Elite Member</p>
                    <p className="text-sm font-bold text-primary leading-none">{user?.name}</p>
                  </div>
                </button>

                {/* Account Dropdown UI */}
                {isAccountOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-4 w-72 glass-card bg-white/95 backdrop-blur-xl border-primary/5 shadow-luxury-2xl rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50"
                  >
                    <div className="p-8 pb-6 border-b border-primary/5 bg-primary/5 text-center">
                       <div className="h-20 w-20 rounded-[2rem] overflow-hidden border-4 border-white shadow-luxury-lg mx-auto mb-4">
                          <img src={user?.avatarUrl || 'https://i.pravatar.cc/100?img=12'} alt="User Large" className="h-full w-full object-cover" />
                       </div>
                       <h3 className="text-lg font-black text-primary uppercase tracking-tight">{user?.name}</h3>
                       <p className="text-[10px] font-black text-cta uppercase tracking-[0.3em] mt-1 italic">Elite Concierge User</p>
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
                    </div>

                    <div className="p-3 pt-0">
                       <button 
                        onClick={() => logout()}
                        className="w-full py-3.5 rounded-[1.25rem] bg-red-50 text-red-500 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all duration-300"
                       >
                         Đăng xuất hệ thống
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary hover:bg-surface rounded-luxury transition-all active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden transition-all duration-300 p-6 pt-24",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 text-xl font-semibold text-primary border-b border-primary/10 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon size={24} className="text-cta" />
              {item.name}
            </Link>
          ))}
          <div className="grid grid-cols-1 gap-4 mt-6">
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/login" 
                  className="luxury-btn-outline text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng Nhập
                </Link>
                <Link 
                  href="/register" 
                  className="luxury-btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng Ký
                </Link>
              </>
            ) : (
              <button 
                className="luxury-btn-outline py-4 text-center border-red-100 text-red-500 hover:bg-red-50"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Đăng Xuất
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
