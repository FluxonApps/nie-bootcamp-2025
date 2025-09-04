// src/components/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //
import './Navbar.css';

// Importing icons from Heroicons pack
import { HiSearch, HiPlusCircle, HiCheckCircle, HiHome, HiMenu, HiX } from 'react-icons/hi';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate(); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) { // Check if searchTerm is not empty
      navigate(`/search?q=${searchTerm}`); // Navigate to the search page with the query
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Home Link */}
        <a href="/" className="navbar-logo">
          <HiHome />
          <span>Medico</span>
        </a>

        {/* 5. Changed div to a form and added onSubmit */}
        <form className="search-container" onSubmit={handleSearch}>
          <HiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products by name or brand..."
            className="search-input"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </form>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <a href="/add-product" className="nav-link">
            <HiPlusCircle />
            <span>Add Product</span>
          </a>
          <a href="/approve-products" className="nav-link">
            <HiCheckCircle />
            <span>Approve</span>
          </a>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={isMobileMenuOpen ? "mobile-menu active" : "mobile-menu"}>
        <a href="/" className="mobile-link">Home</a>
        <a href="/add-product" className="mobile-link">Add Product</a>
        <a href="/approve-products" className="mobile-link">Approve Products</a>
      </div>
    </nav>
  );
};

export default Navbar;
