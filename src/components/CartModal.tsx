import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items,
  onUpdateQuantity,
  onRemove 
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#F5E6B3] max-w-2xl w-full max-h-[80vh] overflow-y-auto border-4 border-black">
        <div className="sticky top-0 bg-[#F5E6B3] border-b-2 border-black p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="hover:opacity-70">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-center py-8">Your cart is empty</p>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-gray-400">
                  <img src={item.image} alt={item.title} className="w-20 h-28 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm mb-2">Rs. {item.price}</p>
                    {item.color && <p className="text-xs text-gray-600">Color: {item.color}</p>}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-black text-[#F5E6B3]"
                      >-</button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-black text-[#F5E6B3]"
                      >+</button>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="ml-4 text-sm underline"
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-4 border-t-2 border-black">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-xl">Total:</span>
                  <span className="font-bold text-xl">Rs. {total}</span>
                </div>
                <Link to="/checkout" className="w-full bg-black text-[#F5E6B3] py-3 font-bold hover:bg-gray-800 text-center block">
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
