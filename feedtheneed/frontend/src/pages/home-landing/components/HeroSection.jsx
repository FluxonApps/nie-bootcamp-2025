import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Welcome to <span className="text-primary">FeedTheNeed</span>
              <br /> Serving Hope, One Plate at a Time
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0">
              Connecting surplus food with those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('/registration')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                alt="Community volunteers preparing food donations"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
