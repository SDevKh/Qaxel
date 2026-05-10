import React from 'react';
import { PageNav } from '../components/PageNav';
import { Footer } from '../components/Footer';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      <PageNav subtitle="Disclaimer" />

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#F5C6D0]/30 p-6 md:p-10">
          <header className="mb-8 border-b border-[#F5C6D0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#4A2C3D]">Disclaimer</h2>
            <p className="mt-2 text-sm text-[#8B5E6B]">Important information regarding the use of this website.</p>
          </header>

          <div className="space-y-6 text-[#4A2C3D]">
            <section>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">
                The content, images and information displayed on Pardesi Naari are provided for general shopping and informational purposes only. We aim to be accurate, but we cannot guarantee that all product details, pricing and stock information are free from errors or always up to date. Use the site at your own discretion.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Product accuracy</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">We make every effort to represent products accurately. However, slight variations may occur due to digital screen differences, lighting, and natural fabric variations. These minor differences do not constitute a defect.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Website information</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Prices, stock, promotional offers and product details may change without notice. While we strive to keep the website functioning correctly, we cannot guarantee it will be free from errors, delays, interruptions or technical issues at all times.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Liability</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">Pardesi Naari is not responsible for delays caused by logistics, incorrect customer info, or damage resulting from improper product care. Use of the website is at your own risk.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Contact us</h3>
              <p className="text-sm leading-relaxed text-[#8B5E6B]">
                If you have questions about this Disclaimer, please contact our support team at support@pardesinaari.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;