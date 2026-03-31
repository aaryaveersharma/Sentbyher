import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm font-medium tracking-wider">
        SENT BY HER COLLECTION
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-black">SENT</span>
                <span className="bg-black text-white px-2 rounded-sm ml-1">BY HER</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-sm font-medium hover:text-gray-600 transition-colors duration-200">
                LOGIN / REGISTER
              </button>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-gray-600 transition-colors duration-200"
              >
                <Search size={20} />
              </button>
              <button className="hover:text-gray-600 transition-colors duration-200">
                <Heart size={20} />
              </button>
              <Link to="/cart" className="relative hover:text-gray-600 transition-colors duration-200">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden hover:text-gray-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 px-4 bg-white">
            <div className="flex flex-col space-y-4">
              <button className="text-sm font-medium text-left hover:text-gray-600 transition-colors duration-200">
                LOGIN / REGISTER
              </button>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200"
              >
                <Search size={20} />
                <span className="text-sm">Search</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200">
                <Heart size={20} />
                <span className="text-sm">Wishlist</span>
              </button>
              <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200">
                <ShoppingCart size={20} />
                <span className="text-sm">Cart ({cartItemsCount})</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;