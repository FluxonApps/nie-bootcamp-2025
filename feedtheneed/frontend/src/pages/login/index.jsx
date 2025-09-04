import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBackground from './components/LoginBackground';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole) {
      // Redirect to appropriate dashboard if already logged in
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [navigate]);

  return (
    <LoginBackground>
      <div className="space-y-8">
        <LoginHeader />
        <LoginForm />
      </div>
    </LoginBackground>
  );
};

export default LoginPage;