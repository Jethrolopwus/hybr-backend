'use client'

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Logo from "@/app/public/hybr.png"
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between w-full px-6">
        <Link href="/">
        <div className="flex items-center gap-2">
            <div className="h-20 w-20 flex items-center justify-center">
            <Image src={Logo} alt="Brand" />
            </div>
            <span className="text-lg font-semi-bold bg-clip-text text-[#0675a8]">
             Solutions
            </span>
          </div>
        </Link>
          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-grow justify-center">
            <a href="#benefits" className="font-medium text-gray-700 hover:text-gray-900 transition">Assesments</a>
            <a href="#waitlist" className="font-medium text-gray-700 hover:text-gray-900 transition">ResultCharts</a>
           
          </nav>
          <div className=''>
          <button className="px-6 py-2 rounded-lg  bg-[rgb(165,218,92)] text-gray-900 font-medium hover:brightness-105 transition shadow-lg">
              Join Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col gap-4">

            <a href="#benefits" className="font-medium text-gray-700 hover:text-gray-900 transition py-2">Assesments</a>
            <a href="#waitlist" className="font-medium text-gray-700 hover:text-gray-900 transition py-2">ResultCharts</a>
            <button className="mt-2 px-6 py-3 rounded-full bg-[#c4fc74] text-gray-900 font-medium hover:brightness-105 transition shadow-lg">
              Join US
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
