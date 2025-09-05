// src/components/BudgetProgress.tsx
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Slider from "./Slider";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

interface BudgetProgressProps {
  transactions: Transaction[];
  apiBaseUrl: string;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ transactions, apiBaseUrl }) => {
  const [budget, setBudget] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBudget = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");

        const res = await fetch(`${apiBaseUrl}/api/users/${userId}/budget`);
        if (!res.ok) throw new Error("Failed to fetch budget");

        const data = await res.json();
        if (isMounted) setBudget(data.budget || 0);
      } catch (err: any) {
        if (isMounted) setError(err.message || "An error occurred");
      }
    };

    fetchBudget();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  useEffect(() => {
    const totalExpenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setProgress(budget ? (totalExpenses / budget) * 100 : 0);
  }, [transactions, budget]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div
      className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-2 items-center p-4 sm:p-6 rounded-2xl shadow-lg"
      style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
    >
      <p className="text-sm sm:text-base md:text-lg font-medium">
        Budget: ₹{budget.toFixed(2)}
      </p>
      <ProgressBar progress={Math.min(progress, 100)} />
      <Slider value={progress} onChange={setProgress} />
    </div>
  );
};

export default BudgetProgress;
