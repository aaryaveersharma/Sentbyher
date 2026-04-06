import React from 'react';
import Navbar from '../components/Navbar';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const ProductsPage = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
          Our Collection
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our premium luxury candles, handcrafted with care and natural ingredients.
        </p>
      </div>
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default ProductsPage;
