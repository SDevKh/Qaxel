import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CATEGORY_INFO: Record<string, { name: string; desc: string }> = {
  'pakistani-suits': { name: 'Pakistani Suits', desc: 'Discover our exquisite collection of Pakistani-style suits featuring intricate embroidery and rich fabrics.' },
  'daily-wear': { name: 'Daily Wear', desc: 'Comfortable and stylish everyday kurtas and suits for the modern woman.' },
  'cotton': { name: 'Cotton Collection', desc: 'Breathable pure cotton ethnic wear ideal for every season.' },
  'anarkali': { name: 'Anarkali', desc: 'Timeless Anarkali suits with flowing silhouettes for festive occasions.' },
};

const CategoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const info = CATEGORY_INFO[slug || ''] || { name: 'Category', desc: '' };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#F5C6D0]/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B76E79] -mt-0.5 font-medium italic">For Her · By Her · With Her</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium text-sm">Home</Link>
            <Link to="/categories" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium text-sm">Categories</Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#FFF8F5]">
        <div className="bg-gradient-to-br from-[#FFF0F3] to-[#FFF0E8] py-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B76E79] font-bold mb-3">Collection</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A2C3D] mb-4">{info.name}</h1>
          <p className="text-[#8B5E6B] max-w-lg mx-auto">{info.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full mx-auto mt-6"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-md p-12 border border-[#F5C6D0]/20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F5C6D0] to-[#D4A574] flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-serif text-[#4A2C3D] mb-4">Coming Soon</h3>
            <p className="text-[#8B5E6B] mb-8 max-w-md mx-auto">We're curating the finest pieces for the {info.name} collection. Stay tuned for stunning designs crafted just for you.</p>
            <Link to="/" className="inline-block bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoryDetail;
