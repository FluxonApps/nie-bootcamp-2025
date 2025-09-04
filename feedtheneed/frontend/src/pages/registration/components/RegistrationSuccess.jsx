import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = () => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>
      
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Registration Successful!
      </h2>
      
      <p className="text-text-secondary mb-8">
        Your account has been created successfully. You can now sign in to start using FeedTheNeed.
      </p>
      
      <Button
        variant="default"
        className="w-full"
        asChild
      >
        <Link to="/login">
          Go to Login
        </Link>
      </Button>
    </div>
  );
};

export default RegistrationSuccess;