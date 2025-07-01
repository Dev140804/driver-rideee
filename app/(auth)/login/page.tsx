'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function DriverLogin() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('driver-user') || '{}');

    if (form.username === user.username && form.password === user.password) {
      alert('Login successful!');
      router.push('/welcome');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Driver Sign In</h2>

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

          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign In with Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-400">
            Don't have an account?{' '}
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