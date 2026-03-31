import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCards />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;