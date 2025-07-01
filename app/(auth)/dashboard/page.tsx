'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const sessionUser = localStorage.getItem('driver-session');
    if (sessionUser) {
      setUsername(sessionUser);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-900 text-white">
      <h1 className="text-4xl font-bold">Welcome, {username || 'Driver'}!</h1>
    </div>
  );
}