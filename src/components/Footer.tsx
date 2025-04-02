import { Send, Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Logo from "@/app/public/hybr.png"

const Footer = () => {
  return (
    <footer className="bg-[#f8f7f5] text-[#373742]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-20 w-20  flex items-center justify-center">
              <Image src={Logo} alt="Brand" />
              </div>
              <span className="text-lg  font-semi-bold text-[#0675a8]">Solutions</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              HYBR is a scaling solutions transforms ideas, products, services, Solutions and organisations into innovations Leaaders
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#c4fc74] hover:text-gray-900 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full  flex items-center justify-center hover:bg-[#c4fc74] hover:text-gray-900 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full  flex items-center justify-center hover:bg-[#c4fc74] hover:text-gray-900 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition">Assesments</a></li>
              <li><a href="#waitlist" className="text-gray-400 hover:text-white transition">ResultCharts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">hybrgroup.net</li>
              <li className="text-gray-400">+234 800 HYBR</li>
              <li className="text-gray-400">Lagos, Nigeria</li>
            </ul>
            <div className="mt-6">
              <button className="px-6 py-2 rounded-lg bg-[rgb(157,209,84)] text-gray-900 font-medium hover:brightness-105 transition flex items-center gap-2">
                <Send size={16} /> Join Us
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2025 HYBR Send. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;