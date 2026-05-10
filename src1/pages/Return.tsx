import React from 'react';
import { Link } from 'react-router-dom';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Return & Refund" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Return & Refund Policy</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Information about returns, exchanges and refunds.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section>
              <h3 className="text-lg font-bold mb-2">1. Eligibility for Return</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">A product is eligible for return if it is unused, unwashed, in original condition and returned within the window specified on the product page. Items marked non-returnable or final sale are not eligible.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">2. Return Process</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Submit a return request through the website or contact support. We will review and, where available, arrange reverse pickup. The item will undergo quality checks and refunds/exchanges processed after approval.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">3. Exchange Policy</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Exchanges are allowed for size issues, defects, or wrong items subject to stock. If the requested replacement is unavailable we will issue a refund.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">4. Refunds</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Refunds are issued after quality checks. Prepaid orders are refunded to the original payment method. COD refunds may be issued as store credit or to a bank account after verification. Refunds typically take 3–7 business days after approval.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">5. Damaged or Incorrect Products</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Report damaged, defective or incorrect items within 48 hours with photos/videos and order details. We will prioritize replacement or refund.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;