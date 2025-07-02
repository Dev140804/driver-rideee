'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';

export default function DriverHome() {
  const { user: clerkUser } = useUser();

  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  } | null>(null);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clerkUser) {
      // Case: Signed in via Clerk (Google or Clerk UI)
      setUser({
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || '',
      });
    } else {
      // Case: demo login or manual signup (localStorage)
      const localUser = localStorage.getItem('driver-user');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, [clerkUser]);

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

  if (!user) {
    return <div className="text-white p-6 text-center">You are not logged in.</div>;
  }

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

        <div className="bg-gray-800 rounded-2xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">👤 Your Details</h2>
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}