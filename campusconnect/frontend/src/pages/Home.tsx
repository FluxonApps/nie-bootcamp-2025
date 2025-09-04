import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";
import welcomeImage from "../assets/welcome.png";

interface User {
  name: string;
  username: string;
  email: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
          <h1>Welcome to Campus Connect</h1>
          {user && user.name ? (
            <h2>Hi, {user.name}! 🎉</h2>
          ) : (
            <h2>Hi, User! 🎉</h2>
          )}
          <p>Explore and connect with your peers 🚀</p>
        </div>

        <div className="buttons-section">
          <button
            className="btn connect-btn"
            onClick={() => navigate("/connect")}
          >
            🤝 Connect with People
          </button>
          <button
            className="btn group-btn"
            onClick={() => navigate("/create-group")}
          >
            👥 Create a Group
          </button>
          <button
            className="btn profile-btn"
            onClick={() => navigate("/profile")}
          >
            👤 Set Your Profile
          </button>
          <button className="btn logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
