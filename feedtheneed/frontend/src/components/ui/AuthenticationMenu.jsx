import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Mock AuthContext - replace with actual context
const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  logout: () => {}
});

const AuthenticationMenu = ({ isMobile = false, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock authentication state - replace with actual context
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeDropdown();
    if (onClose) onClose();
    navigate('/home-landing');
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeDropdown();
    if (onClose) onClose();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Mock user data - replace with actual user data
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'donor', // 'donor', 'recipient', 'admin'
    avatar: null
  };

  const currentUser = user || mockUser;
  const mockIsAuthenticated = isAuthenticated || false;

  if (isMobile) {
    if (!mockIsAuthenticated) {
      return (
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleNavigation('/login')}
            iconName="LogIn"
            iconPosition="left"
          >
            Sign In
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={() => handleNavigation('/registration')}
            iconName="UserPlus"
            iconPosition="left"
          >
            Get Started
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body font-semibold text-sm text-text-primary truncate">
              {currentUser?.name}
            </p>
            <p className="font-caption text-xs text-text-secondary truncate">
              {currentUser?.email}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => handleNavigation(
              currentUser?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'
            )}
            iconName="LayoutDashboard"
            iconPosition="left"
            className="justify-start"
          >
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            iconName="LogOut"
            iconPosition="left"
            className="justify-start text-destructive hover:text-destructive"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // Desktop version
  if (!mockIsAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          onClick={() => handleNavigation('/login')}
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
        <Button
          variant="default"
          onClick={() => handleNavigation('/registration')}
          iconName="UserPlus"
          iconPosition="left"
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden lg:block text-left">
          <p className="font-body font-semibold text-sm text-text-primary">
            {currentUser?.name}
          </p>
          <p className="font-caption text-xs text-text-secondary">
            {currentUser?.role === 'admin' ? 'Administrator' : 
             currentUser?.role === 'donor' ? 'Food Donor' : 'Recipient'}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-1001">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-text-primary truncate">
                  {currentUser?.name}
                </p>
                <p className="font-caption text-xs text-text-secondary truncate">
                  {currentUser?.email}
                </p>
                <p className="font-caption text-xs text-primary capitalize">
                  {currentUser?.role === 'admin' ? 'Administrator' : 
                   currentUser?.role === 'donor' ? 'Food Donor' : 'Recipient'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Button
              variant="ghost"
              fullWidth
              onClick={() => handleNavigation(
                currentUser?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'
              )}
              iconName="LayoutDashboard"
              iconPosition="left"
              className="justify-start mb-1"
            >
              Dashboard
            </Button>
            
            <Button
              variant="ghost"
              fullWidth
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              className="justify-start text-destructive hover:text-destructive"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationMenu;