import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        <img
          src="https://customer-assets.emergentagent.com/job_premium-candles-4/artifacts/exdzvwr1_file_00000000c93871fa8f8f65a260ab15ec.png"
          alt="Sent By Her Premium Candles"
          className="w-full h-auto object-cover"
          draggable="false"
          style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </section>
  );
};

export default HeroSection;