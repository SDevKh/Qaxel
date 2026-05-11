import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
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

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 80;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-[#4A2C3D]/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F5C6D0]/30 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-[#B76E79]" size={22} />
              <h2 className="text-xl font-serif font-bold text-[#4A2C3D]">Your Cart</h2>
              <span className="bg-[#FFF0F3] text-[#B76E79] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#FFF0F3] rounded-full transition-colors text-[#8B5E6B]">
              <X size={22} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-[#FFF0F3] rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-[#B76E79]/40" size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#4A2C3D]">Your cart is empty</h3>
                  <p className="text-sm text-[#8B5E6B] mt-1">Looks like you haven't added anything yet.</p>
                </div>
                <button onClick={onClose} className="text-[#B76E79] font-semibold hover:underline">Continue Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 group">
                  <div className="w-24 h-32 flex-shrink-0 bg-[#FFF8F5] rounded-xl overflow-hidden border border-[#F5C6D0]/20">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-[#4A2C3D] line-clamp-1">{item.title}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-[#8B5E6B] hover:text-red-500 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-x-3 mt-1">
                        {item.size && <span className="text-xs text-[#8B5E6B]">Size: <span className="font-medium text-[#4A2C3D]">{item.size}</span></span>}
                        {item.color && item.color !== '' && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-[#8B5E6B]">Color:</span>
                            <div className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: item.color }} />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-bold text-[#B76E79] mt-2">Rs. {item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#F5C6D0]/50 rounded-lg overflow-hidden h-8">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 hover:bg-[#FFF0F3] text-[#4A2C3D] transition-colors"
                        ><Minus size={14} /></button>
                        <span className="px-3 text-sm font-medium text-[#4A2C3D] border-x border-[#F5C6D0]/50 h-full flex items-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 hover:bg-[#FFF0F3] text-[#4A2C3D] transition-colors"
                        ><Plus size={14} /></button>
                      </div>
                      <span className="text-sm font-bold text-[#4A2C3D]">Rs. {item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="px-6 py-6 bg-[#FFF8F5] border-t border-[#F5C6D0]/30 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B5E6B]">Subtotal</span>
                  <span className="font-medium text-[#4A2C3D]">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B5E6B]">Shipping</span>
                  <span className="font-medium text-[#4A2C3D]">{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#F5C6D0]/30">
                  <span className="text-[#4A2C3D]">Total</span>
                  <span className="text-[#B76E79]">Rs. {total}</span>
                </div>
              </div>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all text-center block tracking-widest text-sm"
              >
                PROCEED TO CHECKOUT
              </Link>
              <p className="text-[10px] text-center text-[#8B5E6B] italic">Inclusive of all taxes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

