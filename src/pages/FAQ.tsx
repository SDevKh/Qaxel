import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
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
              <Link to="/" className="hover:underline font-semibold">Home</Link>
              <Link to="/orders" className="hover:underline font-semibold">Orders</Link>
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
            <Link to="/orders" className="block py-2 hover:underline font-semibold">Orders</Link>
            <button
              onClick={() => {
                scrollToSection('shipping');
                setMobileMenuOpen(false);
              }}
              className="block py-2 hover:underline font-semibold w-full text-left"
            >
              FAQ Sections
            </button>
          </div>
        )}
      </nav>

      <main className="min-h-screen bg-[#F9FBC3] p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions (FAQ)</h2>
            <p className="mt-2 text-sm text-muted-foreground">Answers to common questions about ordering, shipping, returns and account management.</p>
          </header>

          <nav aria-label="FAQ table of contents" className="mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li>
                <button onClick={() => scrollToSection('orders')} className="text-left text-blue-600 hover:underline">Ordering & Payments</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('shipping')} className="text-left text-blue-600 hover:underline">Shipping & Delivery</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('returns')} className="text-left text-blue-600 hover:underline">Returns & Refunds</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('account')} className="text-left text-blue-600 hover:underline">Account & Security</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('support')} className="text-left text-blue-600 hover:underline">Customer Support</button>
              </li>
            </ul>
          </nav>

          <section id="orders" className="mb-6">
            <h3 className="text-lg font-semibold">Ordering & Payments</h3>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <strong>Do you offer Cash on Delivery (COD)?</strong>
                <p className="mt-1">Yes — COD is available for selected PIN codes. Availability shows on the checkout page when you enter your shipping address.</p>
              </div>

              <div>
                <strong>How do I pay?</strong>
                <p className="mt-1">We accept major debit/credit cards, UPI and other popular payment gateways. All payments are handled securely by verified providers; we never store full card details on our servers.</p>
              </div>
            </div>
          </section>

          <section id="shipping" className="mb-6">
            <h3 className="text-lg font-semibold">Shipping & Delivery</h3>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <strong>How long will my order take to arrive?</strong>
                <p className="mt-1">Most orders arrive within 3–7 business days depending on your location and the carrier. You’ll receive a tracking link via email/SMS after dispatch.</p>
              </div>

              <div>
                <strong>Can I change my delivery address after placing an order?</strong>
                <p className="mt-1">Address changes are possible only before the order is shipped. If the order is already dispatched we cannot change the shipping address.</p>
              </div>

              <div>
                <strong>Do you ship internationally?</strong>
                <p className="mt-1">At the moment we ship within India only. We may expand to additional regions in the future.</p>
              </div>
            </div>
          </section>

          <section id="returns" className="mb-6">
            <h3 className="text-lg font-semibold">Returns & Refunds</h3>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <strong>Can I return my product?</strong>
                <p className="mt-1">Returns are accepted for eligible items within the return window shown on the product page. Items must be unused and in original condition with tags attached.</p>
              </div>

              <div>
                <strong>What if I receive a damaged or wrong product?</strong>
                <p className="mt-1">Contact us within 48 hours with photos or a short video. We will process a replacement or refund after verification.</p>
              </div>

              <div>
                <strong>When will I get my refund?</strong>
                <p className="mt-1">Refunds are processed within 3–7 business days after the returned item passes quality checks. The exact time may depend on your bank or payment provider.</p>
              </div>
            </div>
          </section>

          <section id="account" className="mb-6">
            <h3 className="text-lg font-semibold">Account & Security</h3>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <strong>Is my data safe?</strong>
                <p className="mt-1">Yes. Personal information is encrypted and handled according to our privacy policy. Payment processing is delegated to secure, PCI-compliant providers.</p>
              </div>

              <div>
                <strong>How do I update my account details?</strong>
                <p className="mt-1">Go to your Account settings after signing in. You can update your name, address and contact details there.</p>
              </div>
            </div>
          </section>

          <section id="support" className="mb-6">
            <h3 className="text-lg font-semibold">Customer Support</h3>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <strong>How do I contact customer support?</strong>
                <p className="mt-1">Email us at <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a> or call <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a>. We aim to respond within 24 hours.</p>
              </div>

              <div>
                <strong>Still need help?</strong>
                <p className="mt-1">If your question is specific to an order, include your order ID and a short description to help us resolve it faster.</p>
              </div>
            </div>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>For full policies, see our <Link to="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link> and <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default FAQ;