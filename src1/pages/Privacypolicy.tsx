import React from 'react';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Privacy Policy" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Privacy Policy</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">This policy explains how we collect, use and protect your personal information.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section>
              <h3 className="text-lg font-bold mb-2">1. Information We Collect</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We collect personal information when you create an account, place an order, or contact support. This includes name, phone, email, addresses, and secure payment details. We also collect non-personal data automatically (browser, device, IP).</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">2. How We Use Your Information</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We use collected data to process orders, provide customer support, send transactional updates, personalize recommendations, detect fraud and improve our services.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">3. Sharing Your Information</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We share data only with trusted partners necessary to fulfill orders or provide services, such as courier partners and payment gateways. We do not sell or rent personal information.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">4. Cookies & Tracking</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Cookies help remember preferences, keep carts saved and analyze usage. You can disable cookies in your browser, but some features may not function correctly.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">5. Data Security</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We use modern security measures to protect information. Payment processing is handled by trusted, PCI-compliant providers.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">6. Your Rights</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">You can access, update, or request deletion of your personal data. You can also opt out of marketing messages.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;