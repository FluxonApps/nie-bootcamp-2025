import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">© {year} PlateFullPromise. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/registration" className="hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
