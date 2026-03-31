import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CollectionBox from '../components/CollectionBox';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CollectionBox />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;