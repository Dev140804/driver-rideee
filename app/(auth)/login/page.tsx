'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';

type DriverUser = {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

export default function DriverLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('driver-users') || '[]') as DriverUser[];
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (matchedUser) {
      localStorage.setItem('driver-user', JSON.stringify(matchedUser));
      router.push('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Driver Login</h2>

        <div className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
          >
            Log In
          </button>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>

          {/* ✅ Clerk Google Sign-In without `asChild` */}
          <SignInButton mode="modal">
            <div className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Sign In with Google
            </div>
          </SignInButton>

          <p className="text-sm text-center mt-4 text-gray-400">
            Don’t have an account?{' '}
            <span
              onClick={() => router.push('/driver-signup')}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
