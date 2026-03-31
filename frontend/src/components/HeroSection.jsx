import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Main Large Image - Spans 2 columns on desktop */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-lg">
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1707839568938-f9b50bb88454?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGVzfGVufDB8fHx8MTc3NDkzNDAyMHww&ixlib=rb-4.1.0&q=85"
              alt="Premium Candles"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
                  Premium Candles
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Two Images */}
        <div className="relative group overflow-hidden rounded-lg">
          <div className="relative h-48 md:h-72 lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1707839568483-9f1924d5f5de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYW5kbGVzfGVufDB8fHx8MTc3NDkzNDAyMHww&ixlib=rb-4.1.0&q=85"
              alt="Luxury Candle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-lg">
          <div className="relative h-48 md:h-72 lg:h-80">
            <img
              src="https://images.pexels.com/photos/6798396/pexels-photo-6798396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Luxury Candle Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Center Logo Circle - Positioned between images */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-white">
          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center p-2 md:p-3">
            <img
              src="https://customer-assets.emergentagent.com/job_90047c4d-ea0f-4a2a-8cd3-253bb17c8800/artifacts/u9vrk4x2_Screenshot_2026-03-30-23-10-40-74_1c337646f29875672b5a61192b9010f9.png"
              alt="Sent By Her Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;