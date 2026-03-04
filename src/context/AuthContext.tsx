'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';
import { LoginDto, RegisterDto, User } from '@goride/shared';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await authApi.getProfile();
          if (response.success && response.data) {
            setIsLoggedIn(true);
            setUser(response.data);
          } else {
            // Token might be invalid or expired
            logout();
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: LoginDto) => {
    try {
      console.log('Login attempt for:', data.email);
      const response = await authApi.login(data);
      console.log('Login response received:', response);
      
      if (response.success && response.data) {
        console.log('Saving tokens to localStorage...');
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        setIsLoggedIn(true);
        setUser(response.data.user);
        console.log('Login state updated successfully');
      } else {
        console.warn('Login response unsuccessful:', response);
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await authApi.register(data);
      if (!response.success) {
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
