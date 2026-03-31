import React from 'react';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      {/* Partner Ticker */}
      <div className="bg-black text-white py-4 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <span className="inline-block mx-8">Partner One</span>
          <span className="inline-block mx-8">Partner Two</span>
          <span className="inline-block mx-8">Partner Three</span>
          <span className="inline-block mx-8">Partner Four</span>
          <span className="inline-block mx-8">Partner Five</span>
          <span className="inline-block mx-8">Partner Six</span>
          <span className="inline-block mx-8">Partner One</span>
          <span className="inline-block mx-8">Partner Two</span>
          <span className="inline-block mx-8">Partner Three</span>
          <span className="inline-block mx-8">Partner Four</span>
          <span className="inline-block mx-8">Partner Five</span>
          <span className="inline-block mx-8">Partner Six</span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black tracking-tight mb-4">
              Luxury Candles
            </div>
            <p className="text-sm text-gray-600">© 2025 Sent By Her, Powered by Luxury.</p>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Help</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Member Login</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Exchange Return Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Story</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Our Stores</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Collaborations</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blogs</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm uppercase tracking-wider mb-4 md:mb-0">Connect</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors uppercase text-sm">
              <Instagram size={20} className="inline mr-2" />
              Instagram
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors uppercase text-sm">
              <Youtube size={20} className="inline mr-2" />
              Youtube
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors uppercase text-sm">
              <Linkedin size={20} className="inline mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;