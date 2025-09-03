import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@platefullpromise.com', password: 'admin123' },
    donor: { email: 'donor@example.com', password: 'donor123' },
    recipient: { email: 'recipient@example.com', password: 'recipient123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      const { email, password } = formData;
      let userRole = null;
      let isValidCredentials = false;

      // Check against mock credentials
      Object.entries(mockCredentials)?.forEach(([role, credentials]) => {
        if (email === credentials?.email && password === credentials?.password) {
          userRole = role;
          isValidCredentials = true;
        }
      });

      if (!isValidCredentials) {
        setErrors({
          general: `Invalid credentials. Try: ${mockCredentials?.admin?.email} / ${mockCredentials?.admin?.password} (Admin) or ${mockCredentials?.donor?.email} / ${mockCredentials?.donor?.password} (Donor)`
        });
        return;
      }

      // Mock JWT token creation
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        email,
        role: userRole,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      }))}.mock-signature`;

      // Store token in localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userRole', userRole);

      // Role-based redirection
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      setErrors({
        general: 'Login failed. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary text-sm">
            Sign in to your PlateFullPromise account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive leading-relaxed">
                  {errors?.general}
                </p>
              </div>
            </div>
          )}

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-text-secondary">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Registration Link */}
        <div className="text-center">
          <Link to="/registration">
            <Button
              variant="outline"
              fullWidth
              iconName="UserPlus"
              iconPosition="left"
            >
              Create Account
            </Button>
          </Link>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs text-text-secondary text-center mb-2">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-text-secondary">
            <p><strong>Admin:</strong> {mockCredentials?.admin?.email} / {mockCredentials?.admin?.password}</p>
            <p><strong>Donor:</strong> {mockCredentials?.donor?.email} / {mockCredentials?.donor?.password}</p>
            <p><strong>Recipient:</strong> {mockCredentials?.recipient?.email} / {mockCredentials?.recipient?.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;