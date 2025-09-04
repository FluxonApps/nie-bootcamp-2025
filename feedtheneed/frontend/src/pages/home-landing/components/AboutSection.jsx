import React from 'react';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
          About <span className="text-primary">PlateFullPromise</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mb-12">
          Our mission is to bridge the gap between food surplus and food insecurity. 
          Restaurants, grocery stores, and individuals can donate extra food, while 
          shelters and food banks can access it safely and efficiently.
        </p>

        <div className="rounded-2xl shadow-elevated overflow-hidden max-w-4xl mx-auto">
          <Image
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Volunteers organizing food donations"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
