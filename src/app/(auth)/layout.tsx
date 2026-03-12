'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, loading, router]);

  if (loading || isLoggedIn) return null;

  return (
    <div className="auth-root-container">
      {children}
    </div>
  );
}
