import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandIntroduction from '../components/BrandIntroduction';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-[#FAF9F6]">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <BrandIntroduction />
      <Footer />
    </div>
  );
};

export default Home;