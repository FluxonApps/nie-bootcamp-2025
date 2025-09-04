import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Auth.css";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/login", { username, password });
      console.log("Sign In Response:", response.data);

      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);

      alert("Sign in successful!");
      navigate("/home"); // redirect to Home page
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
