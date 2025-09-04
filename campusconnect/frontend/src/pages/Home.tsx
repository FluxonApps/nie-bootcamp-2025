import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

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
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="banner">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
            alt="Campus"
            className="banner-image"
          />
          <div className="banner-text">
            {user ? <h1>Hi, {user.name} 👋</h1> : <h1>Welcome to Campus Connect</h1>}
            <p>Connect, collaborate, and grow together 🚀</p>
          </div>
        </div>

        <div className="button-container">
          <div className="card" onClick={() => navigate("/connect")}>
            <h2>🤝 Connect with People</h2>
            <p>Meet new peers and build your network.</p>
            <button>Explore</button>
          </div>

          <div className="card" onClick={() => navigate("/create-group")}>
            <h2>👥 Create a Group</h2>
            <p>Collaborate and share ideas in groups.</p>
            <button>Create</button>
          </div>

          <div className="card" onClick={() => navigate("/profile")}>
            <h2>👤 Set Your Profile</h2>
            <p>Personalize your experience and update details.</p>
            <button>Update</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
