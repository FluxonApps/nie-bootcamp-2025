import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

const FormPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { transaction?: Transaction };

  const [formData, setFormData] = useState<Transaction>({
    userId: "",
    type: "Income",
    amount: 0,
    categoryName: "",
    description: "",
    date: "",
  });

  // Load data passed from Dashboard
  useEffect(() => {
    if (state?.transaction) {
      setFormData(state.transaction);
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Transaction submitted:", formData);

    // Reset after submission
    setFormData({
      userId: "",
      type: "Income",
      amount: 0,
      categoryName: "",
      description: "",
      date: "",
    });
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
          {state?.transaction ? "Edit Transaction" : "Add Transaction"}
        </h1>

        <TransactionForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default FormPage;
