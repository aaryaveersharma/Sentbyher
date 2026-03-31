import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full relative">
      {/* Red candle background image */}
      <div className="w-full relative">
        <img
          src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/kwr9qkp7_IMG_20260331_113038.png"
          alt="Premium Candles"
          className="w-full h-auto object-cover pointer-events-none select-none"
          draggable="false"
          style={{ 
            userSelect: 'none', 
            WebkitUserSelect: 'none', 
            MozUserSelect: 'none', 
            msUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        
        {/* White text overlay - Centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/exdzvwr1_file_00000000c93871fa8f8f65a260ab15ec.png"
            alt=""
            draggable="false"
            className="w-3/4 md:w-2/3 lg:w-1/2 h-auto object-contain pointer-events-none select-none"
            style={{ 
              userSelect: 'none', 
              WebkitUserSelect: 'none', 
              MozUserSelect: 'none', 
              msUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;