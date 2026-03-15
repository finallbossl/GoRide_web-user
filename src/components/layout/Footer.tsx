'use client';

import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, Mail, MapPin, Phone, ArrowUpRight, CarFront } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-[#fffaf2] pb-8 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f6e8c6]/50 to-transparent" />
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-luxury bg-primary text-accent shadow-soft-md transition-all duration-300 group-hover:scale-105 group-hover:bg-cta group-hover:text-white">
                <CarFront size={24} strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-heading font-bold tracking-tight text-primary">
                GoRide
              </span>
            </Link>
            <p className="max-w-xl text-base font-medium leading-relaxed text-rich-text/65">
              Nền tảng cho thuê xe máy hàng đầu Việt Nam. Mang đến sự tự do, phong cách và những hành trình không giới hạn.
            </p>
            <div className="mt-8 flex gap-3">
              {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-luxury border border-primary/10 bg-white text-rich-text/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-cta hover:bg-surface hover:text-cta"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary whitespace-nowrap">Dịch vụ</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-rich-text/60">
              {[
                { name: 'Danh sách xe', href: '/motorbike' },
                { name: 'Điểm nhận xe', href: '/locations' },
                { name: 'Ưu đãi', href: '/promotions' },
                { name: 'Chính sách', href: '/tos' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-1 whitespace-nowrap transition-colors hover:text-cta">
                    {link.name}
                    <ArrowUpRight size={12} className="translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4 lg:ml-auto">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary whitespace-nowrap">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-luxury bg-surface text-cta flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <span className="text-sm font-medium leading-relaxed text-rich-text/60 mt-0.5">
                  123 Đường Xuân Diệu, Phường Hải Cảng, <br />TP. Quy Nhơn, Bình Định
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-luxury bg-surface text-cta flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <span className="text-base font-semibold text-primary whitespace-nowrap">0987.654.321</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-luxury bg-surface text-cta flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-medium text-rich-text/60 whitespace-nowrap">contact@goride.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-6 md:flex-row">
          <p className="text-sm font-medium text-rich-text/40">
            &copy; {new Date().getFullYear()} GoRide. Crafted for the free-spirited traveler.
          </p>
          <div className="flex gap-6 text-xs font-medium text-rich-text/40">
            <a href="#" className="hover:text-cta transition-colors whitespace-nowrap">Bảo mật</a>
            <a href="#" className="hover:text-cta transition-colors whitespace-nowrap">Điều khoản</a>
            <a href="#" className="hover:text-cta transition-colors whitespace-nowrap">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
