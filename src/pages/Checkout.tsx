import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { PageNav } from '../components/PageNav';
import { LogIn, UserPlus, ShoppingBag } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch (e) { return []; }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        setFormData(prev => ({ ...prev, email: currentUser.email || '' }));
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const sync = () => {
      try { setCartItems(JSON.parse(localStorage.getItem('cart') || '[]')); } catch (e) { setCartItems([]); }
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
    if (!user) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const items = Array.isArray(cartItems) ? cartItems : [];
      const subtotal = items.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
      const shipping = subtotal > 999 ? 0 : 80;
      const total = subtotal + shipping;

      let orderRef: any = null;
      try {
        orderRef = await addDoc(collection(db, 'orders'), {
          ...formData, 
          userId: user.uid, 
          userEmail: user.email || formData.email,
          createdAt: serverTimestamp(), 
          total, subtotal, shipping, items, status: 'pending'
        });
      } catch (e) {
        // Fallback to local storage if Firebase fails
        try {
          const raw = localStorage.getItem('orders') || '[]';
          const arr = JSON.parse(raw);
          const localOrder = { id: `local-${Date.now()}`, ...formData, userId: user.uid, userEmail: user.email || formData.email, createdAt: new Date().toISOString(), total, subtotal, shipping, items, status: 'pending' };
          arr.unshift(localOrder);
          localStorage.setItem('orders', JSON.stringify(arr));
          orderRef = { id: localOrder.id, local: true };
        } catch (err) { console.error('Failed to persist local order', err); }
      }

      if ((window as any).Razorpay) { openRazorpay(); }
      else {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = openRazorpay;
        script.onerror = () => { alert('Failed to load payment gateway.'); setLoading(false); };
        document.head.appendChild(script);
      }

      function openRazorpay() {
        const options = {
          key: 'rzp_test_RgRusv8kOZaquo', amount: Math.round((total || 128.0) * 100), currency: 'INR',
          name: 'Pardesi Naari', description: `Order Payment - ₹${(total || 128.0).toFixed(2)}`,
          handler: async function (response: any) {
            try {
              if (orderRef && !orderRef.local) {
                await updateDoc(doc(db, 'orders', orderRef.id), { status: 'paid', paymentId: response.razorpay_payment_id, paymentConfirmedAt: serverTimestamp() });
              } else if (orderRef && orderRef.local) {
                try { const raw = localStorage.getItem('orders') || '[]'; const arr = JSON.parse(raw); const idx = arr.findIndex((o: any) => o.id === orderRef.id); if (idx > -1) { arr[idx].status = 'paid'; arr[idx].paymentId = response.razorpay_payment_id; localStorage.setItem('orders', JSON.stringify(arr)); } } catch (e) {}
              }
              try { localStorage.removeItem('cart'); window.dispatchEvent(new CustomEvent('cartChanged', { detail: { items: [] } })); } catch (e) {}
              alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
              setFormData({ email: user?.email || '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '' });
              window.location.href = '/orders';
            } catch (err) { alert('Payment succeeded but failed to update order status.'); } finally { setLoading(false); }
          },
          modal: { ondismiss: function() { setLoading(false); } },
          prefill: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email || user?.email },
          theme: { color: '#B76E79' }
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

  const inputClass = "mt-1 block w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-[#B76E79] text-sm bg-white";

  if (!authChecked) {
    return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-[#B76E79]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <PageNav subtitle="Checkout" />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#4A2C3D]">Checkout</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full mx-auto mt-3"></div>
        </div>

        {!user ? (
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-[#F5C6D0]/30 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-[#FFF0F3] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-[#B76E79]" size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#4A2C3D] mb-4">Almost there!</h2>
            <p className="text-[#8B5E6B] mb-8">Please login or create an account to complete your purchase and track your orders.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <LogIn size={20} />
                LOGIN
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center justify-center gap-2 border-2 border-[#B76E79] text-[#B76E79] px-8 py-4 rounded-xl font-bold hover:bg-[#B76E79] hover:text-white transition-all"
              >
                <UserPlus size={20} />
                SIGN UP
              </Link>
            </div>
            <p className="mt-8 text-xs text-[#8B5E6B] italic">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md border border-[#F5C6D0]/20">
              <h2 className="text-xl font-bold text-[#4A2C3D] mb-6">Shipping Information</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4A2C3D]">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} disabled={!!user.email} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-[#4A2C3D]">First Name</label>
                    <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-[#4A2C3D]">Last Name</label>
                    <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#4A2C3D]">Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#4A2C3D]">City</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-[#4A2C3D]">State</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-[#4A2C3D]">Zip Code</label>
                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-[#F5C6D0]/20">
              <h2 className="text-xl font-bold text-[#4A2C3D] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-[#F5C6D0]/30 pb-4">
                {(Array.isArray(cartItems) ? cartItems : []).map((item: any) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-[#F5C6D0]/20" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#4A2C3D] line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-[#8B5E6B]">Qty: {item.quantity} {item.size && `| Size: ${item.size}`}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#4A2C3D]">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[#8B5E6B]">Subtotal</span><span className="font-medium text-[#4A2C3D]">₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-[#8B5E6B]">Shipping</span><span className="font-medium text-[#4A2C3D]">₹{shipping.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-[#F5C6D0]/30 pt-3">
                  <span className="text-lg font-bold text-[#4A2C3D]">Total</span>
                  <span className="text-lg font-bold text-[#4A2C3D]">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder} disabled={loading || cartItems.length === 0}
                className="w-full mt-8 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 text-sm">
                {loading ? 'Processing...' : 'Place Order'}
              </button>
              {cartItems.length === 0 && <p className="text-xs text-red-500 text-center mt-2">Your cart is empty</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

