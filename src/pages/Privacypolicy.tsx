import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: [Insert Date]. This policy explains how we collect, use and protect your personal information.</p>
          </header>

          <nav aria-label="Privacy table of contents" className="mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li><button onClick={() => scrollToSection('info-collect')} className="text-left text-blue-600 hover:underline">Information We Collect</button></li>
              <li><button onClick={() => scrollToSection('how-use')} className="text-left text-blue-600 hover:underline">How We Use Your Information</button></li>
              <li><button onClick={() => scrollToSection('sharing')} className="text-left text-blue-600 hover:underline">Sharing Your Information</button></li>
              <li><button onClick={() => scrollToSection('cookies')} className="text-left text-blue-600 hover:underline">Cookies & Tracking</button></li>
              <li><button onClick={() => scrollToSection('security')} className="text-left text-blue-600 hover:underline">Data Security</button></li>
              <li><button onClick={() => scrollToSection('rights')} className="text-left text-blue-600 hover:underline">Your Rights</button></li>
            </ul>
          </nav>

          <section id="info-collect" className="mb-6">
            <h3 className="text-lg font-semibold">1. Information We Collect</h3>
            <p className="mt-2 text-sm">We collect personal information when you create an account, place an order, or contact support. This may include:</p>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>Full name, phone number, and email address</li>
              <li>Shipping and billing addresses</li>
              <li>Payment details (processed securely by payment partners; we do not store full card details)</li>
            </ul>

            <p className="mt-3 text-sm">We also collect non-personal data automatically such as browser, device, IP address, pages visited and cookies to improve the site experience.</p>
          </section>

          <section id="how-use" className="mb-6">
            <h3 className="text-lg font-semibold">2. How We Use Your Information</h3>
            <p className="mt-2 text-sm">We use collected data to process orders, provide customer support, send transactional updates, personalize recommendations, detect fraud and improve our services. Marketing communications are sent only with your consent and you can unsubscribe at any time.</p>
          </section>

          <section id="sharing" className="mb-6">
            <h3 className="text-lg font-semibold">3. Sharing Your Information</h3>
            <p className="mt-2 text-sm">We share data only with trusted partners necessary to fulfill orders or provide services, such as:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Courier partners for delivery</li>
              <li>Payment gateways for secure transaction processing</li>
              <li>Service providers for hosting, analytics and support</li>
            </ul>
            <p className="mt-2 text-sm">We do not sell or rent personal information to third parties. We may disclose information if required by law.</p>
          </section>

          <section id="cookies" className="mb-6">
            <h3 className="text-lg font-semibold">4. Cookies & Tracking</h3>
            <p className="mt-2 text-sm">Cookies help remember preferences, keep carts saved and analyze usage. You can disable cookies in your browser, but some features may not function correctly.</p>
          </section>

          <section id="security" className="mb-6">
            <h3 className="text-lg font-semibold">5. Data Security</h3>
            <p className="mt-2 text-sm">We use modern security measures to protect information. While no system is 100% secure, we take reasonable steps to safeguard your data. Payment processing is handled by trusted, PCI-compliant providers.</p>
          </section>

          <section id="rights" className="mb-6">
            <h3 className="text-lg font-semibold">6. Your Rights</h3>
            <p className="mt-2 text-sm">You can access, update, or request deletion of your personal data (subject to legal requirements). You can also opt out of marketing messages. Contact support to exercise these rights.</p>
          </section>

          <footer className="border-t pt-4 mt-6 text-sm text-gray-600">
            <p>Questions? Contact us at <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a> or <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a>. See also our <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;