'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

// Type for driver user
type DriverUser = {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

export default function DriverSignup() {
  const [form, setForm] = useState<DriverUser>({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const { name, email, phone, username, password } = form;

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = 'Email must be a valid @gmail.com address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    const existingUsers = JSON.parse(localStorage.getItem('driver-users') || '[]');
    const usernameExists = (existingUsers as DriverUser[]).some((user) => user.username === username);
    if (usernameExists) {
      newErrors.username = 'Username already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    const existingUsers = JSON.parse(localStorage.getItem('driver-users') || '[]');
    const updatedUsers = [...existingUsers, form];
    localStorage.setItem('driver-users', JSON.stringify(updatedUsers));
    localStorage.setItem('driver-user', JSON.stringify(form));
    alert('Signup successful! Redirecting...');
    router.push('/welcome');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Driver Sign Up</h2>

        <div className="space-y-4">
          {['name', 'email', 'phone', 'username', 'password'].map((field) => (
            <div key={field}>
              <input
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                placeholder={
                  field === 'phone'
                    ? 'Phone Number (10 digits)'
                    : field === 'email'
                    ? 'Email (e.g., name@gmail.com)'
                    : field === 'password'
                    ? 'Password (min 8 characters)'
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

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
            <Image src="/google.svg" alt="Google" width={20} height={20} />
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