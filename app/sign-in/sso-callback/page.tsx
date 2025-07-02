'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard/home');
    }
  }, [isSignedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <p>Signing you in...</p>
    </div>
  );
}