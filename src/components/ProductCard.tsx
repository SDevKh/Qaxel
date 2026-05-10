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
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#F5C6D0]/30 group"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        {colors.length > 0 && colors[0] !== '' && (
          <div className="flex gap-2 mb-2">
            {colors.map((c, i) => (
              <span
                key={i}
                title={c}
                style={{ backgroundColor: c }}
                className="w-4 h-4 rounded-full border border-gray-200"
              />
            ))}
          </div>
        )}
        <p className="text-xs uppercase tracking-wider mb-1 text-[#8B5E6B]">{title}</p>
        <p className="font-bold text-lg mb-3 text-[#4A2C3D]">Rs. {price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-gradient-to-r from-[#B76E79] to-[#C9929B] text-white py-2.5 px-4 rounded-lg hover:from-[#A25D68] hover:to-[#B76E79] transition-all font-medium tracking-wide text-sm"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
