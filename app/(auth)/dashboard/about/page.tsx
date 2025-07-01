'use client';

import { useSession, signOut } from "next-auth/react";

export default function AboutPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-white p-4">Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p className="text-white p-4">Not logged in.</p>;
  }

  const user = session?.user as {
    name?: string;
    email?: string;
    image?: string;
    phone?: string;
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white flex justify-center items-start pt-20 px-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Driver Profile</h1>

        <div className="space-y-3 text-sm">
          <p><span className="text-gray-400">👤 Name:</span> <span className="text-white">{user.name || "N/A"}</span></p>
          <p><span className="text-gray-400">📧 Email:</span> <span className="text-white">{user.email || "N/A"}</span></p>
          <p><span className="text-gray-400">📱 Phone:</span> <span className="text-white">{user.phone || "Not available"}</span></p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}