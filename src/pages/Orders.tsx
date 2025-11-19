import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  createdAt?: any;
  total?: number;
  items?: Array<{ title: string; price: number; quantity: number }>;
  [key: string]: any;
}

const Orders: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate('/login');
        return;
      }
      setUser(u);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        const data: Order[] = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        // also merge any locally persisted orders (fallback)
        try {
          const raw = localStorage.getItem('orders') || '[]';
          const local: Order[] = JSON.parse(raw).filter((o: any) => (o.userId === user.uid || o.userId === 'anonymous'));
          // attach id if missing
          const normalizedLocal = local.map((o: any) => ({ id: o.id ?? `local-${Date.parse(o.createdAt || Date.now())}`, ...o }));
          setOrders([...normalizedLocal, ...data]);
        } catch (e) {
          setOrders(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // Dev helper: create a test order for the currently signed-in user.
  // Visible only when Vite's dev mode is active (import.meta.env.DEV).
  const createTestOrder = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const order = {
        userId: user.uid,
        createdAt: serverTimestamp(),
        total: 59.99,
        status: 'pending',
        items: [
          { title: 'Example Product', price: 59.99, quantity: 1 }
        ],
        shippingAddress: { line1: '123 Main St', city: 'City', postalCode: '12345', country: 'Country' },
        paymentMethod: 'card'
      } as any;

      await addDoc(collection(db, 'orders'), order);

      // refetch orders after creation
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const data: Order[] = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to create test order');
    } finally {
      setLoading(false);
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
    };

  if (loading) return <div className="p-8">Loading orders…</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

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
                  aria-label="Toggle menu">
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
 
    <div className="min-h-screen bg-[#F9FBC3] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="mb-4">You have no orders yet.</p>
            <Link to="/" className="text-blue-600 hover:underline">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Order #{order.id}</div>
                    <div className="text-sm text-gray-500">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : String(order.createdAt)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.total ?? '—'}</div>
                    <Link to={`/orders/${order.id}`} className="text-sm text-blue-600 hover:underline">View details</Link>
                  </div>
                </div>
                {order.items && (
                  <ul className="mt-3 text-sm">
                    {order.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{it.title} x{it.quantity}</span>
                        <span>₹{it.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
   </>
  );
};

export default Orders;
