import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    image: string;
    title: string;
    price: number;
    description: string;
  } | null;
  onAddToCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  product,
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState('M');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#F5E6B3] max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-black">
        <div className="sticky top-0 bg-[#F5E6B3] border-b-2 border-black p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <button onClick={onClose} className="hover:opacity-70">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 md:flex gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img src={product.image} alt={product.title} className="w-full" />
          </div>
          <div className="md:w-1/2">
            <p className="text-xs uppercase tracking-wide mb-2 text-gray-700">{product.title}</p>
            <h3 className="text-3xl font-bold mb-4">Rs. {product.price}</h3>
            <p className="mb-6 text-gray-800">{product.description}</p>
            <div className="mb-6">
              <label className="block font-bold mb-2">Size:</label>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 border-black ${
                      selectedSize === size ? 'bg-black text-[#F5E6B3]' : 'bg-transparent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                onAddToCart();
                onClose();
              }}
              className="w-full bg-black text-[#F5E6B3] py-3 font-bold hover:bg-gray-800"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
