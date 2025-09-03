import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>Campus Connect</h1>
      <nav>
        <Link to="/" style={linkStyle}>Sign In</Link> | 
        <Link to="/signup" style={linkStyle}>Sign Up</Link>
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#0077ff",
  color: "white",
  padding: "1rem",
  textAlign: "center",
};

const linkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  margin: "0 0.5rem",
};

export default Header;
