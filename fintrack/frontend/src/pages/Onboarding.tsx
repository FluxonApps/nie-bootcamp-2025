import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormState {
  name: string;
  college: string;
  budget: string;
}

function Onboarding(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    college: "",
    budget: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/onboarding", form);
      if (res.status === 201) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
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
