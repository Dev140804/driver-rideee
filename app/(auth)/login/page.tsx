'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, useUser } from '@clerk/nextjs';

export default function DriverLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/welcome');
    }
  }, [isSignedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const localUsers = JSON.parse(localStorage.getItem('driver-users') || '[]');
    const matchedUser = localUsers.find(
      (user: any) =>
        user.username === form.username && user.password === form.password
    );

    const isDemo = form.username === 'driver' && form.password === '1234';

    if (isDemo || matchedUser) {
      const demoUser = isDemo
        ? {
            name: 'Demo Driver',
            email: 'driver@example.com',
            phone: '9876543210',
            image: '',
          }
        : matchedUser;

      localStorage.setItem('driver-user', JSON.stringify(demoUser));
      alert('Login successful!');
      setTimeout(() => {
        router.push('/welcome');
      }, 300);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Driver Sign In</h2>

        <div className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>

          <SignInButton mode="modal" redirectUrl="/welcome" asChild>
            <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign In with Google
            </button>
          </SignInButton>

          <p className="text-sm text-center mt-4 text-gray-400">
            Don&rsquo;t have an account?{' '}
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