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

      <main className="min-h-screen bg-[#F9FBC3] items-center justify-center p-6">
      <img src="img/OUR VISION.png" alt="" />
        <img src="img/img.jpg" alt="Modern Style" className="mb-6 w-[25vw] md:ml-[70vw] ml-[65vw] mt-[4vh] absolute" />
      <div className="max-w-3xl mt-9">
        
        <h1 className="text-[8vw] font-bold mb-4">Modern Style</h1>
        <img src="img/jpeg.jpg" alt="Modern Style" className="mb-6 h-[22vh] md:h-[45vh] w-[30vw]  absolute" />
        <p className="text-[2vw] md:text-[1vw] mb-6 mt-[9vw] ml-[35vw]">
          Welcome to QAXEL — where luxury gets personal.
           We’re a home-grown fashion label redefining modern elegance for women who know exactly who they are — bold, effortless, and original.
        </p>
        <p className="text-[1.8vw] md:text-[1vw] mb-6 mt-[9vw] ml-[35vw]">
          SINCE
        </p>
        <h1 className='ml-[34vw] text-[24vw] mt-[-5vh] md:mt-[-18vh] text-[#fdffd4]'>2025</h1>
        <p className="text-[1.7vw] md:text-[1vw] mb-6 mt-[9vw] ml-[64vw] md:ml-[70vw] absolute mr-[5vw">
           We’re a home-grown fashion label redefining modern elegance for women who know exactly who they are — bold, effortless, and original.
        </p>
        <img src="img/model.png" alt="Signature" className="w-[22vw] md:w-[17vw] ml-[34vw] md:ml-[40vw] mt-[9vh] md:mt-[-4vh] absolute" />
        <p className="text-[1.7vw] w-[28vw] mt-[9vw] absolute ml-[5vw]">
           We’re a home-grown fashion label redefining modern elegance for women who know exactly who they are — bold, effortless, and original.
        </p>
        <h1 className='center ml-[0vh] md:ml-[20vw] text-[30vw] md:text-[20vw] mt-[16vh]'>QAXEL</h1>
        <div className="flex">
        <div className="flex">
        <ol className="text-[1vw] mt-[5vh] ml-[5vw] w-[28vw] absolute list-none ">
          <li>Collections</li>
          <li>Shop</li>
          <li>Contact Us</li>
        </ol>
        <ol className="text-[1vw] mt-[5vh] ml-[15vw] w-[28vw] absolute list-none ">
          <li>Story</li>
          <li>Sustainability</li>
          <li>About US</li>
        </ol>
        <ol className="text-[1vw] mt-[5vh] ml-[25vw] w-[28vw] absolute list-none ">
          <li>Highlights</li>
          <li>Ready to wear</li>
          <li>Accessories</li>
        </ol>
        </div>
        <div className="left flex gap-6 ml-[10vw]">
          <img src="img/blur1.jpg" alt="Signature" className="w-[8vw] h-[10vh] ml-[50vw] mt-[5vh] absolute" />
          <img src="img/blur2.jpg" alt="Signature" className="w-[8vw] h-[10vh] ml-[61vw] mt-[5vh] absolute" />
          <img src="img/blur3.jpg" alt="Signature" className="w-[8vw] h-[10vh] ml-[72vw] mt-[5vh] absolute" />
        </div>
        </div>
      </div>

      <div className="bg-[##F9FBC3] absolute ml-[-6vw] md:ml-[-2vw]">
        <img src="img/qaxel.png" alt="Signature" className="w-[100vw] h-[60vh] bg-[#F9FBC3]" />
      </div>
      </main>
    </>
  );
};

export default About;
