import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-20 lg:py-32 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-text-primary">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-text-secondary mb-10">
          Join our community today and start helping reduce food waste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" size="lg" onClick={() => navigate('/registration')}>
            Get Started
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
