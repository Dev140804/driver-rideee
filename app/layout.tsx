import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Driver App",
  description: "Driver-side ride sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDck4v-JXt6PRQUOwFs7i3e-i_26HXbpkw`}
            async
            defer
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-black text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}