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

export interface Product {
  id: number;
  image: string;
  mainImage?: string;
  galleryImages?: string[];
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string;
  colors?: string[];
  size?: string[];
  reviewIds?: string[];
  slug: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'pakistani-add-product',
    image: '/img/pakistani (1).jpeg',
    galleryImages: [
      '/img/pakistani (1).jpeg',
      '/img/pakistani (3).jpeg',
      '/img/pakistani (4).jpeg',
      '/img/pakistani (5).jpeg',
      '/img/pakistani (6).jpeg'
    ],
    title: 'Heavy Cotton Pakistani Salwar Kameez Cream Embroidered With Imported Silk Chex Dupatta',
    price: 1949,
    originalPrice: 3099,
    colors: [''],
    size: ['Free Size'],
    description: 'Elegant Pakistani suit with stitched finishing and premium traditional detailing.',
    reviewIds: [],
    details: `Made from high-quality cotton and adorned with delicate embroidery, this cream salwar kameez from Pakistan is the epitome of elegance. The included imported silk chex dupatta adds a touch of luxury to this traditional ensemble.

Dress Type : Semi-Stitched ( Free Size ) , XL-XXL (Full Stitched)
Top Fabric : Heavy Cotton ( With Heavy Work Embroidery + Organza Foot Hill Work )
Bottom : Semi Lawn 
Dupatta : Imported Silk Chex ( With 2 Side Embroidery Work )
Top Length : 46 Inch Max.
Top Bust Size : 62 Inch Max.
Bottom Size : 2.25 MTR
Dupatta Size : 2.15 MTR
Dress Work : Multicolor Embroidery Work + Good Looking Full Dress Work + Organza Foot Hill Work
Wash : Only Dry Clean
`
  },
  {
    id: 2,
    slug: 'Spring-Summer-Muslin-Lawn',
    image: '/img/muslin lawn (2).jpeg',
    galleryImages: [
      '/img/muslin lawn (1).jpeg',
      '/img/muslin lawn (2).jpeg',
      '/img/muslin lawn (3).jpeg',
      '/img/muslin lawn (4).jpeg',
      '/img/muslin lawn (5).jpeg'
    ],
    title: 'Spring Summer Muslin Lawn',
    price: 1229,
    originalPrice: 1999,
    colors: [''],
    size: ['Free Size'],
    description: 'Spring Summer Muslin Lawn.',
    reviewIds: [],
    details: `Fabric:
Capturing the essence of Mughal paisley design, our paste-printed shirt effortlessly complements a color block dupatta and dyed pants, exuding a touch of inspired elegance.

Component Details (3 Piece) 	Measurement
Paste Printed Front On Lawn	1.15 Meters
Paste Printed Back On Lawn	1.15 Meters
Paste Printed Sleeves On Lawn	0.65 Meters
Embroidered Neck On Organza	 
Embroidered Border On Organza	1 Meter
Yarn Dyed Dupata	2.5 Meters
Dyed Cotton Pants	1.75 Meters
Size:
Unstitched Fabric / Unstitched Dress Material
Authenticity Guaranteed – 100% Original
`
  },
  {
    id: 3,
    slug: 'Spring-Summer-Muslin-Lawn',
    image: '/img/summerlawn (1).jpeg',
    galleryImages: [
      '/img/summerlawn (1).jpeg',
      '/img/summerlawn (2).jpeg',
      '/img/summerlawn (3).jpeg',
      '/img/summerlawn (4).jpeg',
    ],  
    title: 'Ombre starlet summer lawn pakistani suit',
    price: 1589,
    originalPrice: 2599,
    colors: [''],
    size: ['Free Size'],
    description: 'Ombre starlet summer lawn pakistani suit',
    reviewIds: [],
    details: `Main Fabric: Lawn

Dupatta Fabric: Chiffon

Summary: Exude elegance in this stunning black Pakistani suit from Jade, beautifully modeled by Dananeer. This festive outfit features an exquisitely detailed kameez crafted from premium summer lawn, making it both breathable and chic for warmer seasons. The shirt is adorned with intricate Chikankari and laser kari embroidery, offering a rich texture and luxurious feel. The deep black hue makes this Pakistani dress a versatile choice for evening events and formal gatherings. As an elegant piece of ethnic wear, it's perfect for making a statement at Eid celebrations or as sophisticated party wear.

Color: Black
Fabric:
3 MTRS EMBROIDERED CHIKANKARI & LASER KARI LAWN SHIRT
2.5 MTRS DIGITAL PRINTED BAMBER CHIFFON DUPATTA
2.5 MTRS DYED COTTTON TROUSER
1 YARD ORGANZA CHIKANKARI EMBROIDERED SLEEVES BORDER
1.7 YARDS ORGANZA CHIKANKARI EMBROIDERED FRONT & BACK DAMAN BORDER
Size:
Unstitched Fabric / Unstitched Dress Material
Authenticity Guaranteed – 100% Original
`
  },
  {
    id: 4,
    slug: 'Sea blue ombre starlet collection',
    image: '/img/seablue (4).jpeg',
    galleryImages: [
      '/img/seablue (1).jpeg',
      '/img/seablue (2).jpeg',
      '/img/seablue (3).jpeg',
      '/img/seablue (4).jpeg',
      '/img/seablue (5).jpeg'
    ],  
    title: 'Ombre starlet summer lawn pakistani suit',
    price: 1589,
    originalPrice: 2599,
    colors: [''],
    size: ['Free Size'],
    description: 'Ombre starlet summer lawn pakistani suit',
    reviewIds: [],
    details: `Type - Unstitched 

Fabric Details : 

Embroidered Chikankari Lawn Shirt - 3 meter 

Digital printed bamber chiffon duppatta - 2.5 meter 

Dyed cotton trouser - 2.5 meter 

Organza embroidered sleeves border - 1 yard 

Organza embroidered front and back Daman border - 1.7 yards
`
  },
  {
    id: 5,
    slug: 'Lime lawn pakistani suit',
    image: '/img/lime (3).jpeg',
    galleryImages: [
      '/img/lime (1).jpeg',
      '/img/lime (2).jpeg',
      '/img/lime (3).jpeg'
    ],  
    title: 'Lime lawn pakistani suit',
    price: 1299,
    originalPrice: 2499,
    colors: [''],
    size: ['Free Size'],
    description: 'Lime lawn pakistani suit',
    reviewIds: [],
    details: `Color: Green
Shirt
Printed Lawn Shirt
Embroidered Neckline
Trouser
Dyed Cambric Trouser
Dupatta
Printed Chiffon Dupatta
Note: Dry Clean Only
`
  },
  {
    id: 6,
    slug: 'Embridered english colour pakistani suit',
    image: '/img/english (5).jpeg',
    galleryImages: [
      '/img/english (1).jpeg',
      '/img/english (2).jpeg',
      '/img/english (3).jpeg',
      '/img/english (4).jpeg',
      '/img/english (5).jpeg'
    ],  
    title: 'embridered english colour pakistani suit',
    price: 2079,
    originalPrice: 3999,
    colors: [''],
    size: ['Free Size'],
    description: 'embridered english colour pakistani suit',
    reviewIds: [],
    details: `op - Pure cotton with heavy self embroidery attached emb patches & Lazor cutwork

Bot - cotton solid

DUP-:Pure cotton mal mal with embroidery

DUP-:Chiffon print with embroidery
`
  },
  {
    id: 7,
    slug: 'Embriodered pure cotton pakistani suit',
    image: '/img/cotton (3).jpeg',
    galleryImages: [
      '/img/cotton (1).jpeg',
      '/img/cotton (2).jpeg',
      '/img/cotton (3).jpeg',
      '/img/cotton (4).jpeg',
      '/img/cotton (5).jpeg',
      '/img/cotton (6).jpeg',
      '/img/cotton (7).jpeg',
      '/img/cotton (8).jpeg',
      '/img/cotton (9).jpeg',
      '/img/cotton (10).jpeg'
    ],  
    title: 'Embriodered pure cotton pakistani suit',
    price: 1999,
    originalPrice: 3599,
    colors: [''],
    size: ['Free Size'],
    description: 'Embriodered pure cotton pakistani suit',
    reviewIds: [],
    details: `_👗Top :-CAMBRIC COTTON WITH HEAVY EMBROIDERY WORK

_🎗️Dupatta :-MASLIN COTTON WITH DIGITAL PRINT 

👖Bottom :- CAMBRIC COTTON      unstitched piece
`
  },
  {
    id: 8,
    slug: 'Women tie & dye cotton straight shape kurta pant with duppata',
    image: '/img/straight (5).jpeg',
    galleryImages: [
      '/img/staright (1).jpeg',
      '/img/staright (2).jpeg',
      '/img/staright (3).jpeg',
      '/img/staright (4).jpeg',
      '/img/staright (5).jpeg'
    ],  
    title: 'Women tie & dye cotton straight shape kurta pant with duppata ',
    price: 1499,
    originalPrice: 2490,
    colors: [''],
    size: ['M', 'L', 'XL', 'XXL' ,'3XL'],
    description: 'Women tie & dye cotton straight shape kurta pant with duppata',
    reviewIds: [],
    details: `Elevate your ethnic style with this Tie & Dye Cotton Straight Kurta Set. Featuring a V-neckline, pin tucks at the front, and delicate handwork detailing, this kurta is both elegant and comfortable. The 3/4th regular sleeves and calf-length straight silhouette make it perfect for everyday wear or festive occasions. Complete the look with matching pants and a coordinated dupatta for a stylish, put-together ensemble.
Features:
Fabric: 100% Cotton

Pattern: Tie & Dye

Neckline: V Neck

Sleeves: 3/4 Regular, 
Design: Front Pin Tucks & Handwork

Length: Calf Length

Fit: Straight Shape
Set Includes: Kurta, Pant & Dupatta

Occasion: Casual, Festive, or Office Wear
    `
  },
  {
    id: 8,
    slug: 'WOMAN V-NECK HAND BRUSH PAINTED CORD SET',
    image: '/img/vnech (2).jpeg',
    galleryImages: [
      '/img/vnech (1).jpeg',
      '/img/vnech (2).jpeg',
      '/img/vnech (3).jpeg',
      '/img/vnech (4).jpeg',
      '/img/vnech (5).jpeg',
      '/img/vnech (6).jpeg'
    ],  
    title: 'WOMAN V-NECK HAND BRUSH PAINTED CORD SET',
    price: 1590,
    originalPrice: 2490,
    colors: [''],
    size: ['M', 'L', 'XL', 'XXL' ,'3XL'],
    description: 'WOMAN V-NECK HAND BRUSH PAINTED CORD SET',
    reviewIds: [],
    details: `Designed in premium cotton shaded A-line fabric, this outfit blends comfort with artistic charm. The V-neckline with tassels adds a stylish touch, while the subtle brush-paint texture enhances its contemporary appeal. Paired with a straight-fit pant, this set is perfect for festive gatherings, casual outings, or day-to-day chic styling.

 

 Key Features
Premium Cotton Fabric – Soft, breathable, and perfect for all-day comfort.
Artistic Brush-Paint Texture – Hand-painted effect adds a unique.
Stylish V-Neckline with Tassels – Enhances the feminine and elegant look.
A-Line Kurta Design – Flattering silhouette suitable for all body shapes.
Straight-Fit Pants – Gives a clean and modern finish to the outfit.
Vibrant Orange Shade – Perfect for festive and casual occasions.
Lightweight & Easy to Wear – Ideal for everyday wear and travel.
Perfect Coordination – Designed as a complete cord set for ready-to-wear effortless style.
    `
  }
];

const CATEGORIES = [
  { name: 'Pakistani Suits', slug: 'pakistani-suits', image: '/img/pakistani (1).jpeg', desc: 'Elegant Pakistani-style suits with intricate embroidery' },
  { name: 'Daily Wear', slug: 'daily-wear', image: '/img/vnech (2).jpeg', desc: 'Comfortable and stylish everyday outfits' },
  { name: 'Cotton Collection', slug: 'cotton', image: '/img/cotton (1).jpeg', desc: 'Breathable pure cotton ethnic wear' },
  { name: 'Anarkali', slug: 'anarkali', image: '/img/lime (1).jpeg', desc: 'Timeless Anarkali suits for festive occasions' },
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
            {PRODUCTS.slice(0, showAllProducts ? PRODUCTS.length : MAX_VISIBLE_PRODUCTS).map(product => (
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
          {PRODUCTS.length > MAX_VISIBLE_PRODUCTS && (
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
          {PRODUCTS.concat(PRODUCTS).slice(0, MAX_VISIBLE_PRODUCTS).map((product, idx) => (
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
            const items: any[] = JSON.parse(raw);
            const existing = items.find(i => String(i.id) === String(p.id) && i.size === s);
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
