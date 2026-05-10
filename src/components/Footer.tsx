import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4A2C3D] pt-16 pb-8 text-white/90">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2 text-[#D4A574]">Pardesi Naari</h3>
            <p className="text-xs italic text-[#F5C6D0] mb-4">For Her. By Her. With Her.</p>
            <p className="text-sm mb-5 leading-relaxed opacity-80">Bringing you the finest traditional wear with a touch of modern elegance.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors"><Facebook size={16} /></a>
              <a href="https://www.instagram.com/pardesi_naari/" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors"><Instagram size={16} /></a>
              <a href="https://www.youtube.com" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B76E79] transition-colors"><Youtube size={16} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-[#D4A574] uppercase tracking-wider text-xs">Customer Service</h3>
            <p className="text-sm mb-2 opacity-80">Email: support@pardesinaari.com</p>
            <p className="text-sm mb-2 opacity-80">Phone: +91 7665771186</p>
            <p className="text-sm opacity-80">Mon - Sun, 9:00 AM - 7:00 PM</p>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-[#D4A574] uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="/about" className="hover:text-[#F5C6D0] transition-colors">Our Story</a></li>
              <li><a href="/categories" className="hover:text-[#F5C6D0] transition-colors">Shop by Category</a></li>
              <li><a href="/FAQ" className="hover:text-[#F5C6D0] transition-colors">FAQ</a></li>
              <li><a href="/terms" className="hover:text-[#F5C6D0] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-[#D4A574] uppercase tracking-wider text-xs">Policies</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="/shipping" className="hover:text-[#F5C6D0] transition-colors">Shipping Policy</a></li>
              <li><a href="/return" className="hover:text-[#F5C6D0] transition-colors">Return & Refund</a></li>
              <li><a href="/privacypolicy" className="hover:text-[#F5C6D0] transition-colors">Privacy Policy</a></li>
              <li><a href="/cancellation" className="hover:text-[#F5C6D0] transition-colors">Cancellation</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-xs opacity-50 mb-4 md:mb-0">© 2025 Pardesi Naari. All rights reserved.</p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-5 opacity-60 hover:opacity-100 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 opacity-60 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};
