import React from 'react';
import { Link } from 'react-router-dom';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Shipping Policy" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Shipping Policy</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Information about processing, shipping and delivery.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section id="processing">
              <h3 className="text-lg font-bold mb-2">1. Order Processing Time</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Orders are typically processed within 1–2 business days after payment confirmation. Orders placed on weekends or holidays will be processed on the next working day. Processing may take longer during sales or high volume periods.</p>
            </section>

            <section id="delivery">
              <h3 className="text-lg font-bold mb-2">2. Shipping Time & Delivery</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Standard delivery usually takes 3–7 business days depending on your location. Remote areas may require extra days. You will receive a tracking number via email/SMS after dispatch.</p>
            </section>

            <section id="charges">
              <h3 className="text-lg font-bold mb-2">3. Shipping Charges</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Shipping fees (if applicable) are shown at checkout. Free shipping may apply during promotions or for orders above a specified amount.</p>
            </section>

            <section id="tracking">
              <h3 className="text-lg font-bold mb-2">4. Tracking Your Order</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Use the tracking link sent to you after dispatch. Tracking information may take a few hours to update after pickup.</p>
            </section>

            <section id="attempts">
              <h3 className="text-lg font-bold mb-2">5. Delivery Attempts</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Couriers typically attempt 1–3 deliveries. If the phone number is unreachable or address incorrect, the package may be returned and re-shipment charges may apply.</p>
            </section>

            <section id="delays">
              <h3 className="text-lg font-bold mb-2">6. Delays & Exceptions</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Deliveries can be delayed by weather, public holidays, courier issues, or other uncontrollable events. We will assist in tracking, but are not liable for third-party delays.</p>
            </section>

            <section id="international">
              <h3 className="text-lg font-bold mb-2">7. International Shipping</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Currently we ship within India only. International shipping will be announced when available.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;