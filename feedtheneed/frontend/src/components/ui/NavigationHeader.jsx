import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import AuthenticationMenu from './AuthenticationMenu';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const publicNavItems = [
    { label: 'About', path: '/home-landing#about', hash: 'about' },
    { label: 'How It Works', path: '/home-landing#how-it-works', hash: 'how-it-works' },
    { label: 'Contact', path: '/home-landing#contact', hash: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path?.includes('#')) {
      return location?.pathname === '/home-landing';
    }
    return location?.pathname === path;
  };

  const handleNavClick = (item, e) => {
    if (item?.hash && location?.pathname === '/home-landing') {
      e?.preventDefault();
      const element = document.getElementById(item?.hash);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-1000">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/home-landing" 
              className="flex items-center space-x-3 transition-smooth hover:opacity-80"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-primary">
                  PlateFullPromise
                </h1>
                <p className="text-xs font-caption text-text-secondary -mt-1">
                  Nourishing Communities
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {publicNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={(e) => handleNavClick(item, e)}
                className={`font-body font-normal text-sm transition-smooth hover:text-primary ${
                  isActivePath(item?.path)
                    ? 'text-primary font-semibold' :'text-text-primary'
                }`}
              >
                {item?.label}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication Menu */}
          <div className="hidden md:block">
            <AuthenticationMenu onClose={closeMobileMenu} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-text-primary hover:text-primary"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-elevated z-1001">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-3">
                {publicNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`block font-body font-normal text-base py-2 transition-smooth hover:text-primary ${
                      isActivePath(item?.path)
                        ? 'text-primary font-semibold' :'text-text-primary'
                    }`}
                  >
                    {item?.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Authentication Menu */}
              <div className="pt-4 border-t border-border">
                <AuthenticationMenu isMobile={true} onClose={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavigationHeader;