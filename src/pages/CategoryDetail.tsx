import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../lib/products';
import { ProductCard } from '../components/ProductCard';
import { PageNav } from '../components/PageNav';

const CATEGORY_INFO: Record<string, { name: string; desc: string }> = {
  'pakistani-suits': { name: 'Pakistani Suits', desc: 'Discover our exquisite collection of Pakistani-style suits featuring intricate embroidery and rich fabrics.' },
  'pakistani-dresses': { name: 'Pakistani Dresses', desc: 'Explore our curated selection of Pakistani dresses including lawn, chiffon, formal and casual styles.' },
  'daily-wear': { name: 'Daily Wear', desc: 'Comfortable and stylish everyday kurtas and suits for the modern woman.' },
  'cotton': { name: 'Cotton Collection', desc: 'Breathable pure cotton ethnic wear ideal for every season.' },
  'anarkali': { name: 'Anarkali', desc: 'Timeless Anarkali suits with flowing silhouettes for festive occasions.' },
};

const CategoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const info = CATEGORY_INFO[slug || ''] || { name: 'Category', desc: '' };

  return (
    <>
      <PageNav subtitle={info.name} />

      <main className="min-h-screen bg-[#FFF8F5]">
        <div className="bg-gradient-to-br from-[#FFF0F3] to-[#FFF0E8] py-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B76E79] font-bold mb-3">Collection</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A2C3D] mb-4">{info.name}</h1>
          <p className="text-[#8B5E6B] max-w-lg mx-auto">{info.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full mx-auto mt-6"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-sm text-[#8B5E6B]">{info.desc}</p>
          </div>
          <CategoryProductsSection slug={slug || ''} />
        </div>
      </main>
    </>
  );
};

export default CategoryDetail;

const CategoryProductsSection: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const key = slug.toLowerCase();
  
  // Categorize products dynamically
  let categoryProducts = [];
  if (key === 'pakistani-suits' || key === 'pakistani-dresses') {
    categoryProducts = products.filter(p => /pakistan/i.test(p.title) || /pakistan/i.test(p.slug) || (p as any).category === 'pakistani-suits');
  } else if (key === 'daily-wear') {
    categoryProducts = products.filter(p => /v-neck|brush paint|daily|cord set|kurta/i.test(p.title) || /vnech|straight|cord/i.test(p.slug) || (p as any).category === 'daily-wear');
  } else if (key === 'cotton') {
    categoryProducts = products.filter(p => /cotton/i.test(p.title) || /cotton/i.test(p.details) || /cotton/i.test(p.slug) || (p as any).category === 'cotton');
  } else if (key === 'anarkali') {
    categoryProducts = products.filter(p => /anarkali/i.test(p.title) || /anarkali/i.test(p.details) || /anarkali/i.test(p.slug) || (p as any).category === 'anarkali');
  } else {
    categoryProducts = products.filter(p => p.slug === slug || (p as any).category === slug);
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-md p-12 border border-[#F5C6D0]/20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F5C6D0] to-[#D4A574] flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <h3 className="text-2xl font-serif text-[#4A2C3D] mb-4">Coming Soon</h3>
          <p className="text-[#8B5E6B] mb-8 max-w-md mx-auto">We're curating the finest pieces for this collection. Stay tuned for stunning designs crafted just for you.</p>
          <Link to="/" className="inline-block bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryProducts.map(p => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.title}
            price={p.price}
            originalPrice={p.originalPrice}
            colors={p.colors}
            onAddToCart={() => navigate(`/product/${p.slug}`, { state: { product: p } })}
            onClick={() => navigate(`/product/${p.slug}`, { state: { product: p } })}
          />
        ))}
      </div>
    </div>
  );
};
