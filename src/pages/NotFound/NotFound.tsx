import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ShoppingBag } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="bg-[#14171A] rounded-2xl border border-[#2C3238] p-12 max-w-md mx-auto space-y-4">
        <AlertTriangle className="w-16 h-16 text-[#FF6B24] mx-auto" />
        <h1 className="text-3xl font-bold font-heading text-white">404 - Page Not Found</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          The requested page does not exist or may have been moved.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B24] text-white text-xs font-semibold hover:bg-[#FF8C42]"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B1F23] border border-[#2C3238] text-gray-200 text-xs font-semibold hover:text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Catalogue</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
