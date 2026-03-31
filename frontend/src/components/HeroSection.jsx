import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full relative">
      <div className="w-full relative">
        <img
          src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/kwr9qkp7_IMG_20260331_113038.png"
          alt="Premium Candles"
          className="w-full h-auto object-cover"
        />
        {/* Text Overlay - Centered and Protected */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/7k8z6twv_file_000000006c8471faada4194e7da73274.png"
            alt=""
            draggable="false"
            className="w-3/4 md:w-1/2 lg:w-2/5 h-auto object-contain pointer-events-none select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;