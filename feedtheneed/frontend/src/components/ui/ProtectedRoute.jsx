import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Mock AuthContext - replace with actual context
const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  loading: false
});

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectPath = '/login',
  requireAuth = true 
}) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Mock authentication state - replace with actual context values
  const mockIsAuthenticated = isAuthenticated || false;
  const mockUser = user || { role: 'donor' }; // Mock user with role
  const mockLoading = loading || false;

  // Show loading state while checking authentication
  if (mockLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !mockIsAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles?.length > 0 && mockIsAuthenticated) {
    const userRole = mockUser?.role;
    
    if (!userRole || !allowedRoles?.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      const defaultRedirect = userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard';
      return <Navigate to={defaultRedirect} replace />;
    }
  }

  // If all checks pass, render the protected component
  return children;
};

// Higher-order component for easier usage
export const withProtectedRoute = (Component, options = {}) => {
  const WrappedComponent = (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
  
  return WrappedComponent;
};

// Specific route protection components for common use cases
export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']} redirectPath="/user-dashboard">
    {children}
  </ProtectedRoute>
);

export const DonorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['donor']} redirectPath="/login">
    {children}
  </ProtectedRoute>
);

export const RecipientRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['recipient']} redirectPath="/login">
    {children}
  </ProtectedRoute>
);

export const AuthenticatedRoute = ({ children }) => (
  <ProtectedRoute requireAuth={true} redirectPath="/login">
    {children}
  </ProtectedRoute>
);

export const PublicRoute = ({ children, redirectIfAuthenticated = false, redirectPath = '/user-dashboard' }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const mockIsAuthenticated = isAuthenticated || false;
  const mockUser = user || { role: 'donor' };

  if (redirectIfAuthenticated && mockIsAuthenticated) {
    const defaultRedirect = mockUser?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    return <Navigate to={redirectPath || defaultRedirect} replace />;
  }

  return children;
};

export default ProtectedRoute;