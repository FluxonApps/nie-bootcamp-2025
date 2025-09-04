import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/onboarding`, form);
      alert(res.data.message); // ✅ Show backend message

      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Onboarding</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
          readOnly={emailFromLogin !== ""} // ✅ clearer than !!
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
          readOnly={passwordFromLogin !== ""}
        />

        <input
          type="text"
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="College"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Budget"
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Onboarding;
