// src/pages/Onboarding.tsx
import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { COLORS } from "../theme/colors";

interface FormState {
  name: string;
  college: string;
  budget: string;
  email: string;
  password: string;
}

function Onboarding(): JSX.Element {
  const [searchParams] = useSearchParams();
  const emailFromLogin = searchParams.get("email") || "";
  const passwordFromLogin = searchParams.get("password") || "";

  const [form, setForm] = useState<FormState>({
    name: "",
    college: "",
    budget: "",
    email: emailFromLogin,
    password: passwordFromLogin,
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/onboarding`,
        form
      );
      alert(res.data.message);

      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Unexpected error occurred");
    }
  };

  // Shared style for inputs
  const inputStyle = {
    backgroundColor: COLORS.card,
    color: COLORS.primaryText,
    border: `1px solid ${COLORS.border}`,
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ backgroundColor: COLORS.background }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-xl p-6 w-96"
        style={{
          backgroundColor: COLORS.card,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: COLORS.primaryText }}
        >
          Onboarding
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          style={inputStyle}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          style={inputStyle}
          className="w-full mb-3 p-2 rounded"
          required
          readOnly={emailFromLogin !== ""}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          style={inputStyle}
          className="w-full mb-3 p-2 rounded"
          required
          readOnly={passwordFromLogin !== ""}
        />

        <input
          type="text"
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="College"
          style={inputStyle}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Budget"
          style={inputStyle}
          className="w-full mb-3 p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full py-2 rounded mt-2"
          style={{
            backgroundColor: COLORS.primaryAccent,
            color: COLORS.primaryText,
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
