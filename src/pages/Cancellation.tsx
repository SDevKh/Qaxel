import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CancellationPolicy: React.FC = () => {
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
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Cancellation Policy</h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: [Insert Date]. Read how cancellations are handled.</p>
          </header>

          <section id="before" className="mb-4">
            <h3 className="text-lg font-semibold">Order Cancellation (Before Shipment)</h3>
            <p className="mt-2 text-sm">Orders can be canceled only before they are shipped. If canceled, prepaid refunds will be issued to the original payment method within 3–7 business days. COD orders will simply be canceled and no refund is required.</p>
          </section>

          <section id="after" className="mb-4">
            <h3 className="text-lg font-semibold">Order Cancellation (After Shipment)</h3>
            <p className="mt-2 text-sm">Once shipped, an order cannot be canceled. If you still want to return the item, please follow our Returns & Refund Policy after delivery.</p>
          </section>

          <section id="auto" className="mb-4">
            <h3 className="text-lg font-semibold">Automatic Cancellations</h3>
            <p className="mt-2 text-sm">Orders may be automatically canceled because of payment failure, stock unavailability, incorrect address/unreachable phone, or suspected fraud. We will notify you by email/SMS if this occurs.</p>
          </section>

          <section id="contact" className="mb-4">
            <h3 className="text-lg font-semibold">Contact for Cancellations</h3>
            <p className="mt-2 text-sm">To request a cancellation, contact support as soon as possible: <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a> or <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a>.</p>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>See also our <Link to="/return" className="text-blue-600 hover:underline">Return & Refund Policy</Link> and <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default CancellationPolicy;