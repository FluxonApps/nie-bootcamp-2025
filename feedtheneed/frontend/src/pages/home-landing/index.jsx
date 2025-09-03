import React from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import Footer from './components/Footer';

const HomeLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="pt-20">
        <HeroSection />
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomeLanding;
