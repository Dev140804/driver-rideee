'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from 'next/image';

export default function AboutPage() {
  const { user: clerkUser } = useUser();
  const router = useRouter();

  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    if (clerkUser) {
      setUser({
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress,
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || '',
        image: clerkUser.imageUrl,
      });
    } else {
      const localUser = localStorage.getItem('driver-user');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, [clerkUser]);

  const handleLocalLogout = () => {
    localStorage.removeItem('driver-user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full border-2 border-indigo-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold border-2 border-indigo-500">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold">{user.name || 'Driver'}</h2>
            <p className="text-sm text-gray-400">{user.email || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold text-gray-300">Full Name:</span>{' '}
            {user.name || 'N/A'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Email:</span>{' '}
            {user.email || 'N/A'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Phone:</span>{' '}
            {user.phone || 'Not available'}
          </p>
        </div>

        {clerkUser ? (
          <SignOutButton>
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition">
              Logout
            </button>
          </SignOutButton>
        ) : (
          <button
            onClick={handleLocalLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}