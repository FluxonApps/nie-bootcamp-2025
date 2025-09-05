import { useState, useEffect } from "react";
import { Transaction } from "../types";
import TransactionList from "../components/TransactionList";
import { COLORS } from "../theme/colors";
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_BASE_URL = "http://localhost:8003";

const ReportPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`${API_BASE_URL}/api/transactions/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        if (isMounted) {
          setTransactions(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An error occurred");
          setLoading(false);
        }
      }
    };
    fetchTransactions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate total income and expense
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type !== "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Prepare data for line charts (day vs. income and expense)
  const days = [...new Set(transactions.map((t) => new Date(t.date).toISOString().split("T")[0]))].sort();
  const incomeByDay = days.map((day) => {
    return transactions
      .filter((t) => t.type === "Income" && new Date(t.date).toISOString().split("T")[0] === day)
      .reduce((sum, t) => sum + t.amount, 0);
  });
  const expenseByDay = days.map((day) => {
    return transactions
      .filter((t) => t.type !== "Income" && new Date(t.date).toISOString().split("T")[0] === day)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // Prepare data for bar chart (category vs. number of transactions)
  const categories = [...new Set(transactions.map((t) => t.categoryName))];
  const transactionsByCategory = categories.map((category) => {
    return transactions.filter((t) => t.categoryName === category).length;
  });

  // Pie chart data
  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["green", "red"],
        borderColor: COLORS.border,
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for income
  const incomeLineChartData = {
    labels: days,
    datasets: [
      {
        label: "Income",
        data: incomeByDay,
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // Line chart data for expense
  const expenseLineChartData = {
    labels: days,
    datasets: [
      {
        label: "Expense",
        data: expenseByDay,
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // Bar chart data
  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: "Number of Transactions",
        data: transactionsByCategory,
        backgroundColor: "green",
        borderColor: COLORS.border,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: COLORS.primaryText,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || context.parsed || 0;
            return `${label}: ${label.includes("Income") || label.includes("Expense") ? "$" : ""}${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: COLORS.primaryText },
        grid: { color: COLORS.border },
      },
      y: {
        ticks: { color: COLORS.primaryText },
        grid: { color: COLORS.border },
      },
    },
  };

  // Function to determine transaction className based on type
  const getTransactionClassName = (transaction: Transaction) => {
    return transaction.type === "Income" ? "text-green-500" : "text-red-500";
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
      >
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col p-4 sm:p-6 max-w-7xl mx-auto"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Financial Report</h1>

      {error && (
        <div className="mb-4 text-red-500 text-center">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary Section */}
        <div
          className="p-6 rounded-2xl shadow"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-base sm:text-lg">Total Income:</p>
              <p className="text-xl sm:text-2xl font-bold text-green-500">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg">Total Expense:</p>
              <p className="text-xl sm:text-2xl font-bold text-red-500">
                ${totalExpense.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full h-64 sm:h-80">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Income vs. Expense</h3>
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>

        {/* Daily Trends Section */}
        <div
          className="p-6 rounded-2xl shadow"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Daily Trends</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-64 sm:h-80">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Income by Day</h3>
              <Line data={incomeLineChartData} options={chartOptions} />
            </div>
            <div className="h-64 sm:h-80">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Expense by Day</h3>
              <Line data={expenseLineChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Transactions by Category Section */}
        <div
          className="p-6 rounded-2xl shadow"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Transactions by Category</h2>
          <div className="w-full h-64 sm:h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* All Transactions Section */}
        <div
          className="p-6 rounded-2xl shadow overflow-y-auto"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">All Transactions</h2>
          <TransactionList
            transactions={transactions}
            getTransactionClassName={getTransactionClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;