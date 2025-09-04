import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors"; 
import Logo from "../assets/logo.png"; 

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
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token!);
        navigate("/dashboard");
      } else if (res.status === 404) {
        navigate("/onboarding", { state: { email, password } });
      } else {
        setMessage(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Server error!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl text-center"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <img src={Logo} alt="FinTrack Logo" className="w-40 h-40 object-contain" />
          <h1 className="text-3xl font-bold" style={{ color: COLORS.primaryAccent }}>
            FinTrack
          </h1>
        </div>


        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg outline-none"
            style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg outline-none"
            style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            style={{
              background: `linear-gradient(90deg, ${COLORS.primaryAccent}, ${COLORS.secondaryAccent})`,
              color: COLORS.primaryText,
            }}
          >
            🔐 Login
          </button>
        </form>

        {message && (
          <p
            className="mt-4 text-sm"
            style={{
              color: message.includes("success") ? COLORS.secondaryAccent : COLORS.danger,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
