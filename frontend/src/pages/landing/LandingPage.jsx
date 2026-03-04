import React from 'react';
import Navbar from './sections/Navbar';
import ScrollHero from './sections/ScrollHero';
import HowItWorks from './sections/HowItWorks';
import ValueProp from './sections/ValueProp';
import Pricing from './sections/Pricing';
import BottomCTA from './sections/BottomCTA';
import Footer from './sections/Footer';

function LandingPage() {
  return (
    <div
      style={{ backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}
    >
      <Navbar />
      <ScrollHero />
      <HowItWorks />
      <ValueProp />
      <Pricing />
      <BottomCTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
