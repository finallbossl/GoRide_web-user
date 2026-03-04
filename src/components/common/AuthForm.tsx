'use client';

import React from 'react';
import { Mail, Lock, Chrome, Apple, Twitter, ArrowRight } from 'lucide-react';

const AuthForm = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md rounded-[2.5rem] bg-white p-10 shadow-2xl shadow-primary/5 border border-border/50">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-black text-primary">Đăng Nhập</h1>
          <p className="mt-2 text-sm font-medium text-primary/40">Chào mừng bạn trở lại với GoRide</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-cta transition-colors" size={20} />
              <input 
                type="email" 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-surface border border-transparent outline-none transition-all focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 font-bold text-primary"
                placeholder="name@example.com"
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Mật khẩu</label>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-cta hover:text-cta-hover transition-colors">Quên?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-cta transition-colors" size={20} />
              <input 
                type="password" 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-surface border border-transparent outline-none transition-all focus:bg-white focus:border-cta focus:ring-4 focus:ring-cta/5 font-bold text-primary"
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full h-14 rounded-2xl bg-cta text-white font-black uppercase tracking-widest shadow-xl shadow-cta/20 transition-all hover:bg-cta-hover hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Đăng Nhập
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-primary/20">Hoặc đăng nhập với</span></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button className="h-14 rounded-2xl bg-surface flex items-center justify-center text-primary/60 hover:bg-white hover:border-border border border-transparent transition-all active:scale-95">
            <Chrome size={20} />
          </button>
          <button className="h-14 rounded-2xl bg-surface flex items-center justify-center text-primary/60 hover:bg-white hover:border-border border border-transparent transition-all active:scale-95">
            <Apple size={20} />
          </button>
          <button className="h-14 rounded-2xl bg-surface flex items-center justify-center text-primary/60 hover:bg-white hover:border-border border border-transparent transition-all active:scale-95">
            <Twitter size={20} />
          </button>
        </div>

        <div className="mt-10 text-center text-[10px] font-black uppercase tracking-widest">
          <a href="#" className="text-primary/20 hover:text-cta transition-colors">Điều khoản & Chính sách</a>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
