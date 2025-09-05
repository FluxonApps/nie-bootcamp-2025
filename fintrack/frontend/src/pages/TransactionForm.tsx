import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

const API_BASE_URL = "http://localhost:8003"; // Matches backend port

const FormPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { transaction?: Transaction };

  const [formData, setFormData] = useState<Transaction>({
    userId:localStorage.getItem("userId"), // Replace with actual user ID from auth context
    type: "Income",
    amount: 200,
    categoryId: "",
    categoryName: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and load transaction data for editing
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();

    // Load transaction data if editing
    if (state?.transaction?._id) {
      setFormData({
        ...state.transaction,
        date: new Date(state.transaction.date).toISOString().split("T")[0],
      });
    }
  }, [state]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate required fields
      if (!formData.type || !formData.amount || !formData.categoryId || !formData.userId) {
        throw new Error("Please fill all required fields");
      }

      const url = state?.transaction?._id
        ? `${API_BASE_URL}/api/transactions/${state.transaction._id}`
        : `${API_BASE_URL}/api/transactions/create`;
      const method = state?.transaction?._id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: formData.type.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save transaction");
      }

      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      <div
        className="w-full max-w-lg p-8 rounded-2xl shadow-lg"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          {state?.transaction?._id ? "Edit Transaction" : "Add Transaction"}
        </h1>

        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full rounded-lg px-3 py-2"
              style={{
                backgroundColor: "black",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="0"
              className="w-full rounded-lg px-3 py-2"
              style={{
                backgroundColor: "black",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full rounded-lg px-3 py-2"
              style={{
                backgroundColor: "black",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg px-3 py-2"
              style={{
                backgroundColor: "black",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full rounded-lg px-3 py-2"
              style={{
                backgroundColor: "black",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.primaryText,
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-lg font-semibold transition"
            style={{ backgroundColor: COLORS.primaryAccent }}
          >
            {state?.transaction?._id ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;