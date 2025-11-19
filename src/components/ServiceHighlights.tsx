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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 bg-[#F5E6B3] border-t-2 border-b-2 border-black">
      {services.map((service, idx) => (
        <div key={idx} className="flex flex-col items-center text-center">
          <service.icon className="w-10 h-10 mb-2" />
          <h3 className="font-bold text-sm">{service.title}</h3>
          <p className="text-xs text-gray-700">{service.subtitle}</p>
        </div>
      ))}
    </div>
  );
};
