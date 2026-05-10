import React from 'react';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="FAQ" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Answers to common questions about ordering, shipping, returns and account management.</p>
          </header>

          <div className="space-y-8 text-[#4A2C3D]">
            <section>
              <h3 className="text-xl font-bold mb-4 border-b border-[#F5C6D0]/30 pb-2">Ordering & Payments</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Do you offer Cash on Delivery (COD)?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">Yes — COD is available for selected PIN codes. Availability shows on the checkout page.</p>
                </div>
                <div>
                  <h4 className="font-semibold">How do I pay?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">We accept major debit/credit cards, UPI and other popular payment gateways securely.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 border-b border-[#F5C6D0]/30 pb-2">Shipping & Delivery</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">How long will my order take to arrive?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">Most orders arrive within 3–7 business days. You’ll receive a tracking link via email/SMS.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Can I change my delivery address?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">Address changes are possible only before the order is shipped.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 border-b border-[#F5C6D0]/30 pb-2">Returns & Refunds</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Can I return my product?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">Returns are accepted for eligible items within the return window shown on the product page.</p>
                </div>
                <div>
                  <h4 className="font-semibold">When will I get my refund?</h4>
                  <p className="text-sm leading-relaxed text-[#8B5E6B] mt-1">Refunds are processed within 3–7 business days after the returned item passes quality checks.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;