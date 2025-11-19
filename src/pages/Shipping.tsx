import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="bg-[#FFD167] border-b-2 border-black sticky top-0 z-40 w-full">
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:underline font-semibold">
              <img src="img/logo.png" alt="Logo" className="h-12" />
            </Link>
            <h1 className="text-xl font-bold md:block hidden">Missing Piece of your closet</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <Link to="/terms" className="hover:underline font-semibold">Terms</Link>
              <Link to="/faq" className="hover:underline font-semibold">FAQ</Link>
            </div>

            <button
              className="md:hidden border-2 border-black px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <Link to="/" className="block py-2 hover:underline font-semibold">Home</Link>
            <Link to="/terms" className="block py-2 hover:underline font-semibold">Terms</Link>
          </div>
        )}
      </nav>

      <main className="min-h-screen bg-[#F9FBC3] p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Shipping Policy</h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: [Insert Date]. Information about processing, shipping and delivery.</p>
          </header>

          <section id="processing" className="mb-4">
            <h3 className="text-lg font-semibold">1. Order Processing Time</h3>
            <p className="mt-2 text-sm">Orders are typically processed within 1–2 business days after payment confirmation. Orders placed on weekends or holidays will be processed on the next working day. Processing may take longer during sales or high volume periods.</p>
          </section>

          <section id="delivery" className="mb-4">
            <h3 className="text-lg font-semibold">2. Shipping Time & Delivery</h3>
            <p className="mt-2 text-sm">Standard delivery usually takes 3–7 business days depending on your location. Remote areas may require extra days. You will receive a tracking number via email/SMS after dispatch.</p>
          </section>

          <section id="charges" className="mb-4">
            <h3 className="text-lg font-semibold">3. Shipping Charges</h3>
            <p className="mt-2 text-sm">Shipping fees (if applicable) are shown at checkout. Free shipping may apply during promotions or for orders above a specified amount.</p>
          </section>

          <section id="tracking" className="mb-4">
            <h3 className="text-lg font-semibold">4. Tracking Your Order</h3>
            <p className="mt-2 text-sm">Use the tracking link sent to you after dispatch. Tracking information may take a few hours to update after pickup.</p>
          </section>

          <section id="attempts" className="mb-4">
            <h3 className="text-lg font-semibold">5. Delivery Attempts</h3>
            <p className="mt-2 text-sm">Couriers typically attempt 1–3 deliveries. If the phone number is unreachable or address incorrect, the package may be returned and re-shipment charges may apply.</p>
          </section>

          <section id="delays" className="mb-4">
            <h3 className="text-lg font-semibold">6. Delays & Exceptions</h3>
            <p className="mt-2 text-sm">Deliveries can be delayed by weather, public holidays, courier issues, or other uncontrollable events. We will assist in tracking, but are not liable for third-party delays.</p>
          </section>

          <section id="address" className="mb-4">
            <h3 className="text-lg font-semibold">7. Incorrect or Incomplete Address</h3>
            <p className="mt-2 text-sm">If an order is returned due to an incorrect or incomplete address provided by the customer, additional shipping charges may apply for re-shipment.</p>
          </section>

          <section id="lost" className="mb-4">
            <h3 className="text-lg font-semibold">8. Lost or Damaged Packages</h3>
            <p className="mt-2 text-sm">If a package is lost or arrives damaged, contact us within 48 hours with photos and order details — we will coordinate with the courier to resolve it.</p>
          </section>

          <section id="international" className="mb-4">
            <h3 className="text-lg font-semibold">9. International Shipping</h3>
            <p className="mt-2 text-sm">Currently we ship within India only. International shipping will be announced when available.</p>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>For shipping help contact <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a>. See also <Link to="/return" className="text-blue-600 hover:underline">Return & Refund Policy</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default ShippingPolicy;