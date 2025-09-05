// src/components/Navbar.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 👈 Added Link here
import "./Navbar.css";

import {
  HiSearch,
  HiPlusCircle,
  HiCheckCircle,
  HiHome,
  HiMenu,
  HiX,
  HiShoppingBag, // 👈 icon for Products
} from "react-icons/hi";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Home Link */}
        <Link to="/" className="navbar-logo">
          <HiHome />
          <span>Medico</span>
        </Link>

        {/* Search */}
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
          <Link to="/products" className="nav-link">
            <HiShoppingBag />
            <span>Products</span>
          </Link>
          <Link to="/add-product" className="nav-link">
            <HiPlusCircle />
            <span>Add Product</span>
          </Link>
          <Link to="/approve-products" className="nav-link">
            <HiCheckCircle />
            <span>Approve</span>
          </Link>
           <Link to="/favorites" className="nav-link">
    ❤️ <span>Favorites</span>
  </Link>
  <Link to="/login" className="nav-link">
    <span>Login</span>
  </Link>
  <Link to="/signup" className="nav-link">
    <span>Signup</span>
  </Link>


        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={isMobileMenuOpen ? "mobile-menu active" : "mobile-menu"}>
        <Link to="/" className="mobile-link">
          Home
        </Link>
        <Link to="/products" className="mobile-link">
          Products
        </Link>
        <Link to="/add-product" className="mobile-link">
          Add Product
        </Link>
        <Link to="/approve-products" className="mobile-link">
          Approve Products
        </Link>
         <Link to="/favorites" className="mobile-link">Favorites</Link>
  <Link to="/login" className="mobile-link">Login</Link>
  <Link to="/signup" className="mobile-link">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
