import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showLogout = location.pathname === "/home";

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/"); 
  };

  return (
    <header style={{ padding: "1rem", display: "flex", justifyContent: "space-between", backgroundColor: theme === "light" ? "#f0f0f0" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <div><strong>Campus Connect</strong></div>
      <div>
        <button onClick={toggleTheme} style={{ marginRight: "10px", cursor: "pointer" }}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        {showLogout && <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
