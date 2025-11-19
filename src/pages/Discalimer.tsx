import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const scrollToSection = (id: string) => {
const el = document.getElementById(id);
if (el) el.scrollIntoView({ behavior: "smooth" });
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
            <div className="md:flex gap-6">
              <Link to="/" className="hover:underline font-semibold">Home</Link>
            </div>

            <button
              className="md:hidden border-2 border-black px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-label="Toggle menu">
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black p-4">
            <Link to="/" className="block py-2 hover:underline font-semibold">Home</Link>
            <button
              onClick={() => {
                scrollToSection('new-arrivals');
                setMobileMenuOpen(false);
              }}
              className="block py-2 hover:underline font-semibold w-full text-left"
            >
              Categories
            </button>
          </div>
        )}
      </nav>

      <main className="min-h-screen bg-[#F9FBC3] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Disclaimer</h1>
            <p className="text-sm text-gray-500">Last updated: <time dateTime="2025-11-15">November 15, 2025</time></p>
          </header>

          {/* Table of contents for quick navigation */}
          <nav className="mb-6">
            <h2 className="sr-only">On this page</h2>
            <ul className="flex flex-wrap gap-3 text-sm">
              <li><a href="#product-accuracy" className="text-blue-600 hover:underline">Product accuracy</a></li>
              <li><a href="#website-info" className="text-blue-600 hover:underline">Website information</a></li>
              <li><a href="#liability" className="text-blue-600 hover:underline">Liability</a></li>
              <li><a href="#legal" className="text-blue-600 hover:underline">Legal compliance</a></li>
              <li><a href="#contact" className="text-blue-600 hover:underline">Contact</a></li>
            </ul>
          </nav>

          <section id="intro" className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              The content, images and information displayed on Qaxel are provided for general shopping and informational
              purposes only. We aim to be accurate, but we cannot guarantee that all product details, pricing and stock
              information are free from errors or always up to date. Use the site at your own discretion.
            </p>
          </section>

          <section id="product-accuracy" className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Product accuracy</h3>
            <p className="text-gray-700 mb-2">We make every effort to represent products accurately. However, slight
              variations may occur due to:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Digital screen differences (color calibration, brightness)</li>
              <li>Lighting and photography conditions</li>
              <li>Natural fabric variations and production tolerances</li>
            </ul>
            <p className="text-gray-700 mt-2">These minor differences do not constitute a defect; Qaxel is not liable for
              inconsequential visual variations.</p>
          </section>

          <section id="website-info" className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Website information</h3>
            <p className="text-gray-700">Prices, stock, promotional offers and product details may change without
              notice. While we strive to keep the website functioning correctly, we cannot guarantee it will be free from
              errors, delays, interruptions or technical issues at all times.</p>
          </section>

          <section id="liability" className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Liability</h3>
            <p className="text-gray-700 mb-2">Qaxel is not responsible for:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Delays or issues caused by courier partners or third-party logistics</li>
              <li>Incorrect information entered by customers during checkout</li>
              <li>Damage resulting from improper product use, storage or care</li>
              <li>Content or transactions on external websites linked from Qaxel</li>
            </ul>
            <p className="text-gray-700 mt-2">Use of the website and purchase of products is at your own risk.</p>
          </section>

          <section id="legal" className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Legal compliance</h3>
            <p className="text-gray-700">All purchases made through Qaxel are governed by applicable laws of India.
              Terms and conditions, return policies and consumer rights will apply as per the relevant regulations.</p>
          </section>

          <section id="contact" className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact us</h3>
            <p className="text-gray-700">If you have questions about this Disclaimer or need clarification, please
              contact our support team:</p>
            <ul className="mt-2 text-gray-700">
              <li>Email: <a href="mailto:support@qaxel.example" className="text-blue-600 hover:underline">support@qaxel.example</a></li>
              <li>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a></li>
            </ul>
          </section>

          <footer className="text-sm text-gray-500">
            <p>For full legal terms and return policies, see <Link to="/terms" className="text-blue-600 hover:underline">Terms &amp; Conditions</Link> and
              <Link to="/returns" className="text-blue-600 hover:underline"> Returns Policy</Link>.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default About;
// ...existing code...