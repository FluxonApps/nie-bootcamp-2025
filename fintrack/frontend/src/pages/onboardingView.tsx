// src/pages/Onboarding.tsx
import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { COLORS } from "../theme/colors";
import Logo from "../assets/logo.png"; 

interface FormState {
  name: string;
  college: string;
  budget: string;
  email: string;
  password: string;
}

function Onboarding(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const { email: emailFromLogin = "", password: passwordFromLogin = "" } =
    location.state || {};

  const [form, setForm] = useState<FormState>({
    name: "",
    college: "",
    budget: "",
    email: emailFromLogin,
    password: passwordFromLogin,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8003/api/onboarding`, form);
      setMessage(res.data.message);

      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "⚠️ Unexpected error occurred");
    }
  };

  const inputStyle = {
    backgroundColor: COLORS.background,
    color: COLORS.primaryText,
    border: `1px solid ${COLORS.border}`,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: COLORS.background }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl text-center"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >

        <div className="flex flex-col items-center gap-2 mb-6">
          <img src={Logo} alt="FinTrack Logo" className="w-40 h-40 object-contain" />
          <h2 className="text-3xl font-bold" style={{ color: COLORS.primaryAccent }}>
            Onboarding
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            style={inputStyle}
            className="w-full p-3 rounded-lg outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            style={inputStyle}
            className="w-full p-3 rounded-lg outline-none"
            required
            readOnly
          />

          <input
            type="password"
            name="password"
            value={form.password}
            style={inputStyle}
            className="w-full p-3 rounded-lg outline-none"
            required
            readOnly
          />

          <input
            type="text"
            name="college"
            value={form.college}
            onChange={handleChange}
            placeholder="College"
            style={inputStyle}
            className="w-full p-3 rounded-lg outline-none"
            required
          />

          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Budget"
            style={inputStyle}
            className="w-full p-3 rounded-lg outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            style={{
              background: `linear-gradient(90deg, ${COLORS.primaryAccent}, ${COLORS.secondaryAccent})`,
              color: COLORS.primaryText,
            }}
          >
            Continue
          </button>
        </form>

        {message && (
          <p
            className="mt-4 text-sm"
            style={{
              color: message.toLowerCase().includes("success")
                ? COLORS.secondaryAccent
                : COLORS.danger,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
