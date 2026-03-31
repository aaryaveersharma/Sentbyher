import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        <img
          src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/2n8d2yvl_IMG_20260331_123257.png"
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
      </div>
    </section>
  );
};

export default HeroSection;