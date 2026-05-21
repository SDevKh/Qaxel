import React from 'react';
import { ShoppingCart, ArrowDown } from 'lucide-react';

const COLOR_CLASS_MAP: Record<string, string> = {
  '#8C0C2F': 'bg-[#8C0C2F]',
  '#D2B48C': 'bg-[#D2B48C]',
};

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  colors?: string[];
  onAddToCart: () => void;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  title, 
  price, 
  originalPrice,
  colors = [],
  onAddToCart,
  onClick 
}) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#F5C6D0]/20 group flex flex-col h-full"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {colors.length > 0 && colors[0] !== '' && (
            <div className="flex gap-1.5 mb-3">
              {colors.map((c, i) => (
                <span
                  key={i}
                  title={c}
                  className={`${COLOR_CLASS_MAP[c] ?? 'bg-gray-300'} w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-200 shadow-sm`}
                />
              ))}
            </div>
          )}
          <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 text-[#8B5E6B] font-bold line-clamp-1">{title}</h3>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {originalPrice && originalPrice > price ? (
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <ArrowDown size={14} />
                <span>{Math.round(((originalPrice - price) / originalPrice) * 100)}%</span>
              </div>
            ) : null}
            {originalPrice ? (
              <span className="font-serif text-sm sm:text-base text-[#8B5E6B] line-through">Rs. {originalPrice}</span>
            ) : null}
            <p className="font-serif font-bold text-base sm:text-xl text-[#4A2C3D]">Rs. {price}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-2.5 sm:py-3 px-4 rounded-xl hover:shadow-lg transition-all font-bold tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingCart size={14} className="group-hover/btn:scale-110 transition-transform" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

