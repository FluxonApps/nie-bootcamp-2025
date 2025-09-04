import React from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';

const Registration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - FeedTheNeed</title>
        <meta name="description" content="Join FeedTheNeed to start donating or receiving food in your community. Create your account in just a few simple steps." />
      </Helmet>
      <NavigationHeader />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">FeedTheNeed</h1>
                  <p className="text-sm text-text-secondary">Nourishing Communities</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-soft p-8">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;