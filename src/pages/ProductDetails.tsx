// ...existing code...
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { PRODUCTS } from '../components/AppLayout';
import ReviewsSection, { initialReviews } from '../components/ReviewsSection';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

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

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  details: string;
  rating: number;
  reviewsCount: number;
  price: number;
  currency: string;
  mainImage: string;
  galleryImages: ProductImage[];
  badges: string[];
  features: string[];
  sizes: string[];
  colors?: string[];
  reviewIds?: string[];
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
  badges: [],
  features: [],
  sizes: ['S', 'M', 'L', 'XL'],
};

const RatingStars: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center">
    {[0, 1, 2, 3, 4].map((star) => (
      <StarIcon
        key={star}
        className={`${rating > star ? 'text-[#D4A574]' : 'text-gray-200'} h-5 w-5 flex-shrink-0`}
        aria-hidden="true"
      />
    ))}
    <p className="sr-only">{rating} out of 5 stars</p>
    <span className="ml-3 text-sm font-medium text-[#B76E79]">
      {reviewCount} Reviews
    </span>
  </div>
);

const FeatureBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center p-2 text-center">
    <div className="h-10 w-10 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#B76E79] text-xs font-bold">
      {label.charAt(0)}
    </div>
    <span className="mt-1 text-xs text-[#8B5E6B] whitespace-nowrap">{label}</span>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
          badges: navProduct.badges ?? [],
          features: navProduct.features ?? [],
          colors: navProduct.colors ?? [],
          sizes: navProduct.size ?? navProduct.sizes ?? ['S', 'M', 'L', 'XL'],
          reviewIds: navProduct.reviewIds ?? [],
        } as Product;
        setProduct(normalized);
        setSelectedImage(normalized.mainImage ?? normalized.galleryImages[0]?.src ?? '/img/placeholder.png');
        setSelectedSize(normalized.sizes[0] ?? 'S');
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
            details: found.details ?? '',
            rating: found.rating ?? 0,
            reviewsCount: found.reviewsCount ?? 0,
            price: found.price ?? 0,
            currency: found.currency ?? 'Rs.',
            mainImage: found.mainImage ?? found.image ?? (galleryNorm[0]?.src ?? '/img/placeholder.png'),
            galleryImages: galleryNorm,
            badges: found.badges ?? [],
            features: found.features ?? [],
            colors: found.colors ?? [],
            sizes: found.size ?? found.sizes ?? ['S', 'M', 'L', 'XL'],
            reviewIds: found.reviewIds ?? [],
          } as Product;
          setProduct(normalized);
          setSelectedImage(normalized.mainImage ?? normalized.galleryImages[0]?.src ?? '/img/placeholder.png');
          setSelectedSize(normalized.sizes[0] ?? 'S');
          setSelectedColor(normalized.colors?.[0] ?? '');
          setLoading(false);
          return;
        }
      }

      setProduct(PRODUCT_DATA);
      setSelectedImage(PRODUCT_DATA.mainImage);
      setSelectedSize(PRODUCT_DATA.sizes[0]);
      setLoading(false);
    };

    fetchProduct();
  }, [id, location]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage ?? product.galleryImages?.[0]?.src ?? '/img/placeholder.png');
      setSelectedSize(product.sizes?.[0] ?? 'S');
      setSelectedColor(product.colors?.[0] ?? '');
    }
  }, [product]);

  const scrollToThumbIndex = (index: number) => {
    if (!thumbsRef.current) return;
    const container = thumbsRef.current;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (container.clientWidth / 2) + (child.clientWidth / 2);
    container.scrollTo({ left, behavior: 'smooth' });
  };

  const mobilePrevImage = () => {
    if (!product) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    const prev = idx > 0 ? idx - 1 : gallery.length - 1;
    setSelectedImage(gallery[prev]);
    scrollToThumbIndex(prev);
  };

  const mobileNextImage = () => {
    if (!product) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    const next = idx < gallery.length - 1 ? idx + 1 : 0;
    setSelectedImage(gallery[next]);
    scrollToThumbIndex(next);
  };

  useEffect(() => {
    if (!product || !selectedImage) return;
    const gallery = (product.galleryImages && product.galleryImages.length > 0) ? product.galleryImages.map(g => g.src) : [product.mainImage];
    const idx = gallery.findIndex(src => src === selectedImage);
    if (idx >= 0) scrollToThumbIndex(idx);
  }, [selectedImage, product]);

  useEffect(() => {
    if (!product) return;

    const key = `reviews_${product.name || 'global'}`;
    const localRaw = localStorage.getItem(key);
    let localReviews: any[] = [];
    try { if (localRaw) localReviews = JSON.parse(localRaw); } catch (e) {}

    const filteredInitial = (product.reviewIds && product.reviewIds.length > 0)
      ? initialReviews.filter(r => product.reviewIds!.includes(r.id))
      : [];

    const allProductReviews = [...localReviews, ...filteredInitial];
    const total = allProductReviews.length;
    const avg = total ? Math.round((allProductReviews.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10 : 0;

    // Only update if values actually changed to avoid infinite loops
    if (product.rating !== avg || product.reviewsCount !== total) {
      setProduct(prev => prev ? { ...prev, rating: avg, reviewsCount: total } : null);
    }
  }, [id, product?.name, product?.reviewIds]);

  if (loading) return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-[#B76E79]">Loading product details...</div>;
  if (!product) return <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center text-red-500">Product not found.</div>;

  const handleBack = () => navigate(-1);

  const onAddToCart = () => {
    try {
      const cartKey = 'cart';
      const raw = localStorage.getItem(cartKey) || '[]';
      const items: any[] = JSON.parse(raw);
      const existing = items.find(i => String(i.id) === String(product.id) && i.color === selectedColor && i.size === selectedSize);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        items.push({
          id: product.id, name: product.name, price: product.price, currency: product.currency,
          quantity: 1, image: product.mainImage, size: selectedSize, color: selectedColor,
        });
      }
      localStorage.setItem(cartKey, JSON.stringify(items));
      try { window.dispatchEvent(new CustomEvent('cartChanged', { detail: { items } })); } catch (e) {}
      toast({ title: 'Added to cart', description: `${product.name} (Size: ${selectedSize}) has been added to your cart.` });
    } catch (err) {
      console.error('Failed to add to cart', err);
      toast({ title: 'Error', description: 'Could not add item to cart.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <PageNav subtitle={product.name} />

      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-lg border border-[#F5C6D0]/20">
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover" />
            </div>

            <div className="mt-4 w-full max-w-lg">
              <div className="hidden md:flex justify-center gap-2">
                {(product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [{ src: product.mainImage, alt: product.name }]).map((img, index) => (
                  <button key={index} onClick={() => setSelectedImage(img.src)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img.src ? 'border-[#B76E79] shadow-md' : 'border-transparent hover:border-[#F5C6D0]'}`}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex items-center md:hidden gap-2 justify-center w-full">
                <button aria-label="previous" onClick={mobilePrevImage} className="p-2 bg-white rounded-full shadow border border-[#F5C6D0]/30">
                  <svg className="w-5 h-5 text-[#B76E79]" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M12 4L6 10l6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div ref={thumbsRef} className="flex-1 max-w-lg flex gap-2 overflow-x-auto py-1 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {(product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [{ src: product.mainImage, alt: product.name }]).map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(img.src)}
                      className={`min-w-[80px] w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 ${selectedImage === img.src ? 'border-[#B76E79]' : 'border-transparent'}`}>
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button aria-label="next" onClick={mobileNextImage} className="p-2 bg-white rounded-full shadow border border-[#F5C6D0]/30">
                  <svg className="w-5 h-5 text-[#B76E79]" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M8 4l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <button onClick={handleBack} className="text-sm text-[#B76E79] hover:underline mb-4 inline-flex items-center gap-1">← Back</button>
            <h1 className="text-3xl font-serif font-bold text-[#4A2C3D] mb-3">{product.name}</h1>
            <RatingStars rating={product.rating} reviewCount={product.reviewsCount} />
            <p className="mt-4 text-lg text-[#8B5E6B]">{product.tagline}</p>
            <p className="mt-2 text-[#8B5E6B]">{product.description}</p>

            <div className="flex gap-4 mt-6">
              {product.features.map((feature, index) => (
                <FeatureBadge key={index} label={feature} />
              ))}
            </div>

            <div className="mt-8 border-t border-[#F5C6D0]/30 pt-6">
              <details className="group" open={Boolean(product.details && product.details.trim())}>
                <summary className="flex justify-between items-center cursor-pointer text-xl font-bold text-[#4A2C3D]">
                  Description
                  <span className="text-[#B76E79] group-open:hidden">+</span>
                  <span className="text-[#B76E79] group-open:block hidden">−</span>
                </summary>
                <div className="mt-4 text-[#8B5E6B]">
                  {product.details && <div className="mt-2 text-sm whitespace-pre-line">{product.details}</div>}
                  {(!product.details || product.details === '') && <p className="mt-2 text-sm">No additional details available.</p>}
                </div>
              </details>
            </div>

            {/* Colors */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#4A2C3D] mb-3">Color:</h3>
              <div className="flex items-center gap-3">
                {(product.colors && product.colors.length > 0 && product.colors[0] !== '') ? (
                  product.colors.map((c, idx) => (
                    <button key={idx} onClick={() => setSelectedColor(c)} title={c}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === c ? 'ring-2 ring-[#B76E79] ring-offset-2' : 'border-gray-200'}`}>
                      <span className="block w-full h-full rounded-full" style={{ backgroundColor: c }} />
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-[#8B5E6B]">No color options</span>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#4A2C3D] mb-3">Size:</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl border-2 transition-all min-w-[60px] text-sm font-medium ${selectedSize === size ? 'border-[#B76E79] bg-[#FFF0F3] text-[#B76E79]' : 'border-gray-200 text-[#4A2C3D] hover:border-[#F5C6D0]'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8">
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
                className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:from-[#A25D68] hover:to-[#B76E79] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all hover:shadow-xl">
                Add to Cart — {product.currency} {product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection productTitle={product.name} reviewIds={product.reviewIds} />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;