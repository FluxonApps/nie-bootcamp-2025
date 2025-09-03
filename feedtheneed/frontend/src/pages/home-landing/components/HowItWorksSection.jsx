import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    { step: "01", icon: "UserPlus", title: "Sign Up", description: "Register as a donor or recipient." },
    { step: "02", icon: "MapPin", title: "Connect", description: "Find local matches near you." },
    { step: "03", icon: "Heart", title: "Make Impact", description: "Donate food and help your community." }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-text-primary mb-12">
          How It <span className="text-primary">Works</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-8 text-center shadow-soft">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name={step.icon} size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
