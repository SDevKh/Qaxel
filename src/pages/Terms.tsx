import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
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
            <Link to="/faq" className="block py-2 hover:underline font-semibold">FAQ</Link>
            <button
              onClick={() => {
                scrollToSection('general');
                setMobileMenuOpen(false);
              }}
              className="block py-2 hover:underline font-semibold w-full text-left"
            >
              Terms Sections
            </button>
          </div>
        )}
      </nav>

      <main className="min-h-screen bg-[#F9FBC3] p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Terms & Conditions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: [Insert Date]. Please read these terms carefully before using our website.</p>
          </header>

          <nav aria-label="Terms table of contents" className="mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li><button onClick={() => scrollToSection('general')} className="text-left text-blue-600 hover:underline">General</button></li>
              <li><button onClick={() => scrollToSection('product-info')} className="text-left text-blue-600 hover:underline">Product Information</button></li>
              <li><button onClick={() => scrollToSection('orders-payments')} className="text-left text-blue-600 hover:underline">Orders & Payments</button></li>
              <li><button onClick={() => scrollToSection('pricing-offers')} className="text-left text-blue-600 hover:underline">Pricing & Offers</button></li>
              <li><button onClick={() => scrollToSection('shipping')} className="text-left text-blue-600 hover:underline">Shipping & Delivery</button></li>
              <li><button onClick={() => scrollToSection('returns')} className="text-left text-blue-600 hover:underline">Returns & Exchanges</button></li>
              <li><button onClick={() => scrollToSection('cancellations')} className="text-left text-blue-600 hover:underline">Cancellations</button></li>
              <li><button onClick={() => scrollToSection('responsibilities')} className="text-left text-blue-600 hover:underline">User Responsibilities</button></li>
              <li><button onClick={() => scrollToSection('ip')} className="text-left text-blue-600 hover:underline">Intellectual Property</button></li>
              <li><button onClick={() => scrollToSection('liability')} className="text-left text-blue-600 hover:underline">Limitation of Liability</button></li>
              <li><button onClick={() => scrollToSection('privacy')} className="text-left text-blue-600 hover:underline">Privacy</button></li>
              <li><button onClick={() => scrollToSection('changes')} className="text-left text-blue-600 hover:underline">Changes to Terms</button></li>
            </ul>
          </nav>

          <section id="general" className="mb-6">
            <h3 className="text-lg font-semibold">1. General</h3>
            <p className="mt-2 text-sm">Qaxel operates this website to offer women’s fashion products. By accessing or placing an order on this site, you confirm that you are at least 18 years old or using the site under the supervision of a guardian. Using our site means you agree to these Terms & Conditions.</p>
          </section>

          <section id="product-info" className="mb-6">
            <h3 className="text-lg font-semibold">2. Product Information</h3>
            <p className="mt-2 text-sm">We try to display product colors, sizes, and details accurately. Slight variations may occur due to screen differences, photography, or updates in fabric/design. We are not responsible for such minimal variations.</p>
          </section>

          <section id="orders-payments" className="mb-6">
            <h3 className="text-lg font-semibold">3. Orders & Payments</h3>
            <ul className="list-disc list-inside mt-2 text-sm space-y-2">
              <li>All orders are subject to availability and confirmation.</li>
              <li>We accept valid online payment methods via our payment partners. Payment processing is handled by secure third-party providers.</li>
              <li>We reserve the right to cancel or refuse any order due to incorrect pricing, stock issues, or verification problems.</li>
            </ul>
          </section>

          <section id="pricing-offers" className="mb-6">
            <h3 className="text-lg font-semibold">4. Pricing & Offers</h3>
            <p className="mt-2 text-sm">Prices on the website include applicable taxes unless stated otherwise. Promotional offers are for a limited time and cannot be combined unless explicitly allowed. We may correct pricing errors or update prices at any time.</p>
          </section>

          <section id="shipping" className="mb-6">
            <h3 className="text-lg font-semibold">5. Shipping & Delivery</h3>
            <p className="mt-2 text-sm">Delivery timelines depend on your location and the courier. Delays can occur due to weather, holidays, strikes, or other logistic constraints. We are not liable for delays caused by third-party courier services.</p>
          </section>

          <section id="returns" className="mb-6">
            <h3 className="text-lg font-semibold">6. Returns & Exchanges</h3>
            <ul className="list-disc list-inside mt-2 text-sm space-y-2">
              <li>Returns/exchanges are accepted only for eligible items and within the return window displayed on the product page.</li>
              <li>Items must be unused, unwashed, and returned in original condition with tags attached.</li>
              <li>Final sale items are not eligible for return or exchange.</li>
              <li>Refunds are processed after quality checks; the time to receive the refund may depend on your payment provider.</li>
            </ul>
          </section>

          <section id="cancellations" className="mb-6">
            <h3 className="text-lg font-semibold">7. Cancellations</h3>
            <p className="mt-2 text-sm">Orders can be canceled before dispatch. Once an order is shipped, cancellation is not possible. If eligible, you may initiate a return after receiving the product.</p>
          </section>

          <section id="responsibilities" className="mb-6">
            <h3 className="text-lg font-semibold">8. User Responsibilities</h3>
            <p className="mt-2 text-sm">You agree not to misuse the website, attempt unauthorized access, or engage in activity that harms the platform or other users. You are responsible for maintaining the confidentiality of your account credentials.</p>
          </section>

          <section id="ip" className="mb-6">
            <h3 className="text-lg font-semibold">9. Intellectual Property</h3>
            <p className="mt-2 text-sm">All content on Qaxel — including images, designs, logos, brand names, and text — is protected by intellectual property laws. Unauthorized use or reproduction is prohibited without written permission.</p>
          </section>

          <section id="liability" className="mb-6">
            <h3 className="text-lg font-semibold">10. Limitation of Liability</h3>
            <p className="mt-2 text-sm">To the maximum extent permitted by law, Qaxel is not liable for indirect, incidental, special or consequential damages arising from the use of our website or products.</p>
          </section>

          <section id="privacy" className="mb-6">
            <h3 className="text-lg font-semibold">11. Privacy</h3>
            <p className="mt-2 text-sm">Your personal information is handled according to our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. By using the site you consent to the collection and use of data as described in the policy.</p>
          </section>

          <section id="changes" className="mb-6">
            <h3 className="text-lg font-semibold">12. Changes to Terms</h3>
            <p className="mt-2 text-sm">We may update these Terms periodically. Continued use of the site after changes indicates acceptance of the updated terms. We will post the "Last updated" date at the top of this page when changes are made.</p>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>For more information, see our <Link to="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link> and <Link to="/faq" className="text-blue-600 hover:underline">FAQ</Link>. For privacy details visit the <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Terms;