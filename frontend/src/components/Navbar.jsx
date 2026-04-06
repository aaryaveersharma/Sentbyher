import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const { cart } = useCart();

  const bannerTexts = [
    'LUXURY CANDLES BY SENT BY HER',
    'HANDCRAFTED WITH NATURAL INGREDIENTS',
    'FREE SHIPPING ON ORDERS OVER ₹1999',
    'PREMIUM FRAGRANCE COLLECTION'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % bannerTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerTexts.length]);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Top Banner with Flipping Text */}
      <div className="bg-black text-white text-center py-2 overflow-hidden relative h-8">
        <div className="absolute inset-0 flex items-center justify-center">
          {bannerTexts.map((text, index) => (
            <div
              key={index}
              className={`absolute text-sm font-medium tracking-widest uppercase transition-all duration-500 ${
                index === currentText
                  ? 'opacity-100 translate-y-0'
                  : index === (currentText - 1 + bannerTexts.length) % bannerTexts.length
                  ? 'opacity-0 -translate-y-full'
                  : 'opacity-0 translate-y-full'
              }`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:text-gray-600 transition-colors duration-200"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            {/* Empty center space */}
            <div></div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <Search size={24} strokeWidth={1.5} />
              </button>
              <Link to="/cart" className="relative hover:text-gray-600 transition-colors duration-200">
                <ShoppingCart size={24} strokeWidth={1.5} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4 px-4">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Side Menu Drawer */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl overflow-y-auto">
              <div className="p-6">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-6 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                
                <div className="mt-12 space-y-6">
                  <Link 
                    to="/" 
                    className="block text-lg font-medium hover:text-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/products" 
                    className="block text-lg font-medium hover:text-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block text-lg font-medium hover:text-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <a href="#" className="block text-lg font-medium hover:text-gray-600 transition-colors">
                    About Us
                  </a>
                  <a href="#" className="block text-lg font-medium hover:text-gray-600 transition-colors">
                    Contact
                  </a>
                  <div className="pt-6 border-t border-gray-200">
                    <Link to="/login" className="block text-sm text-gray-600 hover:text-black transition-colors" onClick={() => setIsMenuOpen(false)}>
                      Login / Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;