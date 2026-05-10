import React from 'react';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Terms of Service" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Terms & Conditions</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Please read these terms carefully before using our website.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section>
              <h3 className="text-lg font-bold mb-2">1. General</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Pardesi Naari operates this website to offer women’s fashion products. By accessing or placing an order on this site, you confirm that you are at least 18 years old or using the site under the supervision of a guardian.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">2. Product Information</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We try to display product colors, sizes, and details accurately. Slight variations may occur due to screen differences, photography, or updates in fabric/design. We are not responsible for such minimal variations.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">3. Orders & Payments</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">All orders are subject to availability and confirmation. We accept valid online payment methods via our payment partners. We reserve the right to cancel or refuse any order due to incorrect pricing or verification problems.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">4. Returns & Exchanges</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Returns/exchanges are accepted only for eligible items and within the return window displayed on the product page. Items must be unused, unwashed, and returned in original condition with tags attached.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">5. Intellectual Property</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">All content on Pardesi Naari — including images, designs, logos, brand names, and text — is protected by intellectual property laws. Unauthorized use or reproduction is prohibited.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;