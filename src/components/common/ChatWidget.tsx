'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { socketService } from '@/services/socket.service';

const ChatWidget = () => {
  const { user, isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // For simplicity, we assume there's an admin receiver
  // In a real app, you might fetch an admin ID or the backend routes it.
  // Here we'll try to find an admin or send with receiverId: null for "System/Admin"
  const adminId = "admin-placeholder"; // Backend should handle null as Admin

  useEffect(() => {
    if (isLoggedIn && user) {
      console.log('ChatWidget: Connecting socket for user', user.id);
      socketService.connect(user.id);
      socketService.onReceiveMessage((msg) => {
        console.log('ChatWidget: Received message via socket', msg);
        setMessages((prev) => {
          // 1. If ID already exists, don't add
          if (prev.find(m => m.id === msg.id)) return prev;

          // 2. If it's from the current user, try to replace an optimistic (temp) message
          if (msg.senderId === user?.id) {
            const tempIndex = prev.findIndex(m => m.isTemp && m.content === msg.content);
            if (tempIndex !== -1) {
              const newMessages = [...prev];
              newMessages[tempIndex] = msg; // Replace temp with real one
              return newMessages;
            }
          }
          
          return [...prev, msg];
        });
      });
    }

    if (isOpen && isLoggedIn) {
      fetchMessages();
    }

    return () => {
      socketService.offReceiveMessage();
    };
  }, [isOpen, isLoggedIn, user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // For user, they chat with "Admin" (null or specific ID)
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
      console.log('ChatWidget: Sending message to', adminId, 'content:', content);
      socketService.sendMessage({ receiverId: adminId, content });
      
      // Optimistic update so the user at least sees their own message immediately
      const tempMsg = {
        id: Date.now(),
        senderId: user?.id,
        content: content,
        createdAt: new Date().toISOString(),
        isTemp: true
      };
      setMessages(prev => [...prev, tempMsg]);
    } catch (error) {
      console.error('ChatWidget: Error sending message:', error);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-primary rotate-90' : 'bg-cta text-white'
        }`}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">A</div>
              <div>
                <h3 className="font-semibold text-white">GoRide Support</h3>
                <p className="text-xs text-white/70">Thường phản hồi ngay lập tức</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {loading && messages.length === 0 ? (
              <div className="flex justify-center p-10">
                <div className="w-6 h-6 border-2 border-cta border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.senderId === user?.id
                        ? 'bg-cta text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                    <div className={`text-[10px] mt-1 opacity-60 text-right ${msg.senderId === user?.id ? 'text-white' : 'text-gray-500'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {messages.length === 0 && !loading && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm italic">Chào {user?.name}! Hãy để lại lời nhắn cho chúng tôi.</p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cta"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 bg-cta text-white rounded-full flex items-center justify-center hover:bg-cta-hover transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
