import React from 'react';
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react';

export const ServiceHighlights: React.FC = () => {
  const services = [
    { icon: Truck, title: 'Free Delivery', subtitle: 'On orders above Rs. 999' },
    { icon: CreditCard, title: 'Secure Payment', subtitle: '100% encrypted' },
    { icon: RefreshCw, title: 'Easy Returns', subtitle: '7-day policy' },
    { icon: Headphones, title: 'Expert Support', subtitle: 'Always available' }
  ];

  return (
    <div className="bg-white border-y border-[#F5C6D0]/30 py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 group p-4 rounded-2xl hover:bg-[#FFF0F3]/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#D4A574] flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-sm">
              <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-[#4A2C3D] tracking-wide uppercase">{service.title}</h3>
              <p className="text-[10px] sm:text-xs text-[#8B5E6B] mt-1 font-medium italic">{service.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

