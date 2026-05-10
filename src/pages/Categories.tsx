import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Pakistani Suits', slug: 'pakistani-suits', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=700&fit=crop', desc: 'Elegant Pakistani-style suits featuring intricate embroidery, rich fabrics, and timeless silhouettes perfect for every occasion.' },
  { name: 'Daily Wear', slug: 'daily-wear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop', desc: 'Comfortable yet stylish everyday kurtas and suits that keep you looking effortlessly chic.' },
  { name: 'Cotton Collection', slug: 'cotton', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=700&fit=crop', desc: 'Breathable pure cotton ethnic wear ideal for summer and daily comfort with traditional charm.' },
  { name: 'Anarkali', slug: 'anarkali', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=700&fit=crop', desc: 'Timeless Anarkali suits with flowing silhouettes, perfect for weddings, festivals, and celebrations.' },
];

const Categories: React.FC = () => {
  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#F5C6D0]/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B76E79] -mt-0.5 font-medium italic">For Her · By Her · With Her</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium transition-colors text-sm">Home</Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#FFF8F5]">
        <div className="bg-gradient-to-br from-[#FFF0F3] via-[#FFF8F5] to-[#FFF0E8] py-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B76E79] font-bold mb-3">Browse Our Collections</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A2C3D] mb-4">Shop by Category</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/category/${cat.slug}`}
                key={cat.slug}
                className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#F5C6D0]/20"
              >
                <div className="md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-serif text-[#4A2C3D] mb-3 group-hover:text-[#B76E79] transition-colors">{cat.name}</h2>
                  <p className="text-sm text-[#8B5E6B] leading-relaxed mb-6">{cat.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-[#B76E79] group-hover:gap-3 gap-1 transition-all">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Categories;
