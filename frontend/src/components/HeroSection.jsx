import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Main Large Image - Spans 2 columns on desktop */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1707839568938-f9b50bb88454?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGVzfGVufDB8fHx8MTc3NDkzNDAyMHww&ixlib=rb-4.1.0&q=85"
              alt="Premium Candles"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  Premium Candles.
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Two Images */}
        <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative h-48 md:h-72 lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1707839568483-9f1924d5f5de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYW5kbGVzfGVufDB8fHx8MTc3NDkzNDAyMHww&ixlib=rb-4.1.0&q=85"
              alt="Luxury Candle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl">
          <div className="relative h-48 md:h-72 lg:h-80">
            <img
              src="https://images.pexels.com/photos/6798396/pexels-photo-6798396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Luxury Candle Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;