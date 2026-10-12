import React from 'react';
import HeroSlider from './HeroSlider';
import ParticleBackground from './ParticleBackground';

const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <ParticleBackground />
      <HeroSlider />
    </section>
  );
};

export default HeroSection;
