import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ServiceHighlights } from './ServiceHighlights';
import { Footer } from './Footer';
import { CartModal } from './CartModal';
import { ProductDetailModal } from './ProductDetailModal';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

import { useProducts, Product } from '../lib/products';

const CATEGORIES = [
  { name: 'Pakistani Suits', slug: 'pakistani-suits', image: '/img/pakistani (1).jpeg', desc: 'Elegant Pakistani-style suits with intricate embroidery' },
  { name: 'Daily Wear', slug: 'daily-wear', image: '/img/vnech (2).jpeg', desc: 'Comfortable and stylish everyday outfits' },
  { name: 'Cotton Collection', slug: 'cotton', image: '/img/cotton (1).jpeg', desc: 'Breathable pure cotton ethnic wear' },
  { name: 'Anarkali', slug: 'anarkali', image: '/img/lime (1).jpeg', desc: 'Timeless Anarkali suits for festive occasions' },
];

const MAX_VISIBLE_PRODUCTS = 4;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((it) => ({
        id: Number(it.id),
        title: it.name || it.title || '',
        price: Number(it.price || it.price || 0),
        quantity: Number(it.quantity || 1),
        image: it.image || '',
        color: it.color,
        size: it.size,
      }));
    } catch (e) {
      return [];
    }
  });
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [promoIndex, setPromoIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const promos = [
    "Flat 50% off on every product. Save upto 500 on your first order",
    "Free shipping on orders above Rs. 999",
    "New arrivals every week - Shop the latest trends"
  ];
  // helper to open product detail modal
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const addToCart = (product: Product) => {
    navigate(`/product/${product.slug}`, { state: { product } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Initialize cart from localStorage and listen for cart updates
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const raw = localStorage.getItem('cart') || '[]';
        const parsed: any[] = JSON.parse(raw);
        setCartItems(parsed.map((it) => ({
          id: Number(it.id),
          title: it.name || it.title || '',
          price: Number(it.price || it.price || 0),
          quantity: Number(it.quantity || 1),
          image: it.image || '',
          color: it.color,
          size: it.size,
        })));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    };

    syncFromStorage();

    const onCartChanged = (ev: any) => {
      syncFromStorage();
    };

    window.addEventListener('cartChanged', onCartChanged as EventListener);
    window.addEventListener('storage', onCartChanged as EventListener);
    return () => {
      window.removeEventListener('cartChanged', onCartChanged as EventListener);
      window.removeEventListener('storage', onCartChanged as EventListener);
    };
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      const storageItems = cartItems.map((it) => ({
        id: it.id,
        name: it.title,
        price: it.price,
        quantity: it.quantity,
        image: it.image,
        color: it.color,
        size: it.size,
      }));
      localStorage.setItem('cart', JSON.stringify(storageItems));
      try {
        window.dispatchEvent(new CustomEvent('cartChanged', { detail: { items: storageItems } }));
      } catch (e) {
        // ignore
      }
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  // open cart when landing with ?openCart=1
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('openCart') === '1') {
        setCartOpen(true);
        const url = new URL(window.location.href);
        url.searchParams.delete('openCart');
        window.history.replaceState({}, '', url.pathname + url.search);
      }
    } catch (e) {
      // ignore
    }
  }, [location.search]);

  // close menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#4A2C3D] to-[#6B3A5A] py-2 px-4 flex items-center justify-between text-[#F5C6D0]">
        <button aria-label="previous promo" onClick={() => setPromoIndex((promoIndex - 1 + promos.length) % promos.length)}>
          <ChevronLeft size={18} />
        </button>
        <p className="text-xs text-center font-medium flex-1 tracking-wide">{promos[promoIndex]}</p>
        <button aria-label="next promo" onClick={() => setPromoIndex((promoIndex + 1) % promos.length)}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#F5C6D0]/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B76E79] -mt-0.5 font-medium italic">For Her · By Her · With Her</span>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex gap-6">
              <a href="#home" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium transition-colors text-sm">Home</a>
              <button onClick={() => scrollToSection('categories')} className="text-[#4A2C3D] hover:text-[#B76E79] font-medium transition-colors text-sm">Categories</button>
              <button onClick={() => scrollToSection('new-arrivals')} className="text-[#4A2C3D] hover:text-[#B76E79] font-medium transition-colors text-sm">Shop</button>
              <Link to="/about" className="text-[#4A2C3D] hover:text-[#B76E79] font-medium transition-colors text-sm">About</Link>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#4A2C3D] hover:text-[#B76E79] transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#B76E79] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen ? 'true' : 'false'}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A574] flex items-center justify-center text-white text-sm font-bold">
                    {(user.displayName ?? user.email?.split('@')[0])?.charAt(0)?.toUpperCase()}
                  </div>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#F5C6D0]/40 rounded-xl shadow-xl z-50 text-[#4A2C3D] overflow-hidden">
                    <div className="px-4 py-3 bg-[#FFF0F3]">
                      <div className="font-semibold text-sm">{user.displayName ?? user.email?.split('@')[0]}</div>
                      <div className="text-xs text-[#8B5E6B] truncate">{user.email}</div>
                    </div>
                    <Link to="/account-settings" className="block px-4 py-2.5 hover:bg-[#FFF0F3] text-sm">Account settings</Link>
                    <Link to="/orders" className="block px-4 py-2.5 hover:bg-[#FFF0F3] text-sm">My orders</Link>
                    <button
                      onClick={async () => { await signOut(auth); setMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FFF0F3] text-sm border-t border-[#F5C6D0]/20"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all text-sm">
                Login
              </Link>
            )}
            <button className="md:hidden text-[#4A2C3D]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu with transition */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-[#F5C6D0]/30 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 space-y-1">
            <a href="#home" className="block py-2.5 px-4 text-[#4A2C3D] hover:bg-[#FFF0F3] hover:text-[#B76E79] font-medium rounded-xl transition-all">Home</a>
            <button onClick={() => { scrollToSection('categories'); setMobileMenuOpen(false); }} className="block py-2.5 px-4 text-[#4A2C3D] hover:bg-[#FFF0F3] hover:text-[#B76E79] font-medium w-full text-left rounded-xl transition-all">Categories</button>
            <button onClick={() => { scrollToSection('new-arrivals'); setMobileMenuOpen(false); }} className="block py-2.5 px-4 text-[#4A2C3D] hover:bg-[#FFF0F3] hover:text-[#B76E79] font-medium w-full text-left rounded-xl transition-all">Shop</button>
            <Link to="/about" className="block py-2.5 px-4 text-[#4A2C3D] hover:bg-[#FFF0F3] hover:text-[#B76E79] font-medium rounded-xl transition-all">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF0F3] via-[#FFF8F5] to-[#FFF0E8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center px-6 py-12 md:py-20 lg:py-28">
          <div className="text-center md:text-left z-10 flex-1 md:pr-10">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-[#B76E79] font-bold">For Her · By Her · With Her</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mb-6 leading-tight text-[#4A2C3D]">
              Elegance In <br className="hidden sm:block" /><span className="italic bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Every Fold.</span>
            </h2>
            <p className="text-[#8B5E6B] mt-4 mb-8 leading-relaxed text-sm md:text-base max-w-lg mx-auto md:mx-0">
              Welcome to Pardesi Naari — your destination for traditional silhouettes redefined for the modern age. From Pakistani suits to elegant Anarkalis, discover outfits that turn every occasion into a timeless memory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('categories')}
                className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-8 py-3.5 rounded-full font-bold tracking-wider hover:shadow-xl transition-all hover:scale-105 text-xs sm:text-sm shadow-md"
              >
                EXPLORE COLLECTION
              </button>
              <Link to="/about" className="border-2 border-[#B76E79] text-[#B76E79] px-8 py-3.5 rounded-full font-medium hover:bg-[#B76E79] hover:text-white transition-all text-xs sm:text-sm text-center">
                OUR STORY
              </Link>
            </div>
          </div>
          <div className="relative flex-1 w-full max-w-lg md:max-w-none">
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-[#F5C6D0]/30 to-[#D4A574]/30 rounded-full blur-3xl opacity-50"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src='/img/summerlawn (4).jpeg'
                alt="Traditional Fashion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceHighlights />

      {/* Shop by Category */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B76E79] font-semibold mb-2">Browse Our Collections</p>
          <h2 className="text-4xl font-serif text-[#4A2C3D] mb-3">Shop by Category</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              to={`/category/${cat.slug}`}
              key={cat.slug}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C3D]/80 via-[#4A2C3D]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-serif text-lg font-bold mb-1">{cat.name}</h3>
                <p className="text-[#F5C6D0] text-xs opacity-90">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="bg-gradient-to-b from-[#FFF0F3] to-[#FFF8F5] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B76E79] font-semibold mb-2">Fresh Styles</p>
            <h2 className="text-4xl font-serif text-[#4A2C3D] mb-3">New Arrivals</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, showAllProducts ? products.length : MAX_VISIBLE_PRODUCTS).map(product => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                colors={product.colors}
                onAddToCart={() => addToCart(product)}
                onClick={() => navigate(`/product/${product.slug}`, { state: { product } })}
              />
            ))}
          </div>
          {products.length > MAX_VISIBLE_PRODUCTS && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="border-2 border-[#B76E79] text-[#B76E79] px-8 py-3 rounded-full font-medium hover:bg-[#B76E79] hover:text-white transition-all inline-flex items-center gap-2"
              >
                {showAllProducts ? 'View Less' : 'View More'} <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trending Collections */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B76E79] font-semibold mb-2">What's Hot</p>
          <h2 className="text-4xl font-serif text-[#4A2C3D] mb-3">Trending Collections</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.concat(products).slice(0, MAX_VISIBLE_PRODUCTS).map((product, idx) => (
            <ProductCard
              key={`trending-${product.id}-${idx}`}
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              colors={product.colors}
              onAddToCart={() => addToCart(product)}
              onClick={() => navigate(`/product/${product.slug}`, { state: { product } })}
            />
          ))}
        </div>
      </section>

      {/* Slogan Banner */}
      <section className="bg-gradient-to-r from-[#4A2C3D] to-[#6B3A5A] py-16 text-center">
        <p className="text-[#D4A574] text-xs uppercase tracking-[0.4em] mb-3 font-semibold">Our Promise</p>
        <h2 className="text-3xl md:text-5xl font-serif text-white italic">For Her. By Her. With Her.</h2>
        <p className="text-[#F5C6D0] mt-4 max-w-xl mx-auto text-sm">Every piece at Pardesi Naari is crafted with love, designed by women, for women who celebrate their heritage with pride.</p>
      </section>

      <Footer />

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />

      <ProductDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        product={selectedProduct}
        onAddToCart={(p, s) => {
          if (p) {
            // Logic to add to cart with size
            const cartKey = 'cart';
            const raw = localStorage.getItem(cartKey) || '[]';
            let items: any[] = [];
            try {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) items = parsed;
            } catch (e) {}
            const existing = items.find(i => i && String(i.id) === String(p.id) && i.size === s);
            if (existing) {
              existing.quantity = (existing.quantity || 1) + 1;
            } else {
              items.push({
                id: p.id,
                name: p.title,
                price: p.price,
                quantity: 1,
                image: p.image,
                size: s,
                color: p.colors?.[0] || ''
              });
            }
            localStorage.setItem(cartKey, JSON.stringify(items));
            window.dispatchEvent(new CustomEvent('cartChanged'));
          }
        }}
      />
    </div>
  );
};

export default AppLayout;
