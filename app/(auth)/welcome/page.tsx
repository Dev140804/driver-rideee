'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/dashboard/home');
    }, 2000); // 2 second animation delay

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl animate-pulse">Welcome, logging you in...</h1>
    </div>
  );
}