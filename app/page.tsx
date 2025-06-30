'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/driver-login'); // ✅ Must match your route exactly
  }, [router]);

  return null;
}