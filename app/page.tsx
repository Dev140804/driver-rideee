'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePageRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the login page
    router.replace('/driver-login');
  }, [router]);

  return null; // No UI, just redirect
}