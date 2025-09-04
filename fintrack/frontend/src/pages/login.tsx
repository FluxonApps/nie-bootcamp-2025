import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8003/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();

      if (res.ok && data.success && data.user) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token!);

        // ✅ If user exists, go to dashboard directly
        navigate("/dashboard");
      } else if (res.status === 404) {
        // 🚨 User not found → redirect to onboarding with email/password
        navigate("/onboarding", { state: { email, password } });
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error!");
    }
  };

  return (
    <div className="login-container">
      <h1>FinTrack</h1>
      <img src="/vite.svg" alt="FinTrack Logo" className="logo" />
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
      {message && <p>{message}</p>}
    </div>
  );
};
