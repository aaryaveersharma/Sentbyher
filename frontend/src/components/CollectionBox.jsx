import React from 'react';
import { Link } from 'react-router-dom';
import collectionImage from '../assets/collection-image.png';

const CollectionBox = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <Link to="/products">
        <div className="group relative bg-gray-50 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
          <div className="grid grid-cols-2 items-center gap-4 p-6 md:p-8 lg:p-12 min-h-[200px] md:min-h-[250px]">
            {/* Text Section */}
            <div>
              <p className="text-xs md:text-sm text-gray-400 mb-2 font-light tracking-wide">
                Explore Our Range
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:text-gray-700 transition-colors duration-300 font-serif">
                View our full<br />collection
              </h2>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center">
              <img
                src={collectionImage}
                alt="Candles"
                className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CollectionBox;
