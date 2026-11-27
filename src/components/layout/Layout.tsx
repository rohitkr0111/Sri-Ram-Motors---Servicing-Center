import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0D0F] text-white selection:bg-[#FF6B24] selection:text-white">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
