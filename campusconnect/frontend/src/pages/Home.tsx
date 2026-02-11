import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import welcomeImage from "../assets/welcome.png"; // ✅ Import image
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
          <div className="welcome-banner">
            <img src={welcomeImage} alt="Welcome" className="welcome-image" />
            <div className="overlay">
              <h1 style={{ color: "white" }}
              >Hi, {user.username}! 👋</h1>
              <p>Welcome back to Campus Connect 🚀</p>
            </div>
          </div>
        )}

        {/* Flipping Feature Cards */}
        <div className="features-container">
          {/* Create Group */}
          <div className="flip-card" onClick={() => navigate("/groups")}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
                  alt="Create Group"
                />
                <h3>Create Group</h3>
              </div>
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

          {/* Connections */}
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

          {/* Set Profile */}
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

          {/* View Posts */}
          <div className="flip-card" onClick={() => navigate("/posts")}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828961.png"
                  alt="View Posts"
                />
                <h3>View Posts</h3>
              </div>
              <div className="flip-card-back">
                <h4>Why View Posts?</h4>
                <ul>
                  <li>🟢 Stay updated on campus events</li>
                  <li>🟢 Discover trending discussions</li>
                  <li>🟢 Like, comment & interact</li>
                  <li>🟢 Share your thoughts easily</li>
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
