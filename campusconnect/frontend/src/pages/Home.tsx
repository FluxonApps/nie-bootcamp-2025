import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface User {
  username: string;
  userId: string;
  _id: string;
  message: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        {/* Top Welcome Section */}
        {user && (
          <div className="welcome-section">
            <h1>Hi, {user.username}! 👋</h1>
            <p>Welcome back to Campus Connect 🚀</p>
          </div>
        )}

        {/* Flipping Feature Cards */}
        <div className="features-container">
          {/* Create Group Card */}
          <div className="flip-card" onClick={() => navigate("/groups")}>
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
                  alt="Create Group"
                />
                <h3>Create Group</h3>
              </div>
              {/* Back */}
              <div className="flip-card-back">
                <h4>Why Create Groups?</h4>
                <ul>
                  <li>🟢 Start private or public groups</li>
                  <li>🟢 Collaborate on projects</li>
                  <li>🟢 Share files & resources</li>
                  <li>🟢 Build your network</li>
                </ul>
                <button>Explore</button>
              </div>
            </div>
          </div>

          {/* Connections Card */}
          <div className="flip-card" onClick={() => navigate("/connect")}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                  alt="Connections"
                />
                <h3>Connections</h3>
              </div>
              <div className="flip-card-back">
                <h4>Why Connect?</h4>
                <ul>
                  <li>🟢 Find like-minded people</li>
                  <li>🟢 Grow your professional circle</li>
                  <li>🟢 Discover new opportunities</li>
                  <li>🟢 Chat and collaborate instantly</li>
                </ul>
                <button>Explore</button>
              </div>
            </div>
          </div>

          {/* Set Profile Card */}
          <div className="flip-card" onClick={() => navigate("/profile")}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2922/2922527.png"
                  alt="Set Profile"
                />
                <h3>Set Your Profile</h3>
              </div>
              <div className="flip-card-back">
                <h4>Why Update Profile?</h4>
                <ul>
                  <li>🟢 Showcase your skills</li>
                  <li>🟢 Make your profile stand out</li>
                  <li>🟢 Add your social links</li>
                  <li>🟢 Attract new connections</li>
                </ul>
                <button>Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
