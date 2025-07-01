'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem',
  overflow: 'hidden',
};

export default function DriverHome() {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  if (status === 'loading' || !isLoaded) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="text-white p-6">You are not logged in.</div>;
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Welcome, {user?.name?.split(' ')[0] || 'Driver'} 👋
        </h1>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold">📍 Your Current Location</h2>

          {location ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={15}
            >
              <Marker position={location} />
            </GoogleMap>
          ) : (
            <p className="text-red-400">Unable to access your location.</p>
          )}
        </div>
      </div>
    </div>
  );
}