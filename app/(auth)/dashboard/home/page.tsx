'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export default function DriverHome() {
  const { data: session } = useSession();

  const [user, setUser] = useState<{ name?: string; email?: string; phone?: string } | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user) {
      // Case: Google login
      setUser({
        name: session.user.name || 'Google User',
        email: session.user.email || '',
        phone: '', // optionally load with People API if enabled
      });
    } else {
      // Case: demo login or manual signup
      const localUser = localStorage.getItem('driver-user');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, [session]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => console.error('Geolocation error:', err)
    );
  }, []);

  useEffect(() => {
    if (location && window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        disableDefaultUI: true,
      });

      new window.google.maps.Marker({
        position: location,
        map,
        title: 'Your Location',
      });
    }
  }, [location]);

  if (!user) return <div className="text-white p-6 text-center">You are not logged in.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Welcome, {user.name?.split(' ')[0] || 'Driver'} 👋
        </h1>

        <div className="bg-gray-800 rounded-2xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-3">📍 Your Current Location</h2>
          <div
            ref={mapRef}
            className="w-full h-[400px] rounded-lg border border-gray-700 shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}