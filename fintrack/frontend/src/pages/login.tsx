import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors";
import logo from "./logo.png";

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
        localStorage.setItem("userId", data.user.id);

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
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-900"
      style={{ backgroundColor: COLORS.background }}
    >
      <div
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-lg backdrop-blur-sm bg-gray-800/80"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <img
            src={logo}
            alt="FinTrack Logo"
            className="w-32 h-32 sm:w-20 sm:h-20 mb-4"
            style={{
              height:"150px",
              width:"150px"
            }}
          />
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
            style={{ color: COLORS.primaryText }}
          >
            FinTrack
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium mb-1"
              style={{ color: COLORS.primaryText }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              style={{
                backgroundColor: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium mb-1"
              style={{ color: COLORS.primaryText }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              style={{
                backgroundColor: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: COLORS.primaryAccent, color: COLORS.primaryText }}
          >
            Login
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 sm:mt-6 text-center text-sm sm:text-base ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};