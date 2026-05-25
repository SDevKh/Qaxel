import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts, Product, STATIC_PRODUCTS } from '../lib/products';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { 
  Lock, LayoutDashboard, PlusCircle, ListCollapse, ShoppingBag, 
  Trash2, Image, FileText, CheckCircle, TrendingUp, Plus, X, 
  ChevronDown, LogOut, Eye, DollarSign, Package, Users
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PRESETS = [
  { name: 'Pakistani Cream', url: '/img/pakistani (1).jpeg' },
  { name: 'Muslin Lawn', url: '/img/muslin lawn (2).jpeg' },
  { name: 'Ombre Black', url: '/img/summerlawn (1).jpeg' },
  { name: 'Sea Blue', url: '/img/seablue (4).jpeg' },
  { name: 'Lime Green', url: '/img/lime (3).jpeg' },
  { name: 'English Pink', url: '/img/english (5).jpeg' },
  { name: 'Cambric Cotton', url: '/img/cotton (3).jpeg' },
  { name: 'Straight Kurta', url: '/img/straight (5).jpeg' },
  { name: 'Brush Painted Cord', url: '/img/vnech (2).jpeg' }
];

export const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading, addProduct, deleteProduct } = useProducts();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'add' | 'orders'>('dashboard');

  // Dashboard Stats
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });

  // Selected Order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Form states for adding product
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('pakistani-suits');
  const [imageType, setImageType] = useState<'url' | 'upload' | 'preset'>('preset');
  const [imageUrl, setImageUrl] = useState('/img/pakistani (1).jpeg');
  const [uploadFile, setUploadFile] = useState<string>('');
  const [presetUrl, setPresetUrl] = useState('/img/pakistani (1).jpeg');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryInputUrl, setGalleryInputUrl] = useState('');
  
  const [selectedColors, setSelectedColors] = useState<string[]>(['']);
  const [newColor, setNewColor] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['Free Size']);
  const [badgeText, setBadgeText] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title]);

  // Load orders from Firestore
  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    setOrdersLoading(true);
    try {
      if (db && db.app) {
        const qRef = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(qRef);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(fetchedOrders);
        
        // Calculate stats
        const totalRev = fetchedOrders.reduce((sum, ord: any) => {
          if (ord.status === 'paid' || ord.status === 'completed') {
            return sum + (Number(ord.totalAmount) || 0);
          }
          return sum;
        }, 0);

        // Unique customers
        const customers = new Set(fetchedOrders.map((ord: any) => ord.email || ord.userId));

        setStats({
          totalProducts: products.length,
          totalOrders: fetchedOrders.length,
          totalRevenue: totalRev,
          totalCustomers: customers.size
        });
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, products.length]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'PardesiAdmin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      toast({ title: 'Access Granted', description: 'Welcome to the Pardesi Naari Admin Portal.' });
    } else {
      setPasscodeError('Incorrect passcode. Please try again.');
      toast({ variant: 'destructive', title: 'Access Denied', description: 'Invalid administration passcode.' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  };

  // Convert uploaded image to Base64
  const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addGalleryImage = () => {
    if (galleryInputUrl.trim()) {
      setGalleryImages(prev => [...prev, galleryInputUrl.trim()]);
      setGalleryInputUrl('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== idx));
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(prev => prev.filter(s => s !== size));
    } else {
      setSelectedSizes(prev => [...prev, size]);
    }
  };

  const addColor = () => {
    if (newColor.trim() && !selectedColors.includes(newColor.trim())) {
      setSelectedColors(prev => prev[0] === '' ? [newColor.trim()] : [...prev, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (color: string) => {
    setSelectedColors(prev => {
      const filtered = prev.filter(c => c !== color);
      return filtered.length === 0 ? [''] : filtered;
    });
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Title and Price are required.' });
      return;
    }

    let mainImage = '';
    if (imageType === 'preset') mainImage = presetUrl;
    else if (imageType === 'url') mainImage = imageUrl;
    else mainImage = uploadFile || '/img/placeholder.png';

    const cleanSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProd = {
      title,
      slug: cleanSlug,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description: description || title,
      details: details || '',
      image: mainImage,
      mainImage: mainImage,
      galleryImages: galleryImages.length > 0 ? [mainImage, ...galleryImages] : [mainImage],
      size: selectedSizes,
      colors: selectedColors,
      reviewIds: [],
      badges: badgeText ? [badgeText] : []
    };

    try {
      await addProduct(newProd);
      toast({ title: 'Product Added Successfully!', description: `"${title}" has been listed.` });
      
      // Reset form
      setTitle('');
      setSlug('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
      setDetails('');
      setUploadFile('');
      setGalleryImages([]);
      setSelectedSizes(['Free Size']);
      setSelectedColors(['']);
      setBadgeText('');
      
      // Navigate to products list
      setActiveTab('products');
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error Posting Product', description: 'Something went wrong.' });
    }
  };

  const handleDeleteProduct = async (id: string | number, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store?`)) {
      try {
        await deleteProduct(id);
        toast({ title: 'Product Removed', description: `"${name}" has been deleted.` });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Error deleting product', description: 'Could not remove product.' });
      }
    }
  };

  // Auth gate render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A2C3D] via-[#351E2B] to-[#25121E] flex flex-col justify-center items-center px-4">
        <Link to="/" className="flex flex-col items-center mb-8">
          <span className="text-4xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#F5C6D0] mt-1 font-medium italic">Administration</span>
        </Link>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#B76E79]/20 flex items-center justify-center text-[#B76E79] mb-3">
              <Lock size={28} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif text-white font-bold">Admin Portal Lock</h2>
            <p className="text-white/60 text-xs mt-1 text-center">Please input your secure credentials to enter the administrative panel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Security Passcode</label>
              <input 
                type="password"
                required
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(''); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#B76E79] focus:border-transparent text-sm transition-all text-center tracking-widest font-bold"
              />
              {passcodeError && <p className="text-red-400 text-xs mt-2 text-center font-medium">{passcodeError}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:shadow-[#B76E79]/25 hover:shadow-lg hover:scale-[1.02] text-white py-3.5 rounded-xl font-bold transition-all text-sm mt-2"
            >
              UNLOCK PORTAL
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-white/40 hover:text-white text-xs hover:underline">← Return to Storefront</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col md:flex-row">
      {/* Side bar navigation */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-[#4A2C3D] to-[#351E2B] text-white flex flex-col border-r border-[#F5C6D0]/10">
        <div className="p-6 border-b border-[#F5C6D0]/10 flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A574] bg-clip-text text-transparent">Pardesi Naari</span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#F5C6D0] -mt-0.5">Admin Dashboard</span>
          </Link>
          <button onClick={handleLogout} className="md:hidden text-[#F5C6D0] hover:text-white" title="Logout">
            <LogOut size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-[#B76E79] text-white shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            Overview Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-[#B76E79] text-white shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <ListCollapse size={18} />
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'add' ? 'bg-[#B76E79] text-white shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <PlusCircle size={18} />
            Add New Product
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-[#B76E79] text-white shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <ShoppingBag size={18} />
            Orders Tracker
            {orders.filter(o => o.status === 'paid').length > 0 && (
              <span className="ml-auto bg-[#D4A574] text-[#4A2C3D] font-bold text-[10px] px-2 py-0.5 rounded-full">
                {orders.filter(o => o.status === 'paid').length}
              </span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-[#F5C6D0]/10 hidden md:block">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#F5C6D0] hover:bg-white/5 hover:text-white transition-all font-medium"
          >
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main content pane */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-[#F5C6D0]/20 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#B76E79] uppercase tracking-widest">Portal Panel</span>
            <h1 className="text-3xl font-serif text-[#4A2C3D] font-bold">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Directory'}
              {activeTab === 'add' && 'Create Product Listing'}
              {activeTab === 'orders' && 'Order Transactions'}
            </h1>
          </div>
          <Link to="/" className="text-xs font-bold text-[#B76E79] hover:underline flex items-center gap-1 bg-white border border-[#F5C6D0]/40 px-4 py-2 rounded-xl shadow-sm transition-all hover:shadow-md">
            Go to Storefront →
          </Link>
        </header>

        {/* Dynamic tab contents */}

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#B76E79]">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#8B5E6B] uppercase tracking-wide">Paid Revenue</p>
                  <h3 className="text-2xl font-serif font-bold text-[#4A2C3D] mt-0.5">Rs. {stats.totalRevenue.toLocaleString()}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFF5EE] flex items-center justify-center text-[#D4A574]">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#8B5E6B] uppercase tracking-wide">Total Orders</p>
                  <h3 className="text-2xl font-serif font-bold text-[#4A2C3D] mt-0.5">{stats.totalOrders}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFF8F5] flex items-center justify-center text-teal-600">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#8B5E6B] uppercase tracking-wide">Store Products</p>
                  <h3 className="text-2xl font-serif font-bold text-[#4A2C3D] mt-0.5">{stats.totalProducts}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#8B5E6B] uppercase tracking-wide">Customers</p>
                  <h3 className="text-2xl font-serif font-bold text-[#4A2C3D] mt-0.5">{stats.totalCustomers}</h3>
                </div>
              </div>
            </div>

            {/* Quick Actions and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Recent Orders List */}
              <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-lg font-bold text-[#4A2C3D]">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#B76E79] hover:underline font-bold">View all</button>
                </div>

                {ordersLoading ? (
                  <p className="text-center text-sm py-8 text-[#8B5E6B]">Querying orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-center text-sm py-8 text-[#8B5E6B]">No sales transactions logged yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#F5C6D0]/20 text-[#8B5E6B] font-semibold">
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => setSelectedOrder(ord)}>
                            <td className="py-3 font-medium text-[#4A2C3D]">
                              <div>{ord.name || 'Anonymous Client'}</div>
                              <div className="text-[10px] text-gray-400">{ord.email}</div>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${ord.status === 'paid' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                {ord.status?.toUpperCase() || 'PENDING'}
                              </span>
                            </td>
                            <td className="py-3 text-gray-500">
                              {ord.createdAt?.toDate ? ord.createdAt.toDate().toLocaleDateString() : new Date(ord.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-right font-bold text-[#4A2C3D]">Rs. {ord.totalAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right: Quick shortcuts */}
              <div className="space-y-6">
                <div className="bg-[#FFF0F3] p-6 rounded-2xl border border-[#F5C6D0]/40">
                  <h3 className="font-serif text-lg font-bold text-[#4A2C3D] mb-2">Need a quick listing?</h3>
                  <p className="text-xs text-[#8B5E6B] leading-relaxed mb-5">Quickly publish new traditional apparel categories, add high-quality products, configure prices, size selections, and more.</p>
                  <button 
                    onClick={() => setActiveTab('add')} 
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
                  >
                    <PlusCircle size={16} />
                    ADD PRODUCT
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/20 shadow-sm">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-[#B76E79] mb-4">Quick Stats Info</h3>
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs text-[#8B5E6B]">
                      <span>Average Order Value:</span>
                      <span className="font-bold text-[#4A2C3D]">
                        Rs. {stats.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#8B5E6B]">
                      <span>System Products:</span>
                      <span className="font-bold text-[#4A2C3D]">{STATIC_PRODUCTS.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#8B5E6B]">
                      <span>Custom Products:</span>
                      <span className="font-bold text-[#4A2C3D]">{products.length - STATIC_PRODUCTS.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MANAGE PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm animate-fade-in">
            {productsLoading ? (
              <p className="text-center py-8 text-[#8B5E6B]">Loading product catalog...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-8 text-[#8B5E6B]">No products found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F5C6D0]/30 text-[#8B5E6B] font-semibold">
                      <th className="pb-3 pl-2">Product Details</th>
                      <th className="pb-3">Slug</th>
                      <th className="pb-3 text-right">Price</th>
                      <th className="pb-3 text-center">Category</th>
                      <th className="pb-3 text-center">Origin</th>
                      <th className="pb-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((prod) => {
                      const isStatic = typeof prod.id === 'number';
                      return (
                        <tr key={prod.id} className="hover:bg-[#FFF8F5]/30">
                          <td className="py-4 pl-2 flex items-center gap-3">
                            <img src={prod.image} alt={prod.title} className="w-12 h-16 object-cover rounded-lg border border-[#F5C6D0]/20 bg-gray-50" />
                            <div className="max-w-xs">
                              <div className="font-bold text-[#4A2C3D] leading-snug line-clamp-2">{prod.title}</div>
                              {prod.badges && prod.badges.length > 0 && prod.badges[0] !== '' && (
                                <span className="inline-block bg-[#FFF0F3] text-[#B76E79] font-bold text-[9px] px-2 py-0.5 rounded-full mt-1 border border-[#F5C6D0]/40">
                                  {prod.badges[0]}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-xs font-mono text-gray-500 max-w-[120px] truncate" title={prod.slug}>{prod.slug}</td>
                          <td className="py-4 text-right">
                            <div className="font-bold text-[#4A2C3D]">Rs. {prod.price}</div>
                            {prod.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">Rs. {prod.originalPrice}</div>
                            )}
                          </td>
                          <td className="py-4 text-center">
                            <span className="inline-block bg-[#FFF8F5] text-[#8B5E6B] text-xs px-2.5 py-1 rounded-full border border-[#F5C6D0]/30 capitalize">
                              {prod.slug.toLowerCase().includes('lawn') ? 'Lawn' : 'Salwar Kameez'}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isStatic ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                              {isStatic ? 'System' : 'Custom'}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <Link to={`/product/${prod.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-[#B76E79] transition-colors" title="View in store">
                                <Eye size={16} />
                              </Link>
                              {!isStatic ? (
                                <button 
                                  onClick={() => handleDeleteProduct(prod.id, prod.title)} 
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  title="Delete product"
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <button 
                                  disabled
                                  className="p-2 text-gray-200 cursor-not-allowed"
                                  title="System product cannot be deleted"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3. ADD PRODUCT TAB */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddProductSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-[#F5C6D0]/30 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Details */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Product Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Premium Organza Embroidered Dupatta Suit"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Selling Price (Rs.) *</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="1899"
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Original Price (Rs.)</label>
                    <input 
                      type="number" 
                      placeholder="2999"
                      value={originalPrice} 
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Slug URL *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="premium-organza-embroidered-suit"
                      value={slug} 
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                      className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Category *</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                    >
                      <option value="pakistani-suits">Pakistani Suits</option>
                      <option value="daily-wear">Daily Wear</option>
                      <option value="cotton">Cotton Collection</option>
                      <option value="anarkali">Anarkali Collection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Short Description *</label>
                  <textarea 
                    rows={2} 
                    placeholder="A brief overview of the dress item, highlighted in summary text..."
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Product Specifications / Full Details</label>
                  <textarea 
                    rows={6} 
                    placeholder="Provide full details:
Top Fabric: Muslin Lawn (With heavy embroidery)
Bottom: Dyed Cotton Pants (2.5 Meters)
Dupatta: Digital Chiffon Print
Wash: Dry Clean Only"
                    value={details} 
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm font-sans"
                  />
                </div>
              </div>

              {/* Right Column: Images, Sizes, Colors */}
              <div className="space-y-6">
                {/* Images select */}
                <div className="bg-[#FFF8F5] p-5 rounded-2xl border border-[#F5C6D0]/40">
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-3">Product Main Image *</label>
                  
                  <div className="flex gap-4 mb-4">
                    <button type="button" onClick={() => setImageType('preset')} className={`flex-1 py-2 text-xs font-bold border rounded-xl transition-all ${imageType === 'preset' ? 'bg-[#B76E79] text-white border-[#B76E79]' : 'bg-white text-[#8B5E6B] border-[#F5C6D0]/40 hover:bg-[#FFF0F3]'}`}>Preset Gallery</button>
                    <button type="button" onClick={() => setImageType('url')} className={`flex-1 py-2 text-xs font-bold border rounded-xl transition-all ${imageType === 'url' ? 'bg-[#B76E79] text-white border-[#B76E79]' : 'bg-white text-[#8B5E6B] border-[#F5C6D0]/40 hover:bg-[#FFF0F3]'}`}>Image URL</button>
                    <button type="button" onClick={() => setImageType('upload')} className={`flex-1 py-2 text-xs font-bold border rounded-xl transition-all ${imageType === 'upload' ? 'bg-[#B76E79] text-white border-[#B76E79]' : 'bg-white text-[#8B5E6B] border-[#F5C6D0]/40 hover:bg-[#FFF0F3]'}`}>File Upload</button>
                  </div>

                  {imageType === 'preset' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        {PRESETS.map((p, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            onClick={() => setPresetUrl(p.url)}
                            className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${presetUrl === p.url ? 'border-[#B76E79] ring-2 ring-[#B76E79]/20' : 'border-transparent hover:border-[#F5C6D0]'}`}
                          >
                            <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] py-0.5 text-center truncate">{p.name}</div>
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-[#8B5E6B] font-medium text-center">Selected Template: <span className="font-bold text-[#4A2C3D]">{presetUrl}</span></div>
                    </div>
                  )}

                  {imageType === 'url' && (
                    <div>
                      <input 
                        type="url" 
                        placeholder="https://example.com/beautiful-dress.jpg"
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm bg-white"
                      />
                      <div className="mt-4 flex justify-center">
                        <img 
                          src={imageUrl || '/img/placeholder.png'} 
                          alt="URL Preview" 
                          onError={(e) => { (e.target as HTMLImageElement).src = '/img/placeholder.png'; }}
                          className="w-32 h-40 object-cover rounded-xl border border-[#F5C6D0]/40 bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {imageType === 'upload' && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-[#F5C6D0] rounded-xl p-4 text-center cursor-pointer hover:bg-white transition-all bg-white relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUploadChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Image size={24} className="mx-auto text-[#B76E79] mb-1" />
                        <span className="text-xs font-bold text-[#4A2C3D] block">Choose a file to upload</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Supports PNG, JPG, JPEG</span>
                      </div>
                      {uploadFile && (
                        <div className="flex justify-center">
                          <img src={uploadFile} alt="Upload preview" className="w-32 h-40 object-cover rounded-xl border border-[#F5C6D0]/40" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Gallery Images (Multiple Photos) */}
                <div className="bg-[#FFF8F5] p-5 rounded-2xl border border-[#F5C6D0]/40">
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-3">Product Gallery Photos (Multiple)</label>
                  
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="Paste additional image URL"
                      value={galleryInputUrl} 
                      onChange={(e) => setGalleryInputUrl(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm bg-white"
                    />
                    <button 
                      type="button" 
                      onClick={addGalleryImage}
                      className="bg-[#B76E79] hover:bg-[#A25D68] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Plus size={16} /> Add URL
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-[#F5C6D0]/50 rounded-xl p-4 text-center cursor-pointer hover:bg-white transition-all bg-white relative mb-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setGalleryImages(prev => [...prev, reader.result as string]);
                          };
                          reader.readAsDataURL(file);
                        });
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Image size={20} className="mx-auto text-[#B76E79] mb-1" />
                    <span className="text-xs font-bold text-[#4A2C3D] block">Upload gallery photos</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Select one or multiple photos to upload</span>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-[#8B5E6B] mb-2">Gallery Preview ({galleryImages.length} photos):</div>
                      <div className="grid grid-cols-4 gap-2">
                        {galleryImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#F5C6D0]/40 group">
                            <img src={img} alt={`Gallery Preview ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Promo Badge</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Best Seller, New, 50% OFF"
                      value={badgeText} 
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Color Swatch (Hex or name)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="#ffffff, Black, Pink"
                        value={newColor} 
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-full px-4 py-3 border border-[#F5C6D0]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79] text-sm"
                      />
                      <button 
                        type="button" 
                        onClick={addColor}
                        className="bg-[#B76E79] text-white p-3 rounded-xl hover:bg-[#A25D68] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {/* Render color tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedColors.filter(c => c !== '').map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 bg-[#FFF0F3] border border-[#F5C6D0]/40 text-xs px-2.5 py-1 rounded-full text-[#4A2C3D] font-medium">
                          <span className="w-2.5 h-2.5 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
                          {c}
                          <button type="button" onClick={() => removeColor(c)} className="text-gray-400 hover:text-red-500">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Size Swatches */}
                <div>
                  <label className="block text-xs font-bold text-[#4A2C3D] uppercase tracking-wider mb-2">Available Sizes *</label>
                  <div className="flex flex-wrap gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL', '3XL', 'Free Size'].map((sz) => {
                      const isSelected = selectedSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => toggleSize(sz)}
                          className={`px-4 py-2 border-2 rounded-xl text-xs font-bold transition-all ${isSelected ? 'border-[#B76E79] bg-[#FFF0F3] text-[#B76E79]' : 'border-gray-200 text-[#4A2C3D] hover:border-[#F5C6D0]'}`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F5C6D0]/20 pt-6 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setActiveTab('products')} 
                className="px-6 py-3 border border-[#F5C6D0] text-[#8B5E6B] font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                CANCEL
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:shadow-lg hover:scale-[1.01] text-white font-bold rounded-xl text-sm transition-all"
              >
                PUBLISH PRODUCT LISTING
              </button>
            </div>
          </form>
        )}

        {/* 4. ORDERS TRACKER TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-[#F5C6D0]/30 shadow-sm animate-fade-in">
            {ordersLoading ? (
              <p className="text-center py-8 text-[#8B5E6B]">Querying sales invoices...</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-8 text-[#8B5E6B]">No transactions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F5C6D0]/30 text-[#8B5E6B] font-semibold">
                      <th className="pb-3 pl-2">Order Transaction</th>
                      <th className="pb-3">Customer Details</th>
                      <th className="pb-3">Transaction Date</th>
                      <th className="pb-3 text-right">Paid Amount</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FFF8F5]/30">
                        <td className="py-4 pl-2 font-mono font-bold text-gray-500 max-w-[120px] truncate" title={ord.id}>{ord.id}</td>
                        <td className="py-4">
                          <div className="font-bold text-[#4A2C3D]">{ord.name || 'Anonymous Client'}</div>
                          <div className="text-[10px] text-gray-400">{ord.email} | {ord.phone || 'No phone'}</div>
                        </td>
                        <td className="py-4 text-[#8B5E6B]">
                          {ord.createdAt?.toDate ? ord.createdAt.toDate().toLocaleString() : new Date(ord.createdAt).toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-bold text-[#4A2C3D]">Rs. {ord.totalAmount}</td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${ord.status === 'paid' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {ord.status?.toUpperCase() || 'PENDING'}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => setSelectedOrder(ord)} 
                            className="text-[#B76E79] hover:underline font-bold text-xs bg-[#FFF0F3] border border-[#F5C6D0]/40 px-3 py-1 rounded-full"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 5. ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#F5C6D0]/30 animate-scale-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#4A2C3D] to-[#6B3A5A] p-6 text-white flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#F5C6D0] uppercase font-bold tracking-widest">Transaction Details</span>
                <h3 className="font-serif text-xl font-bold mt-1">Invoice: #{selectedOrder.id}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#F5C6D0] hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Customer and Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FFF8F5] p-5 rounded-2xl border border-[#F5C6D0]/20">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[#B76E79] mb-2.5">Customer details</h4>
                  <div className="space-y-1 text-sm text-[#4A2C3D]">
                    <div className="font-bold">{selectedOrder.name || 'Anonymous client'}</div>
                    <div className="text-xs text-gray-500">{selectedOrder.email}</div>
                    <div className="text-xs text-gray-500">Phone: {selectedOrder.phone || 'Not available'}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[#B76E79] mb-2.5">Shipping address</h4>
                  <div className="text-sm text-[#4A2C3D] leading-relaxed">
                    {selectedOrder.shippingAddress?.addressLine || selectedOrder.addressStreet || 'N/A'}<br />
                    {selectedOrder.shippingAddress?.city || selectedOrder.addressCity || ''}, {selectedOrder.shippingAddress?.state || ''}<br />
                    {selectedOrder.shippingAddress?.postalCode || selectedOrder.addressPostalCode || ''} {selectedOrder.shippingAddress?.country || selectedOrder.addressCountry || ''}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#B76E79] mb-3">Purchased Items</h4>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="p-4 flex gap-4 items-center">
                      <img src={item.image || '/img/placeholder.png'} alt={item.name} className="w-12 h-16 object-cover rounded-lg border border-[#F5C6D0]/20 bg-gray-50" />
                      <div className="flex-1">
                        <div className="font-bold text-sm text-[#4A2C3D] line-clamp-1">{item.name || item.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Size: <span className="font-bold text-[#B76E79]">{item.size || 'Free'}</span>
                          {item.color && (
                            <span className="ml-3">
                              Color: <span className="inline-block w-2 h-2 rounded-full border border-gray-200 mr-1" style={{ backgroundColor: item.color }} />
                              {item.color}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-[#4A2C3D]">Rs. {item.price}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-t border-[#F5C6D0]/20 pt-5 flex justify-between items-center text-sm">
                <div>
                  <div className="text-xs text-gray-400">Payment ID</div>
                  <div className="font-mono font-medium text-[#4A2C3D] mt-0.5">{selectedOrder.paymentId || 'N/A (Cash on Delivery or Pending)'}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 font-medium">Grand Total Paid</div>
                  <div className="text-xl font-serif font-bold text-[#B76E79] mt-0.5">Rs. {selectedOrder.totalAmount}</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-100">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-bold rounded-xl text-sm shadow hover:shadow-md transition-all"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
