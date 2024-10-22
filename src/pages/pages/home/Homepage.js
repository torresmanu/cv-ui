import React from 'react';
import { Box } from '@material-ui/core';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import MarketStats from './MarketStats';
import DashboardPreview from './DashboardPreview';
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