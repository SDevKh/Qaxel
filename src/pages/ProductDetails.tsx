// ...existing code...
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { PRODUCTS } from '../components/AppLayout';
import ReviewsSection from '../components/ReviewsSection';

// local StarIcon (replaces @heroicons dependency)
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.947 2.676c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z"/>
  </svg>
);

interface ProductImage {
  src: string;
  alt: string;
}

interface SupplementFact {
  label: string;
  value: string;
}

interface ProductIngredient {
  name: string;
  details: string;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  details: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountPercentage?: number;
  currency: string;
  mainImage: string;
  galleryImages: ProductImage[];
  supplementFacts: SupplementFact[];
  badges: string[];
  features: string[];
  ingredientsList: ProductIngredient[];
  flavors: { id: string; name: string; icon: string; selected: boolean }[];
  colors?: string[];
}

const PRODUCT_DATA: Product = {
  id: '1',
  name: 'Product',
  tagline: '',
  description: '',
  details: '',
  rating: 0,
  reviewsCount: 0,
  price: 0,
  currency: 'Rs.',
  mainImage: '/img/placeholder.png',
  galleryImages: [],
  supplementFacts: [],
  badges: [],
  features: [],
  ingredientsList: [],
  flavors: [{ id: 'default', name: 'Default', icon: '🍓', selected: true }],
};

const RatingStars: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center">
    {[0, 1, 2, 3, 4].map((star) => (
      <StarIcon
        key={star}
        className={`${rating > star ? 'text-yellow-400' : 'text-gray-200'} h-5 w-5 flex-shrink-0`}
        aria-hidden="true"
      />
    ))}
    <p className="sr-only">{rating} out of 5 stars</p>
    <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
      {reviewCount} Reviews
    </a>
  </div>
);

const FeatureBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center p-2 text-center">
    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xs">
      {label.charAt(0)}
    </div>
    <span className="mt-1 text-xs text-gray-600 whitespace-nowrap">{label}</span>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sid: string) => {
    const el = document.getElementById(sid);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const navProduct = (location.state as any)?.product ?? null;
      if (navProduct) {
        const galleryNorm = Array.isArray(navProduct.galleryImages)
          ? navProduct.galleryImages.map((g: any) =>
              typeof g === 'string'
                ? { src: g, alt: navProduct.title ?? navProduct.name ?? 'Product' }
                : { src: g.src ?? g, alt: g.alt ?? (navProduct.title ?? navProduct.name ?? 'Product') }
            )
          : (navProduct.image ? [{ src: navProduct.image, alt: navProduct.title ?? navProduct.name ?? 'Product' }] : []);

        const normalized = {
          id: String(navProduct.id ?? navProduct._id ?? navProduct.productId ?? '1'),
          name: navProduct.title ?? navProduct.name ?? '',
          tagline: navProduct.tagline ?? '',
          description: navProduct.description ?? navProduct.tagline ?? '',
          details: navProduct.details ?? '',
          rating: navProduct.rating ?? 0,
          reviewsCount: navProduct.reviewsCount ?? 0,
          price: navProduct.price ?? 0,
          currency: navProduct.currency ?? 'Rs.',
          mainImage: navProduct.mainImage ?? navProduct.image ?? (galleryNorm[0]?.src ?? '/img/placeholder.png'),
          galleryImages: galleryNorm,
          supplementFacts: navProduct.supplementFacts ?? [],
          badges: navProduct.badges ?? [],
          features: navProduct.features ?? [],
          ingredientsList: navProduct.ingredientsList ?? [],
          colors: navProduct.colors ?? [],
          flavors: navProduct.flavors ?? [{ id: 'default', name: 'Default', icon: '🍓', selected: true }],
        } as Product;
        setProduct(normalized);
        setSelectedImage(normalized.mainImage ?? normalized.galleryImages[0]?.src ?? '/img/placeholder.png');
        setSelectedFlavor(normalized.flavors.find((f) => f.selected)?.id ?? normalized.flavors[0].id);
        setSelectedColor(normalized.colors?.[0] ?? '');
        setLoading(false);
        return;
      }

      if (id) {
        const found = (PRODUCTS as any[]).find(p => String(p.id) === String(id));
        if (found) {
          const galleryNorm = Array.isArray(found.galleryImages)
            ? found.galleryImages.map((g: any) =>
                typeof g === 'string'
                  ? { src: g, alt: found.title ?? found.name ?? 'Product' }
                  : { src: g.src ?? g, alt: g.alt ?? (found.title ?? found.name ?? 'Product') }
              )
            : (found.image ? [{ src: found.image, alt: found.title ?? found.name ?? 'Product' }] : []);

          const normalized = {
            id: String(found.id),
            name: found.title ?? found.name ?? 'Product',
            tagline: found.tagline ?? found.description ?? '',
            description: found.description ?? found.tagline ?? '',
            rating: found.rating ?? 0,
            reviewsCount: found.reviewsCount ?? 0,
            price: found.price ?? 0,
            currency: found.currency ?? 'Rs.',
            mainImage: found.mainImage ?? found.image ?? (galleryNorm[0]?.src ?? '/img/placeholder.png'),
            galleryImages: galleryNorm,
            supplementFacts: found.supplementFacts ?? [],
            badges: found.badges ?? [],
            features: found.features ?? [],
            ingredientsList: found.ingredientsList ?? [],
            colors: found.colors ?? [],
            flavors: found.flavors ?? [{ id: 'default', name: 'Default', icon: '🍓', selected: true }],
          } as Product;
          setProduct(normalized);
          setSelectedImage(normalized.mainImage ?? normalized.galleryImages[0]?.src ?? '/img/placeholder.png');
          setSelectedFlavor(normalized.flavors[0].id);
          setSelectedColor(normalized.colors?.[0] ?? '');
          setLoading(false);
          return;
        }
      }

      // final fallback
      setProduct(PRODUCT_DATA);
      setSelectedImage(PRODUCT_DATA.mainImage);
      setSelectedFlavor(PRODUCT_DATA.flavors[0].id);
      setLoading(false);
    };

    fetchProduct();
  }, [id, location]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage ?? product.galleryImages?.[0]?.src ?? '/img/placeholder.png');
      setSelectedFlavor(product.flavors?.find(f => f.selected)?.id ?? product.flavors?.[0]?.id ?? 'default');
      setSelectedColor(product.colors?.[0] ?? '');
    }
  }, [product]);

  const scrollThumbs = (delta: number) => {
    if (!thumbsRef.current) return;
    thumbsRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const scrollToThumbIndex = (index: number) => {
    if (!thumbsRef.current) return;
    const container = thumbsRef.current;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    // center the child in the scroll container
    const left = child.offsetLeft - (container.clientWidth / 2) + (child.clientWidth / 2);
    container.scrollTo({ left, behavior: 'smooth' });
  };

  const mobilePrevImage = () => {
    if (!product) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    const prev = idx > 0 ? idx - 1 : gallery.length - 1;
    const target = gallery[prev];
    setSelectedImage(target);
    // ensure the thumbnail for the selected image is visible/centered on mobile
    scrollToThumbIndex(prev);
  };

  const mobileNextImage = () => {
    if (!product) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    const next = idx < gallery.length - 1 ? idx + 1 : 0;
    const target = gallery[next];
    setSelectedImage(target);
    // ensure the thumbnail for the selected image is visible/centered on mobile
    scrollToThumbIndex(next);
  };

  // When selectedImage changes (e.g. user taps a thumbnail), make sure the
  // corresponding thumbnail is visible and centered in the mobile strip.
  useEffect(() => {
    if (!product || !selectedImage) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    if (idx >= 0) {
      scrollToThumbIndex(idx);
    }
  }, [selectedImage, product]);

  if (loading) return <div className="text-center py-10">Loading product details...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found.</div>;

  const effectivePrice = Number(product.price ?? 0);
 

  const handleBack = () => navigate(-1);

  const onAddToCart = () => {
    try {
      const cartKey = 'cart';
      const raw = localStorage.getItem(cartKey) || '[]';
      const items: any[] = JSON.parse(raw);
      const existing = items.find(i => String(i.id) === String(product.id) && i.color === selectedColor);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          quantity: 1,
          image: product.mainImage,

          color: selectedColor,
        });
      }
      localStorage.setItem(cartKey, JSON.stringify(items));
      // notify other parts of the app (AppLayout) about cart change
      try {
        window.dispatchEvent(new CustomEvent('cartChanged', { detail: { items } }));
      } catch (e) {
        // ignore if dispatching fails in some environments
      }
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (err) {
      console.error('Failed to add to cart', err);
      toast({ title: 'Error', description: 'Could not add item to cart.' });
    }
  };

  return (
    <>
      <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40 w-full">
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:underline font-semibold">
              <img src="/img/logo.png" alt="Logo" className="h-12" />
            </Link>
            <h1 className="text-xl font-bold md:block hidden">Missing Piece of your closet</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="md:flex gap-6">
              <Link to="/" className="hover:underline font-semibold">Home</Link>
            </div>

            <button
              onClick={() => navigate('/?openCart=1')}
              className="relative hover:opacity-70"
              aria-label="Open cart"
              title="Open cart"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </button>

            <button
              className="md:hidden border-2 border-black px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      <div className="container mx-auto p-4 lg:p-8 font-sans overflow-hidden">
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-lg bg-gray-100 rounded-lg overflow-hidden shadow-lg p-4">
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover" />
            </div>

            <div className="mt-4">
              {/* Desktop / large: center thumbnails */}
              <div className="hidden md:flex justify-center gap-2">
                {(product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [{ src: product.mainImage, alt: product.name }]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img.src)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === img.src ? 'border-green-500' : 'border-transparent'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Mobile: scrollable thumbnails with prev/next buttons */}
              <div className="flex items-center md:hidden gap-2 justify-center w-full">
                <button aria-label="previous images" onClick={() => mobilePrevImage()} className="p-2 bg-white rounded-full shadow flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M12 4L6 10l6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div ref={thumbsRef} className="flex-1 max-w-lg flex gap-2 overflow-x-auto py-1 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {(product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [{ src: product.mainImage, alt: product.name }]).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img.src)}
                      className={`min-w-[80px] w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${selectedImage === img.src ? 'border-green-500' : 'border-transparent'}`}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <button aria-label="next images" onClick={() => mobileNextImage()} className="p-2 bg-white rounded-full shadow flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M8 4l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-lg">
              {product.badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 rounded-full border-2 border-green-500 text-center bg-green-50 text-green-700 font-medium">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-8">
            <button onClick={handleBack} className="text-sm text-blue-600 hover:underline mb-2">← Back</button>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <RatingStars rating={product.rating} reviewCount={product.reviewsCount} />
            <p className="mt-4 text-lg text-gray-700">{product.tagline}</p>
            <p className="mt-2 text-gray-600">{product.description}</p>

            <div className="flex gap-4 mt-6">
              {product.features.map((feature, index) => (
                <FeatureBadge key={index} label={feature} />
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <details className="group" open={Boolean(product.description && product.description.trim()) || Boolean(product.ingredientsList && product.ingredientsList.length > 0)}>
                <summary className="flex justify-between items-center cursor-pointer text-xl font-bold text-gray-900">
                  Description
                  <span className="group-open:hidden">+</span>
                  <span className="group-open:block hidden">-</span>
                </summary>
                <div className="mt-4 text-gray-700">
                  {product.details && (
                    <p className="mt-2 text-sm">{product.details}</p>
                  )}

                  {/* Then show detailed ingredients list, if present */}
                  {product.ingredientsList && product.ingredientsList.length > 0 && (
                    <div className="mt-3">
                      {product.ingredientsList.map((ing, index) => (
                        <p key={index} className="mt-2 text-sm">
                          <span className="font-semibold">{ing.name}:</span> {ing.details}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* If neither description nor ingredients exist, show a helpful placeholder */}
                  {(!product.description || product.description === '') && (!product.ingredientsList || product.ingredientsList.length === 0) && (
                    <p className="mt-2 text-sm text-gray-500">No additional details available for this product.</p>
                  )}
                </div>
              </details>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Color:</h3>
                <div className="flex items-center gap-4">
                  {/* color swatches */}
                  {(product.colors && product.colors.length > 0) ? (
                    product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c)}
                        title={c}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === c ? 'ring-2 ring-green-400' : 'border-gray-300'}`}
                      >
                        <span className="sr-only">{c}</span>
                        <span aria-hidden="true" className="block w-full h-full rounded-full" style={{ backgroundColor: c }} />
                      </button>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No color options</div>
                  )}
                </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Size:</h3>
              <div className="flex gap-4">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor.id}
                    className={`flex items-center p-3 rounded-full border-2 transition-colors ${selectedFlavor === flavor.id ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => setSelectedFlavor(flavor.id)}
                  >
                    <span role="img" aria-label={flavor.name} className="text-2xl mr-2">{flavor.icon}</span>
                    <span className="text-sm font-medium">{flavor.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
                onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              >
                Add to Cart - {product.currency}
                {product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection productTitle={product.name} />
      <footer className="bg-green-900 text-white mt-12">
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Newsletter */}
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-4xl font-bold mb-4">Don't miss a thing!</h2>
            <p className="mb-6 text-lg max-w-xl">Get on the list for updates about exclusive offers, product launches, and more.</p>
            <div className="w-full max-w-md">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Enter your email"
                className="w-full rounded-full px-6 py-3 text-green-900 focus:outline-none mb-4" />
              <button className="w-full rounded-full bg-green-200 text-green-900 font-semibold px-6 py-3">Stay in Touch</button>
            </div>
          </div>

          {/* Right: Links + social */}
          <div className="flex flex-col lg:items-end">
            <div className="flex gap-4 mb-6">
              {/* simple inline social icons */}
              <a href="#" aria-label="Instagram" className="p-2 rounded bg-green-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-4-4V8a4 4 0 014-4h10a4 4 0 014 4v4a4 4 0 01-4 4H7z" /></svg></a>
              <a href="#" aria-label="TikTok" className="p-2 rounded bg-green-800"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8v8a4 4 0 104 4V8h-4z" /></svg></a>
              <a href="#" aria-label="Facebook" className="p-2 rounded bg-green-800"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1.5 2.9h-2.5v7A10 10 0 0022 12z"/></svg></a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded bg-green-800"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v16H4zM8 4h8v2H8zM14 10h4v10h-4z"/></svg></a>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-left lg:text-right">
              <div>
                <h3 className="text-lg font-semibold border-b border-green-700 pb-2 mb-2">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">New Arrivals</a></li>
                  <li><a href="#" className="hover:underline">Collections</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-green-700 pb-2 mb-2">Community</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Blog</a></li>
                  <li><a href="#" className="hover:underline">Events</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-green-700 pb-2 mb-2">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:underline">About</a></li>
                  <li><a href="/terms" className="hover:underline">Terms</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-green-700 pb-2 mb-2">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/return" className="hover:underline">Returns</a></li>
                  <li><a href="/faq" className="hover:underline">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 py-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-green-200">
              <p>Bloom Nu LLC</p>
              <p>2401E 6th Street, STE 3037–201</p>
              <p>Austin, Texas 78702</p>
              <p>bloomnu.com</p>
            </div>
            <div className="flex items-center gap-6">
              <img src="/img/logo-white.png" alt="Bloom" className="h-10" />
              <span className="text-sm text-green-200">Bloom Wellness Club</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductDetailPage;