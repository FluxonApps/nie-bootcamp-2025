import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../pages/Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // ✅ Show logout only on "/home"
  const showLogout = location.pathname === "/home";

  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <header className={`main-header ${theme}`}>
      <div className="logo" onClick={() => navigate("/")}>
        Campus <span>Connect</span>
      </div>

      {/* ✅ Show welcome message only on Home */}
      {showLogout && user && (
        <div className="welcome-text">Hi, {user.name} 👋</div>
      )}

      <div className="header-buttons">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* ✅ Show logout only on /home */}
        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
