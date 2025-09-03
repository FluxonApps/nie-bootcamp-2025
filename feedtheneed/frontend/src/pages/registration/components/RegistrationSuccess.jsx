import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = () => {
  const location = useLocation();
  const { email, role } = location.state || {};
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>
      
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Welcome to FeedTheNeed!
      </h2>
      
      <p className="text-text-secondary mb-6">
        Your account has been created successfully. We've sent a verification email to:
      </p>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <p className="font-medium text-text-primary">{email}</p>
      </div>
      
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <h4 className="font-medium text-text-primary mb-1">Check Your Email</h4>
            <p className="text-sm text-text-secondary">
              Click the verification link in your email to activate your account and start {role === 'donor' ? 'donating food' : 'receiving donations'}.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            fullWidth
            asChild
          >
            <Link to="/login">
              Sign In Instead
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            asChild
          >
            <Link to="/home-landing">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <h4 className="font-medium text-primary mb-2">What's Next?</h4>
        <ul className="text-sm text-text-secondary space-y-1 text-left">
          <li className="flex items-center">
            <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
            Verify your email address
          </li>
          <li className="flex items-center">
            <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
            Complete your profile setup
          </li>
          <li className="flex items-center">
            <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
            {role === 'donor' ? 'Start posting food donations' : 'Browse available donations'}
          </li>
        </ul>
      </div>
      
      <p className="text-xs text-text-secondary mt-6">
        Didn't receive the email? Check your spam folder or contact support.
      </p>
    </div>
  );
};

export default RegistrationSuccess;