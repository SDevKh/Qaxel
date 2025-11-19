import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  colors?: string[];
  onAddToCart: () => void;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  title, 
  price, 
  colors = [],
  onAddToCart,
  onClick 
}) => {
  return (
    <div 
      className="bg-[#F5E6B3] border-2 border-black p-4 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden mb-3">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {colors.length > 0 && (
        <div className="flex gap-2 mb-2">
          {colors.map((c, i) => (
            <span
              key={i}
              title={c}
              style={{ backgroundColor: c }}
              className="w-5 h-5 rounded-full border border-gray-200"
            />
          ))}
        </div>
      )}
      <p className="text-xs uppercase tracking-wide mb-1 text-gray-700">{title}</p>
      <p className="font-bold text-lg mb-3">Rs. {price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
        className="w-full bg-black text-[#F5E6B3] py-2 px-4 hover:bg-gray-800 transition-colors font-semibold"
      >
        ADD TO CART
      </button>
    </div>
  );
};
