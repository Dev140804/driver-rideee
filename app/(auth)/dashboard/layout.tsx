'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Home, Car, DollarSign, Info } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard/home', icon: <Home size={20} /> },
  { name: 'Rides', href: '/dashboard/rides', icon: <Car size={20} /> },
  { name: 'Earnings', href: '/dashboard/earnings', icon: <DollarSign size={20} /> },
  { name: 'About', href: '/dashboard/about', icon: <Info size={20} /> },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-sm ${
                pathname === item.href ? 'text-white' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}