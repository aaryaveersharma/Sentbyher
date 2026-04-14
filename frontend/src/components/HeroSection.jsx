import React from 'react';
import heroImage from '../assets/hero-image.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full relative">
      <div className="w-full relative">
        <img
          src={heroImage}
          alt="Sent By Her Premium Candles"
          className="w-full h-auto object-cover pointer-events-none select-none"
          draggable="false"
          style={{ 
            userSelect: 'none', 
            WebkitUserSelect: 'none', 
            MozUserSelect: 'none', 
            msUserSelect: 'none',
            WebkitTouchCallout: 'none',
            pointerEvents: 'none'
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        />

        {/* Quick Actions Component */}
        <div className="absolute right-0 top-[20%] w-48 hidden md:block z-10 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-sm text-black rounded-l-lg p-4 shadow-lg border border-r-0 border-gray-200 hover:translate-x-0 translate-x-2 transition-transform">
            <h3 className="font-serif text-sm uppercase tracking-wider mb-2 border-b border-gray-200 pb-2">Quick Actions</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link to="/products" className="hover:text-black hover:underline transition-all block">→ Shop Now</Link></li>
              <li><Link to="/my-orders" className="hover:text-black hover:underline transition-all block">→ View My Orders</Link></li>
              <li><a href="#about" className="hover:text-black hover:underline transition-all block">→ Contact / About</a></li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;