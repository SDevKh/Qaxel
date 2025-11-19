import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5E6B3] border-t-2 border-black pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Email: info@garmora.com</p>
            <p className="text-sm mb-2">Phone/Text: +91 7665771186</p>
            <p className="text-sm">Monday to Sunday, 8:00 AM EST to 6:00 PM EST</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Get To Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="#reviews" className="hover:underline">Get Our Happy Customer Reviews</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/cancellation" className="hover:underline">Cancellation</a></li>
              <li><a href="/FAQ" className="hover:underline">FAQ</a></li>
              <li><a href="/discalimer" className="hover:underline">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Policies & Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/shipping" className="hover:underline">Shipping Policy</a></li>
              <li><a href="/return" className="hover:underline">Return & Refund Policy</a></li>
              <li><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-black">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="https://www.facebook.com" className="hover:opacity-70"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/qaxel.store/" className="hover:opacity-70"><Instagram size={20} /></a>
            <a href="https://www.youtube.com" className="hover:opacity-70"><Youtube size={20} /></a>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};
