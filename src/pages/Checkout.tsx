import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase.js';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
      return [];
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollToSection = (id: string) => {
const el = document.getElementById(id);
if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // keep cartItems in sync with localStorage updates (other pages)
  useEffect(() => {
    const sync = () => {
      try {
        const parsed = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(parsed);
      } catch (e) {
        setCartItems([]);
      }
    };
    window.addEventListener('cartChanged', sync as EventListener);
    window.addEventListener('storage', sync as EventListener);
    return () => {
      window.removeEventListener('cartChanged', sync as EventListener);
      window.removeEventListener('storage', sync as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handlePlaceOrder = async () => {
  setLoading(true);
  try {
    // derive totals from cart items
    const items = Array.isArray(cartItems) ? cartItems : [];
    const subtotal = items.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    const shipping = subtotal > 999 ? 0 : 80;
    const total = subtotal + shipping;

    let orderRef: any = null;
    try {
      orderRef = await addDoc(collection(db, 'orders'), {
        ...formData,
        userId: user?.uid || 'anonymous',
        userEmail: user?.email || formData.email,
        createdAt: serverTimestamp(),
        total,
        subtotal,
        shipping,
        items,
        status: 'pending'
      });
    } catch (e) {
      try {
        const raw = localStorage.getItem('orders') || '[]';
        const arr = JSON.parse(raw);
        const localOrder = {
          id: `local-${Date.now()}`,
          ...formData,
          userId: user?.uid || 'anonymous',
          userEmail: user?.email || formData.email,
          createdAt: new Date().toISOString(),
          total: total,
          subtotal: subtotal,
          shipping: shipping,
          items: items,
          status: 'pending'
        };
        arr.unshift(localOrder);
        localStorage.setItem('orders', JSON.stringify(arr));
        orderRef = { id: localOrder.id, local: true };
      } catch (err) {
        console.error('Failed to persist local order', err);
      }
    }

    if ((window as any).Razorpay) {
      openRazorpay();
    } else {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = openRazorpay;
      script.onerror = () => {
        alert('Failed to load payment gateway. Please try again.');
        setLoading(false);
      };
      document.head.appendChild(script);
    }

    function openRazorpay() {
      const options = {
        key: 'rzp_test_RgRusv8kOZaquo',
        amount: Math.round((total || 128.0) * 100),
        currency: 'INR',
        name: 'Your Shop',
        description: `Order Payment - ₹${(total || 128.0).toFixed(2)}`,
        handler: async function (response: any) {
          try {
            if (orderRef && !orderRef.local) {
              await updateDoc(doc(db, 'orders', orderRef.id), {
                status: 'paid',
                paymentId: response.razorpay_payment_id,
                paymentConfirmedAt: serverTimestamp()
              });
            } else if (orderRef && orderRef.local) {
              try {
                const raw = localStorage.getItem('orders') || '[]';
                const arr = JSON.parse(raw);
                const idx = arr.findIndex((o: any) => o.id === orderRef.id);
                if (idx > -1) {
                  arr[idx].status = 'paid';
                  arr[idx].paymentId = response.razorpay_payment_id;
                  localStorage.setItem('orders', JSON.stringify(arr));
                }
              } catch (e) {
                console.error('Failed to update local order after payment', e);
              }
            }

            try {
              localStorage.removeItem('cart');
              window.dispatchEvent(new CustomEvent('cartChanged', { detail: { items: [] } }));
            } catch (e) {}
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            setFormData({ email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '' });
            window.location.href = '/orders';
          } catch (err) {
            console.error('Failed to mark order paid', err);
            alert('Payment succeeded but failed to update order status. Please check your orders.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email || user?.email
        },
        theme: {
          color: '#000000'
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  } catch (error: any) {
    console.error('Error placing order:', error);
    alert(`Error placing order: ${error.message}`);
    setLoading(false);
  }
};


const subtotal = (Array.isArray(cartItems) ? cartItems : []).reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
const shipping = subtotal > 999 ? 0 : 80;
const total = subtotal + shipping;

  return (
    <>
    <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40 w-full">
            <div className="px-3 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="hover:underline font-semibold">
                  <img src="img/logo.png" alt="Logo" className="h-12" />
                </Link>
                <h1 className="text-xl font-bold md:block hidden">Missing Piece of your closet</h1>
              </div>
    
              <div className="flex items-center gap-4">
                <div className="md:flex gap-6">
                  <Link to="/" className="hover:underline font-semibold">Home</Link>
                </div>
    
                <button
                  className="md:hidden border-2 border-black px-2 py-1 rounded"
                  onClick={() => setMobileMenuOpen((s) => !s)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? 'Close' : 'Menu'}
                </button>
              </div>
            </div>
    
            {mobileMenuOpen && (
              <div className="md:hidden border-t-2 border-black p-4">
                <Link to="/" className="block py-2 hover:underline font-semibold">Home</Link>
                <button
                  onClick={() => {
                    scrollToSection('new-arrivals');
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2 hover:underline font-semibold w-full text-left"
                >
                  Categories
                </button>
              </div>
            )}
          </nav>
    
    <div className="min-h-screen bg-[#F9FBC3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip / Postal Code</label>
                  <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 border-b pb-4">
              {(Array.isArray(cartItems) ? cartItems : []).map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-primary">{item.name}</h3>
                    <p className="text-sm text-gray-700">Qty: {item.quantity}</p>
                    {item.color && <p className="text-xs text-gray-600">Color: {item.color}</p>}
                  </div>
                  <span className="text-sm font-semibold text-black">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-8 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
