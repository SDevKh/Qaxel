import React, { useState } from 'react';
import { X, ShoppingCart, Check, Info, ArrowDown } from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    description: string;
    details?: string;
    size?: string[];
  } | null;
  onAddToCart: (product: any, size: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  product,
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product, selectedSize);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 800);
  };

  const sizes = product.size || ['S', 'M', 'L', 'XL'];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="absolute inset-0 bg-[#4A2C3D]/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        {/* Close Button Mobile */}
        <button aria-label="Close product preview" onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg md:hidden">
          <X size={20} className="text-[#4A2C3D]" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative bg-[#FFF8F5]">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C3D]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="hidden md:flex justify-end mb-4">
              <button aria-label="Close product preview" onClick={onClose} className="p-2 hover:bg-[#FFF0F3] rounded-full transition-colors text-[#8B5E6B]">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-xs uppercase tracking-[0.3em] text-[#B76E79] font-bold mb-2">Quick View</p>
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D] mb-4">{product.title}</h2>
            
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {product.originalPrice && product.originalPrice > product.price ? (
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <ArrowDown size={16} />
                  <span>{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
                </div>
              ) : null}
              {product.originalPrice ? (
                <span className="text-lg text-[#8B5E6B] line-through">Rs. {product.originalPrice}</span>
              ) : null}
              <span className="text-2xl font-bold text-[#B76E79]">Rs. {product.price}</span>
              <span className="text-xs text-[#8B5E6B] bg-[#FFF0F3] px-2 py-1 rounded-md font-medium">In Stock</span>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-[#8B5E6B] leading-relaxed italic">{product.description}</p>
              {product.details && (
                <div className="flex items-start gap-2 text-xs text-[#4A2C3D]/70 bg-[#FFF8F5] p-3 rounded-xl border border-[#F5C6D0]/20">
                  <Info size={14} className="mt-0.5 flex-shrink-0" />
                  <p>{product.details.substring(0, 150)}...</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-[#4A2C3D]">Select Size</label>
                <button className="text-[10px] text-[#B76E79] underline uppercase tracking-wider font-bold">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-10 border-2 rounded-xl text-sm font-bold transition-all ${
                      selectedSize === size 
                        ? 'border-[#B76E79] bg-[#FFF0F3] text-[#B76E79] shadow-sm' 
                        : 'border-[#F5C6D0]/30 text-[#4A2C3D] hover:border-[#B76E79]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              {isAdding ? (
                <>
                  <Check size={20} className="animate-in zoom-in" />
                  <span>ADDED TO CART</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#8B5E6B] tracking-wide uppercase font-medium">Free Shipping on orders above Rs. 999</p>
          </div>
        </div>
      </div>
    </div>
  );
};

