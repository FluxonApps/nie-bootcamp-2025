import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: '',
    address: '',
    phone: ''
  });

  const roleOptions = [
    { value: 'donor', label: 'Donor' },
    { value: 'recipient', label: 'Recipient' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
    
    if (errors.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username?.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8002/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role,
          name: formData.name || undefined,
          address: formData.address || undefined,
          phone: formData.phone || undefined
        })
      });

      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (textError) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      let userData;
      try {
        userData = await response.json();
      } catch (parseError) {
        // If response is empty or not JSON, create a mock response
        userData = { username: formData.username, role: formData.role };
      }
      
      // Redirect to success page
      navigate('/registration/success', { 
        state: { 
          user: userData,
          email: formData.username // Assuming username is email for display
        }
      });
      
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Create Account</h2>
        <p className="text-text-secondary">
          Join our community to start sharing or receiving food donations
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          description="Optional - for display purposes"
        />
        
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username or email"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username}
          required
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />
        
        <PasswordStrengthIndicator password={formData.password} />
        
        <Select
          label="Role"
          options={roleOptions}
          value={formData.role}
          onChange={handleRoleChange}
          placeholder="Select your role"
          error={errors.role}
          required
        />
        
        <Input
          label="Address"
          type="text"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleInputChange}
          description="Optional - for location-based matching"
        />
        
        <Input
          label="Phone"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange}
          description="Optional - for contact purposes"
        />
        
        {errors.submit && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{errors.submit}</p>
          </div>
        )}
        
        <Button
          type="submit"
          variant="default"
          className="w-full"
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
