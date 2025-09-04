import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBackground from './components/LoginBackground';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import { useAuth } from '../../context/AuthContext'; // Correctly import the hook

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Get user state and login function from our context
  const [error, setError] = useState(''); // State to manage login errors passed to the form

  // This useEffect handles redirecting a user who is ALREADY logged in.
  useEffect(() => {
    if (user && user.role) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'recipient') {
        navigate('/recipient-dashboard');
      } else {
        // For roles not implemented yet (e.g., donor), send to home for now
        navigate('/');
      }
    }
  }, [user, navigate]);

  // This function will be passed to LoginForm to handle the form submission.
  const handleLogin = async (username, password) => {
    setError(''); // Clear previous errors
    const result = await login(username, password); // Call the login function from AuthContext

    // If the login fails, the context will return an error message.
    if (!result.success) {
      setError(result.message);
    }
    // If successful, the useEffect above will trigger the redirect automatically.
  };

  return (
    <LoginBackground>
      <div className="space-y-8">
        <LoginHeader />
        {/* Pass the handler and error state as props to the form component */}
        <LoginForm onLogin={handleLogin} loginError={error} />
      </div>
    </LoginBackground>
  );
};

export default LoginPage;