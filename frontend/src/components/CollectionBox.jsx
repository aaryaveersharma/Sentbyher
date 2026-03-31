import React from 'react';
import { Link } from 'react-router-dom';

const CollectionBox = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/products">
        <div className="group relative bg-gray-50 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[300px] md:min-h-[400px]">
            {/* Text Section */}
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-medium">
                Explore Our Range
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                View our full collection
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8">
                Discover our curated selection of premium, hand-poured candles crafted with natural ingredients.
              </p>
              <div className="inline-flex items-center space-x-2 text-black font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Shop Now</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative h-64 md:h-full flex items-center justify-center p-8 bg-white">
              <img
                src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/m1mipi9e_images%20%281%29%20%282%29.png"
                alt="Luxury Candle Collection"
                className="w-full max-w-md h-auto object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CollectionBox;
