import React from 'react';
import { Link } from 'react-router-dom';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const CancellationPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Cancellation Policy" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Cancellation Policy</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Read how cancellations are handled.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section>
              <h3 className="text-lg font-bold mb-2">Order Cancellation (Before Shipment)</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Orders can be canceled only before they are shipped. If canceled, prepaid refunds will be issued to the original payment method within 3–7 business days. COD orders will simply be canceled.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Order Cancellation (After Shipment)</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Once shipped, an order cannot be canceled. If you still want to return the item, please follow our Returns & Refund Policy after delivery.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Automatic Cancellations</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Orders may be automatically canceled because of payment failure, stock unavailability, incorrect address/unreachable phone, or suspected fraud. We will notify you by email/SMS if this occurs.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationPolicy;