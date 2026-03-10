'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { MessageSquare, Send, ArrowLeft, Loader2, User } from 'lucide-react';
import Link from 'next/link';

export default function MessagesPage() {
  const { user, isLoggedIn } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // In this system, user chats with "Admin" (placeholder or null)
  const adminId = "admin-placeholder";

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.chat.getMessages(adminId);
      if (res.success) {
        setMessages(res.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const content = inputText;
    setInputText('');

    try {
      const res = await api.chat.sendMessage(adminId, content);
      if (res.success) {
        setMessages((prev) => [...prev, res.data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h2>
          <p className="text-gray-500 mb-6">Bạn cần đăng nhập để trò chuyện với bộ phận hỗ trợ.</p>
          <Link href="/login" className="luxury-btn-primary">Đăng nhập ngay</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-120px)]">
        <div className="bg-white rounded-[2rem] shadow-luxury-xl border border-primary/5 overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-primary text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors md:hidden">
                <ArrowLeft size={20} />
              </Link>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-cta text-white flex items-center justify-center text-xl font-black shadow-luxury-sm">
                  G
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-4 border-primary rounded-full"></div>
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">GoRide Concierge Support</h2>
                <p className="text-xs text-cta font-bold uppercase tracking-widest italic opacity-80">Hoạt động 24/7</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Hệ thống trực tuyến</span>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50/50"
          >
            {loading && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                <Loader2 size={40} className="animate-spin text-cta" />
                <p className="text-sm font-bold uppercase tracking-widest">Đang tải lịch sử trò chuyện...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-10">
                    <div className="px-4 py-1.5 bg-primary/5 rounded-full text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">
                        Hôm nay
                    </div>
                </div>
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.senderId === user?.id ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-4 md:p-5 rounded-[1.5rem] text-sm md:text-base leading-relaxed shadow-soft-md ${
                          msg.senderId === user?.id
                            ? 'bg-primary text-white rounded-br-none border border-white/10'
                            : 'bg-white text-primary border border-primary/5 rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest mt-2 text-primary/30">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.senderId === user?.id && <span className="ml-2 text-cta">● Đã gửi</span>}
                      </span>
                    </div>
                  </div>
                ))}
                
                {messages.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full gap-6 max-w-md mx-auto text-center">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-cta/10 flex items-center justify-center text-cta">
                        <MessageSquare size={40} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-primary uppercase mb-2">Xin chào {user?.name}!</h3>
                        <p className="text-sm text-primary/40 font-medium leading-relaxed">
                            Chào mừng bạn đến với GoRide Elite Concierge. Chúng tôi luôn sẵn sàng hỗ trợ bạn về đặt xe, thanh toán hoặc bất kỳ thắc mắc nào khác.
                        </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 bg-white border-t border-primary/5">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-4">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập lời nhắn của bạn cho đội ngũ GoRide..."
                  className="w-full pl-6 pr-16 py-4 bg-surface rounded-luxury-lg text-sm font-bold text-primary focus:outline-none focus:ring-4 focus:ring-cta/10 transition-all border border-transparent focus:border-cta/20"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-primary/10 bg-white px-1.5 font-sans text-[10px] font-black text-primary/20">
                        Enter
                    </kbd>
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="luxury-btn-primary h-14 w-14 sm:w-auto sm:px-8 rounded-luxury-lg flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale disabled:scale-100 disabled:pointer-events-none group"
              >
                <span className="hidden sm:inline">Gửi lời nhắn</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
