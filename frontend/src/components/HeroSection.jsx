import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-white to-stone-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo/Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <img
              src="https://customer-assets.emergentagent.com/job_90047c4d-ea0f-4a2a-8cd3-253bb17c8800/artifacts/u9vrk4x2_Screenshot_2026-03-30-23-10-40-74_1c337646f29875672b5a61192b9010f9.png"
              alt="Sent By Her Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            Premium Candles.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Hand-poured luxury candles crafted with natural ingredients for an unforgettable sensory experience.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-700">
              <Sparkles size={20} className="text-amber-600" />
              <span className="text-sm md:text-base font-medium">100% Natural Wax</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Sparkles size={20} className="text-amber-600" />
              <span className="text-sm md:text-base font-medium">Hand-Poured</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Sparkles size={20} className="text-amber-600" />
              <span className="text-sm md:text-base font-medium">Premium Fragrance</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/products"
            className="inline-block bg-black text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-base md:text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-stone-200 rounded-full opacity-20 blur-xl"></div>
    </section>
  );
};

export default HeroSection;