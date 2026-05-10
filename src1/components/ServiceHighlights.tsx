import React from 'react';
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react';

export const ServiceHighlights: React.FC = () => {
  const services = [
    { icon: Truck, title: 'Free Delivery', subtitle: 'On orders above Rs. 999' },
    { icon: CreditCard, title: 'Flexible Payments', subtitle: 'Multiple payment options' },
    { icon: RefreshCw, title: 'Hassle-free Returns', subtitle: '7-day return policy' },
    { icon: Headphones, title: '24/7 Assistance', subtitle: 'Always here to help' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6 bg-gradient-to-r from-[#FFF0F3] to-[#FFF8F0]">
      {services.map((service, idx) => (
        <div key={idx} className="flex flex-col items-center text-center group">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A574] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-sm text-[#4A2C3D]">{service.title}</h3>
          <p className="text-xs text-[#8B5E6B] mt-1">{service.subtitle}</p>
        </div>
      ))}
    </div>
  );
};
