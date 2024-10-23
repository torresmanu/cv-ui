import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import MarketStats from './MarketStats';
import HomePartners from './HeroPartners';

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <MarketStats />
      <HomePartners />
      <FeaturesSection />
      </>
  );
};

export default Homepage;