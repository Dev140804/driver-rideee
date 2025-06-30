'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login'); // ✅ updated path
  }, [router]);

  return null; // just redirect silently
}