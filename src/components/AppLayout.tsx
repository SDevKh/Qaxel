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
import styled from 'styled-components';

const StyledWrapper = styled.div`
  button,
  button::after {
   padding: 16px 20px;
   font-size: 18px;
   background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
   border: 0;
   color: #fff;
   letter-spacing: 3px;
   line-height: 1;
   box-shadow: 6px 0px 0px #00e6f6;
   outline: transparent;
   position: relative;
  }

  button::after {
   --slice-0: inset(50% 50% 50% 50%);
   --slice-1: inset(80% -6px 0 0);
   --slice-2: inset(50% -6px 30% 0);
   --slice-3: inset(10% -6px 85% 0);
   --slice-4: inset(40% -6px 43% 0);
   --slice-5: inset(80% -6px 5% 0);
   content: "HOVER ME";
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #ff013c 5%);
   text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
   clip-path: var(--slice-0);
  }

  button:hover::after {
   animation: 1s glitch;
   animation-timing-function: steps(2, end);
  }

  @keyframes glitch {
   0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
   }

   10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
   }

   20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
   }

   30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
   }

   40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
   }

   50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
   }

   60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
   }

   70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
   }

   80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
   }

   90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
   }

   100% {
    clip-path: var(--slice-1);
    transform: translate(0);
   }
  }`;

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

export interface Product{
  id: number;
  image: string;
  mainImage?: string;
  galleryImages?: string[];
  title: string;
  price: number;
  description: string;
  details: string;
  colors?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    image: '/img/skirt1.jpg',
    galleryImages: [
     '/img/skirt1-2.jpg',
     '/img/skirt1.jpg'
   ],
    title: 'Elegant maxi women skirt trapezoidal pattern full length.',
    price: 2000,
    colors: [''],
    description: 'This stunning trapeze-shaped  women’s formal skirt is a true expression of elegance and chic.',
    details: 'Its timeless design makes it the perfect choice for many festive occasions. Made of high-quality materials, this dress has a smooth and pleasant-to-touch fabric that is not only comfortable and stretchable but also looks luxurious. Flattering High-Waist Fit: Designed to enhance the waistline and complement a wide range of body shapes. Unique Statement Piece: A standout addition to any wardrobe, perfect for women who love artistic and modern fashion. This is a dress that will always make you feel special and elegant.'
  },
  {
    id: 2,
    image: '/img/skirt2.jpg',
    galleryImages: [
      '/img/skirt2.jpg',
     '/img/skirt2-2.jpg',
     '/img/skirt2-3.jpg',
     '/img/skirt2.jpg'
   ],
    title: 'INSPIRED BY DEMON SLAYER',
    price: 2000,
    colors: ['#111827', '#F43F5E', '#7C3AED'],
    description: 'Stunning black dress with vibrant pink and purple ombre gradient skirt.',
    details: 'This black dress features a beautiful ombre gradient skirt that transitions from vibrant pink to purple. The off-shoulder design adds a touch of elegance, making it perfect for both casual and formal occasions. Made from high-quality materials, this dress ensures comfort and style all day long.'
  },
  {
    id: 3,
    image: '/img/skirt3.jpg',
    galleryImages: [
      '/img/skirt3.jpg',
     '/img/skirt3-1.jpg',
     '/img/skirt3-2.jpg',
     '/img/skirt3-4.jpg',
     '/img/skirt3-5.jpg',
     '/img/skirt5.jpg',
     '/img/skirt5-1.jpg',
     '/img/skirt5-2.jpg',
     '/img/skirt5-3.jpg'
   ],
    title: 'INSPIRED BY DEMON SLAYER',
    price: 2000,
    colors: ['#F59E0B', '#10B981', '#EF4444'],
    description: 'Elegant white off-shoulder dress with grey ombre gradient midi skirt.',
    details: 'This black dress features a beautiful ombre gradient skirt that transitions from vibrant pink to purple. The off-shoulder design adds a touch of elegance, making it perfect for both casual and formal occasions. Made from high-quality materials, this dress ensures comfort and style all day long.'
  },
  {
    id: 4,
    image: '/img/skirt4.jpg',
    galleryImages: [
      '/img/skirt4.jpg',
     '/img/skirt4-1.jpg',
     '/img/skirt4-2.jpg',
     '/img/skirt4-3.jpg',
     '/img/skirt4-4.jpg'
   ],
    title: 'Luxury black and white satin skirt with pearl embellishments for women',
    price: 2000,
    colors: [''],
    description: 'Luxury black and white satin skirt with pearl embellishments for women for every ocassion.',
    details: `🖤 Elegant Bi-Color Pearl-Embellished A-Line Midi Skirt/n 🤍
📝 Product Description

Step out in timeless sophistication with this exquisite Bi-Color A-Line Midi Skirt. Featuring a striking contrast of classic black and crisp white, this skirt is a true statement piece. The design boasts a unique diagonal seam that transitions seamlessly from the satin black upper half to the flowing white lower half.

Key Features & Benefits (For Product Listings)

Striking Bi-Color Design: Bold black and white contrast with a unique diagonal/asymmetrical color block pattern.

Luxury Pearl Embellishments: Delicate, scattered pearl accents provide an upscale, glamorous, and textured finish.

Flattering A-Line Silhouette: High-waisted midi length (or calf-length) that drapes beautifully and suits all body types.

High-Quality Fabric: Smooth, elegant satin or silk-blend material offers a luxurious look and feel with a beautiful movement.

Versatile Styling: Ideal for formal occasions, weddings, galas, parties, or stylish semi-formal daily wear.

`
  },
  {
    id: 5,
    image: '/img/skirt5.jpg',
    galleryImages: [
     '/img/skirt5.jpg',
     '/img/skirt5-1.jpg',
     '/img/skirt5-2.jpg',
     '/img/skirt5-3.jpg'
   ],
    title: 'INSPIRED BY DEMON SLAYER',
    price: 2000,
    colors: ['#BE185D', '#F43F5E', '#06B6D4'],
    description: 'Traditional burgundy ethnic outfit with intricate embroidery.',
    details: 'This black dress features a beautiful ombre gradient skirt that transitions from vibrant pink to purple. The off-shoulder design adds a touch of elegance, making it perfect for both casual and formal occasions. Made from high-quality materials, this dress ensures comfort and style all day long.'
  }
];

const MAX_VISIBLE_PRODUCTS = 4;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const parsed: any[] = JSON.parse(raw);
      return parsed.map((it) => ({
        id: Number(it.id),
        title: it.name || it.title || '',
        price: Number(it.price || it.price || 0),
        quantity: Number(it.quantity || 1),
        image: it.image || '',
        color: it.color,
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
    navigate(`/product/${product.id}`, { state: { product } });
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
      }));
      localStorage.setItem('cart', JSON.stringify(storageItems));
      // let other listeners know (other tabs or components)
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
        // remove param from URL without reloading
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
    <div className="min-h-screen bg-[#F9FBC3]">
      {/* Promo Banner */}
      <div className="bg-[#F5E6B3] border-b-2 border-black py-2 px-4 flex items-center justify-between">
        <button aria-label="previous promo" onClick={() => setPromoIndex((promoIndex - 1 + promos.length) % promos.length)}>
          <ChevronLeft size={20} />
        </button>
        <p className="text-sm text-center flex-1">{promos[promoIndex]}</p>
        <button aria-label="next promo" onClick={() => setPromoIndex((promoIndex + 1) % promos.length)}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40">
        <div className=" px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img
              src="img/logo.png"
              alt="Logo"
              className="h-12"
            />
            <h1 className="text-xl font-bold md:block hidden">Missing Piece of your closet</h1>
            
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <a href="#home" className="hover:underline font-semibold">Home</a>
              <button onClick={() => scrollToSection('new-arrivals')} className="hover:underline font-semibold">Categories</button>
            </div>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative hover:opacity-70"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-[#F5E6B3] rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
                  aria-expanded={menuOpen}
                >
                  <img src="img/user.png" alt="User Avatar" className="h-8 w-8 rounded-full" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 text-black">
                    <div className="px-4 py-2 border-b">
                      <div className="font-semibold">{user.displayName ?? user.email?.split('@')[0]}</div>
                      <div className="text-sm text-gray-600 truncate">{user.email}</div>
                    </div>
                    <Link to="/account-settings" className="block px-4 py-2 hover:bg-gray-100">Account settings</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My orders</Link>
                    <button
                      onClick={async () => { await signOut(auth); setMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-black text-[#F5E6B3] px-4 py-2 font-semibold hover:bg-gray-800">
                Login
              </Link>
            )}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <a href="#home" className="block py-2 hover:underline font-semibold">Home</a>
            <button onClick={() => { scrollToSection('new-arrivals'); setMobileMenuOpen(false); }} className="block py-2 hover:underline font-semibold w-full text-left">Categories</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="rectangel w-[100vw] absolute bg-black h-[100%] opacity-[0.72]  md:hidden"> .</div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className=' absolute md:relative'>
            <p className="text-sm uppercase tracking-widest mb-2 text-red-500 font-LuckiestGuy md:justify-self-start justify-self-center">EXPERTS & TRUSTED</p>
            <h2 className="text-[9.4vw] md:text-6xl font-lustaria mb-4 leading-tight text-center md:text-left text-white md:text-black md:px-0 px-9">
              Unleash Your Style.<br />Transform Your Look.
            </h2>
            <p className="text-gray-700 mt-10 mb-8 leading-relaxed text-[1.3vw] font-Aboreto hidden md:block">
              Welcome to Qaxel, your ultimate destination for stunning fancy dresses, statement outfits, and unforgettable fashion moments. Whether you're dressing for a gala, a themed party, or just want to turn heads on a night out — we’ve got the look that speaks your vibe.
            </p>
            <div className="flex gap-12 justify-center md:justify-start relative">
              <button 
                onClick={() => scrollToSection('new-arrivals')}
                className="bg-black text-white px-8 py-3 font-Aboreto hover:bg-gray-800 absolute md:static  md:justify-self-start hover:scale-105"
              >
                EXPLORE NOW 
              </button>
              <StyledWrapper>
              <a href="/about"> <button 
                className="border-2 border-green-700 rounded-3xl md:mt-0 mt-[9vh] font-Aboreto hover:bg-green-700 hover:text-[#F5E6B3] transition-colors block"
              >
                ABOUT US
              </button></a>
              </StyledWrapper>

    
            </div>
          </div>
          
          <div className="ml-[0.4vw] md:w-[48vw]">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/690b3d9b7962829e8527bda2_1762344401762_8a1a409a.webp" 
              alt="Fashion model"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <ServiceHighlights />

      {/* New Arrivals */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-Amaranth mb-8">New Arrivals</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, showAllProducts ? PRODUCTS.length : MAX_VISIBLE_PRODUCTS).map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
             title={product.title}
              price={product.price}
              colors={product.colors}
              onAddToCart={() => addToCart(product)}
              onClick={() => navigate(`/product/${product.id}`, { state: {product } })}
            />
          ))}
        </div>
        {PRODUCTS.length > MAX_VISIBLE_PRODUCTS && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="inline-flex items-center gap-2 font-bold hover:underline"
            >
              {showAllProducts ? 'View Less' : 'View More'} <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
      {/* For Every Occasion */}
      <section className="max-w-7xl mx-auto px-4 pb-4.5">
        <h2 className="text-3xl font-bold font-Amaranth mb-8">For Every Occasion</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.concat(PRODUCTS).slice(0, MAX_VISIBLE_PRODUCTS).map((product, idx) => (
            <ProductCard
              key={`occasion-${idx}`}
              image={product.image}
              title={product.title}
              price={product.price}
              colors={product.colors}
              onAddToCart={() => addToCart(product)}
              onClick={() => navigate(`/product/${product.id}`, { state: {product } })}
            />
          ))}
        </div>
      </section>

      {/* Trending Skirts */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-Amaranth mb-8">Trending Skirts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.concat(PRODUCTS).slice(0, MAX_VISIBLE_PRODUCTS).map((product, idx) => (
            <ProductCard
              key={`trending-${product.id}`}
              image={product.image}
              title={product.title}
              price={product.price}
              colors={product.colors}
              onAddToCart={() => addToCart(product)}
              onClick={() => navigate(`/product/${product.id}`, { state: {product } })}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button 
            onClick={() => scrollToSection('new-arrivals')}
            className="inline-flex items-center gap-2 font-bold hover:underline"
          >
            View More <ChevronRight size={20} />
          </button>
        </div>
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
        onAddToCart={() => selectedProduct && addToCart(selectedProduct)}
      />
    </div>
  );
};

export default AppLayout;
