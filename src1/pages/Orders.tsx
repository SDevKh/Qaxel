import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

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
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data: Order[] = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        try {
          const raw = localStorage.getItem('orders') || '[]';
          const local: Order[] = JSON.parse(raw).filter((o: any) => (o.userId === user.uid || o.userId === 'anonymous'));
          const normalizedLocal = local.map((o: any) => ({ id: o.id ?? `local-${Date.parse(o.createdAt || Date.now())}`, ...o }));
          setOrders([...normalizedLocal, ...data]);
        } catch (e) { setOrders(data); }
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-[#B76E79]">Loading orders…</div>;
  if (error) return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Orders" />
      
      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-[#4A2C3D] mb-8">My Orders</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#F5C6D0]/30 text-center">
              <p className="text-[#8B5E6B] mb-6">You have no orders yet.</p>
              <Link to="/" className="inline-block px-6 py-3 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white rounded-xl font-medium hover:shadow-lg transition-all">Start shopping</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#F5C6D0]/30">
                  <div className="flex justify-between items-start border-b border-[#F5C6D0]/30 pb-4 mb-4">
                    <div>
                      <div className="font-bold text-[#4A2C3D]">Order #{order.id}</div>
                      <div className="text-sm text-[#8B5E6B] mt-1">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : String(order.createdAt)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-[#4A2C3D]">₹{order.total ?? '—'}</div>
                      <span className="text-xs font-medium px-2.5 py-1 bg-[#FFF0F3] text-[#B76E79] rounded-full mt-2 inline-block capitalize">{order.status || 'Pending'}</span>
                    </div>
                  </div>
                  
                  {order.items && (
                    <ul className="space-y-3">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-[#4A2C3D] font-medium">{it.name || it.title} <span className="text-[#8B5E6B] ml-2">x{it.quantity}</span></span>
                          <span className="text-[#8B5E6B] font-medium">₹{it.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
