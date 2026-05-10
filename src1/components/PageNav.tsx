import React from 'react';
import { Link } from 'react-router-dom';

interface PageNavProps {
  subtitle?: string;
}

export const PageNav: React.FC<PageNavProps> = ({ subtitle }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-[#F5C6D0]/40 sticky top-0 z-40 w-full">
      <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B76E79] -mt-0.5 font-medium italic">For Her · By Her · With Her</span>
          </Link>
          {subtitle && <span className="text-sm font-medium text-[#8B5E6B] md:block hidden italic">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:block text-[#4A2C3D] hover:text-[#B76E79] font-medium text-sm transition-colors">Home</Link>
          <Link to="/categories" className="hidden md:block text-[#4A2C3D] hover:text-[#B76E79] font-medium text-sm transition-colors">Categories</Link>
        </div>
      </div>
    </nav>
  );
};
