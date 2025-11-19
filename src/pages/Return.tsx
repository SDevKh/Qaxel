import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReturnPolicy: React.FC = () => {
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
            <h2 className="text-2xl font-bold">Return & Refund Policy</h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: [Insert Date]. Information about returns, exchanges and refunds.</p>
          </header>

          <section id="eligibility" className="mb-4">
            <h3 className="text-lg font-semibold">1. Eligibility for Return</h3>
            <p className="mt-2 text-sm">A product is eligible for return if it is unused, unwashed, in original condition and returned within the window specified on the product page. Items marked non-returnable or final sale are not eligible.</p>
          </section>

          <section id="process" className="mb-4">
            <h3 className="text-lg font-semibold">2. Return Process</h3>
            <p className="mt-2 text-sm">Submit a return request through the website or contact support. We will review and, where available, arrange reverse pickup. The item will undergo quality checks and refunds/exchanges processed after approval.</p>
          </section>

          <section id="exchange" className="mb-4">
            <h3 className="text-lg font-semibold">3. Exchange Policy</h3>
            <p className="mt-2 text-sm">Exchanges are allowed for size issues, defects, or wrong items subject to stock. If the requested replacement is unavailable we will issue a refund.</p>
          </section>

          <section id="refunds" className="mb-4">
            <h3 className="text-lg font-semibold">4. Refunds</h3>
            <p className="mt-2 text-sm">Refunds are issued after quality checks. Prepaid orders are refunded to the original payment method. COD refunds may be issued as store credit or to a bank/UPI account after verification. Refunds typically take 3–7 business days after approval.</p>
          </section>

          <section id="damaged" className="mb-4">
            <h3 className="text-lg font-semibold">5. Damaged or Incorrect Products</h3>
            <p className="mt-2 text-sm">Report damaged, defective or incorrect items within 48 hours with photos/videos and order details. We will prioritize replacement or refund.</p>
          </section>

          <section id="shipping-charges" className="mb-4">
            <h3 className="text-lg font-semibold">6. Return Shipping Charges</h3>
            <p className="mt-2 text-sm">Reverse pickup is free for eligible returns. If reverse pickup is unavailable you may self-ship; approved returns may be reimbursed up to a limit.</p>
          </section>

          <section id="abuse" className="mb-4">
            <h3 className="text-lg font-semibold">7. Abuse of Return Policy</h3>
            <p className="mt-2 text-sm">We reserve the right to deny service to customers with excessive returns, policy misuse, or fraudulent claims.</p>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>For return queries contact <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a>. See also <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default ReturnPolicy;