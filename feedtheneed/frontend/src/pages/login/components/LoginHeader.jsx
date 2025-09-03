import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <Link 
        to="/home-landing" 
        className="inline-flex items-center space-x-3 mb-8 transition-smooth hover:opacity-80"
      >
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Heart" size={28} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            FeedTheNeed
          </h1>
          <p className="text-sm text-text-secondary -mt-1">
            Serving Hope, One Plate at a Time
          </p>
        </div>
      </Link>

      {/* Page Title */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">
          Sign In to Your Account
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Continue your journey of making a difference in your community through food sharing
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
