'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    } else if (status === "authenticated") {
      setTimeout(() => {
        router.push('/dashboard/home');
      }, 2500); // Delay to show welcome animation
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-2">Welcome,</h1>
        <h2 className="text-3xl font-semibold text-blue-400">
          {session?.user?.name || 'Driver'}
        </h2>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}