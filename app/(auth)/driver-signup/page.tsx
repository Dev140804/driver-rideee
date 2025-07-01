'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function DriverSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.phone || !form.username || !form.password) {
      alert('Please fill all fields');
      return;
    }

    localStorage.setItem('driver-user', JSON.stringify(form));
    alert('Signup successful! Please login.');
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Driver Sign Up</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (Gmail)"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
            onClick={handleSignup}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>

          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Sign Up with Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-400">
            Already have an account?{' '}
            <span
              onClick={() => router.push('/login')}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}