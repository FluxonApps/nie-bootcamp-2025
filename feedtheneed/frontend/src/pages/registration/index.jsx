import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import RoleSelectionCard from './components/RoleSelectionCard';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import OrganizationFields from './components/OrganizationFields';
import IndividualFields from './components/IndividualFields';
import RegistrationSuccess from './components/RegistrationSuccess';

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Information
    selectedRole: '',
    accountType: 'individual', // 'individual' or 'organization'
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Individual Fields
    phone: '',
    dateOfBirth: '',
    address: '',
    motivation: '',
    householdSize: '',
    emergencyContact: '',
    governmentId: '',
    
    // Organization Fields
    organizationName: '',
    organizationType: '',
    organizationSize: '',
    taxId: '',
    organizationAddress: '',
    contactPerson: '',
    organizationPhone: '',
    website: '',
    
    // Legal
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false
  });
  
  const [errors, setErrors] = useState({});

  const roleOptions = {
    donor: {
      title: 'Food Donor',
      description: 'Share surplus food with those in need',
      icon: 'Heart',
      benefits: [
        'Reduce food waste and environmental impact',
        'Help feed families in your community',
        'Track your donation impact',
        'Connect with local recipients',
        'Tax deduction documentation'
      ]
    },
    recipient: {
      title: 'Food Recipient',
      description: 'Access fresh food donations in your area',
      icon: 'Users',
      benefits: [
        'Access to fresh, quality food',
        'Browse nearby food donations',
        'Schedule convenient pickups',
        'Connect with local donors',
        'Build community relationships'
      ]
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      selectedRole: role
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData?.selectedRole) {
        newErrors.selectedRole = 'Please select your role';
      }
    }
    
    if (step === 2) {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 3) {
      if (formData?.accountType === 'organization') {
        if (!formData?.organizationName?.trim()) {
          newErrors.organizationName = 'Organization name is required';
        }
        if (!formData?.organizationType) {
          newErrors.organizationType = 'Organization type is required';
        }
        if (!formData?.organizationAddress?.trim()) {
          newErrors.organizationAddress = 'Organization address is required';
        }
        if (!formData?.contactPerson?.trim()) {
          newErrors.contactPerson = 'Contact person is required';
        }
        if (!formData?.organizationPhone?.trim()) {
          newErrors.organizationPhone = 'Organization phone is required';
        }
      } else {
        if (!formData?.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData?.address?.trim()) {
          newErrors.address = 'Address is required';
        }
      }
    }
    
    if (step === 4) {
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms of service';
      }
      if (!formData?.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      setShowSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      // Mock resend verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      console.error('Failed to resend verification');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4]?.map((step) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep
              ? 'bg-primary text-white' : 'bg-muted text-text-secondary'
          }`}>
            {step < currentStep ? (
              <Icon name="Check" size={16} />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Choose Your Role</h2>
        <p className="text-text-secondary">
          Select how you'd like to participate in our food sharing community
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(roleOptions)?.map(([role, config]) => (
          <RoleSelectionCard
            key={role}
            role={role}
            isSelected={formData?.selectedRole === role}
            onSelect={handleRoleSelect}
            {...config}
          />
        ))}
      </div>
      
      {errors?.selectedRole && (
        <p className="text-destructive text-sm text-center">{errors?.selectedRole}</p>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Basic Information</h2>
        <p className="text-text-secondary">
          Tell us about yourself to create your account
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          required
        />
      </div>
      
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        description="We'll use this to send you important updates"
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Create a strong password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
      />
      
      <PasswordStrengthIndicator password={formData?.password} />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
        required
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Account Details</h2>
        <p className="text-text-secondary">
          Help us customize your experience
        </p>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium text-text-primary mb-3">Account Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              formData?.accountType === 'individual' ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="User" size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-text-primary">Individual</h4>
                <p className="text-sm text-text-secondary">Personal account</p>
              </div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, accountType: 'organization' }))}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              formData?.accountType === 'organization' ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Building" size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-text-primary">Organization</h4>
                <p className="text-sm text-text-secondary">Business or nonprofit</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      
      {formData?.accountType === 'organization' ? (
        <OrganizationFields
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      ) : (
        <IndividualFields
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Terms & Conditions</h2>
        <p className="text-text-secondary">
          Please review and accept our terms to complete registration
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <Checkbox
          label="I agree to the Terms of Service"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          description={
            <span>
              I have read and agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </span>
          }
          required
        />
        
        <Checkbox
          label="I agree to the Privacy Policy"
          name="agreeToPrivacy"
          checked={formData?.agreeToPrivacy}
          onChange={handleInputChange}
          error={errors?.agreeToPrivacy}
          description={
            <span>
              I have read and agree to the{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          }
          required
        />
        
        <Checkbox
          label="I'd like to receive marketing communications"
          name="agreeToMarketing"
          checked={formData?.agreeToMarketing}
          onChange={handleInputChange}
          description="Get updates about new features, success stories, and community events (optional)"
        />
      </div>
      
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Your Data is Safe</h4>
            <p className="text-sm text-text-secondary">
              We use industry-standard encryption to protect your personal information. 
              Your data will never be sold to third parties.
            </p>
          </div>
        </div>
      </div>
      
      {errors?.submit && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">{errors?.submit}</p>
        </div>
      )}
    </div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Registration Successful - PlateFullPromise</title>
          <meta name="description" content="Your PlateFullPromise account has been created successfully. Please verify your email to get started." />
        </Helmet>
        <NavigationHeader />
        <main className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-12">
              <RegistrationSuccess
                email={formData?.email}
                role={formData?.selectedRole}
                onResendVerification={handleResendVerification}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - PlateFullPromise</title>
        <meta name="description" content="Join PlateFullPromise to start donating or receiving food in your community. Create your account in just a few simple steps." />
      </Helmet>
      <NavigationHeader />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="text-center mb-8">
              <Link to="/home-landing" className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">PlateFullPromise</h1>
                  <p className="text-sm text-text-secondary">Nourishing Communities</p>
                </div>
              </Link>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-soft p-8">
              {renderStepIndicator()}
              
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        iconName="ChevronLeft"
                        iconPosition="left"
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleNextStep}
                        iconName="ChevronRight"
                        iconPosition="right"
                        disabled={currentStep === 1 && !formData?.selectedRole}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="default"
                        loading={isLoading}
                        iconName="UserPlus"
                        iconPosition="left"
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-text-secondary">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;