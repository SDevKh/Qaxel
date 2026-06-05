import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartModal } from './CartModal';

interface PageNavProps {
  subtitle?: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export const PageNav: React.FC<PageNavProps> = ({ subtitle }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart') || '[]';
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((it) => ({
        id: Number(it.id),
        title: it.name || it.title || '',
        price: Number(it.price || 0),
        quantity: Number(it.quantity || 1),
        image: it.image || '',
        color: it.color,
        size: it.size,
      }));
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const raw = localStorage.getItem('cart') || '[]';
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCartItems(parsed.map((it) => ({
            id: Number(it.id),
            title: it.name || it.title || '',
            price: Number(it.price || 0),
            quantity: Number(it.quantity || 1),
            image: it.image || '',
            color: it.color,
            size: it.size,
          })));
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    };

    syncFromStorage();

    const onCartChanged = () => {
      syncFromStorage();
    };

    window.addEventListener('cartChanged', onCartChanged);
    window.addEventListener('storage', onCartChanged);
    return () => {
      window.removeEventListener('cartChanged', onCartChanged);
      window.removeEventListener('storage', onCartChanged);
    };
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    let updatedItems = [];
    if (quantity <= 0) {
      updatedItems = cartItems.filter(item => Number(item.id) !== id);
    } else {
      updatedItems = cartItems.map(item =>
        Number(item.id) === id ? { ...item, quantity } : item
      );
    }
    const storageItems = updatedItems.map((it) => ({
      id: it.id,
      name: it.title,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
      color: it.color,
      size: it.size,
    }));
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(storageItems));
    window.dispatchEvent(new CustomEvent('cartChanged'));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => Number(item.id) !== id);
    const storageItems = updatedItems.map((it) => ({
      id: it.id,
      name: it.title,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
      color: it.color,
      size: it.size,
    }));
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(storageItems));
    window.dispatchEvent(new CustomEvent('cartChanged'));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
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
            
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#4A2C3D] hover:text-[#B76E79] transition-colors"
              aria-label="shopping cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#B76E79] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
};

