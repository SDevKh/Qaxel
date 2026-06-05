import React from 'react';
import { PageNav } from '../components/PageNav';

const About: React.FC = () => {
  return (
    <>
      <PageNav subtitle="About Us" />

      <main className="min-h-screen bg-[#FFF8F5]">
        <div className="bg-gradient-to-br from-[#FFF0F3] via-[#FFF8F5] to-[#FFF0E8] py-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B76E79] font-bold mb-3">Our Journey</p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#4A2C3D] mb-4">Pardesi Naari</h1>
          <p className="text-[#B76E79] italic text-lg">For Her. By Her. With Her.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4A574] rounded-full mx-auto mt-6"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#F5C6D0]/20 to-[#D4A574]/20 rounded-2xl blur-xl"></div>
              <img src="img/jpeg.jpg" alt="Traditional Elegance" className="w-full relative z-10 rounded-2xl shadow-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-[#4A2C3D] mb-6">Where Heritage Meets Style</h2>
              <p className="text-[#8B5E6B] leading-relaxed mb-4">
                Welcome to <span className="font-bold text-[#B76E79]">Pardesi Naari</span> — where heritage meets the contemporary spirit. We are a home-grown label dedicated to redefining traditional silhouettes for the modern woman.
              </p>
              <p className="text-[#8B5E6B] leading-relaxed">
                From Pakistani suits to elegant Anarkalis, from breathable cotton dailywear to statement festive pieces — every creation tells a story of craftsmanship, elegance, and timeless style.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-20">
            <img src="/img/muslin lawn (1).jpeg" className="w-full h-[50vh] object-cover" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A2C3D]/90 to-[#4A2C3D]/30 flex items-center justify-center">
              <div className="text-center px-6">
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">Timeless Craftsmanship</h3>
                <p className="text-[#F5C6D0] max-w-xl mx-auto italic">"Our designs are inspired by the rich tapestry of our culture, woven with love and attention to detail."</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { title: 'Collections', items: ['Pakistani Suits', 'Daily Wear', 'Cotton', 'Anarkali'] },
              { title: 'Our Values', items: ['Sustainability', 'Ethical Sourcing', 'Handcrafted Love'] },
              { title: 'Customer Care', items: ['Shipping Policy', 'Returns', 'Contact Us'] },
              { title: 'Connect', items: ['Instagram', 'Facebook', 'Pinterest'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-[#B76E79] uppercase tracking-wider text-xs mb-4">{col.title}</h4>
                <ul className="text-sm space-y-2 text-[#8B5E6B]">
                  {col.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
