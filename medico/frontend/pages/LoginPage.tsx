import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8004/api/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // 👇 Replace the old return with this one
  return (
    <div className="auth-page">
      <h2>Login</h2>
    
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
