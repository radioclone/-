import React from 'react';
import { Header } from './Header.js';
import { Sidebar } from './Sidebar.js';
import { Footer } from './Footer.js';
import { Notification } from './Notification.js';
import { useVorteX } from '../providers/VorteXProvider.js';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useVorteX();

  if (!state.isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Initializing VorteX...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  );
}
