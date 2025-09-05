// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReminderForm from "../components/ReminderForm";
import RemindersModal from "../components/RemindersModal";
import TransactionList from "../components/TransactionList";
import BudgetProgress from "../components/BudgetProgress";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";
import logo from "./logo.png";

const API_BASE_URL = "http://localhost:8003";

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [error, setError] = useState<string | null>(null);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  let isMounted = true;
  const fetchTransactions = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return; // don't fetch if no userId yet

    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      if (isMounted) setTransactions(data);
    } catch (err: any) {
      if (isMounted) setError(err.message || "An error occurred");
    }
  };

  // small delay to let backend finish creating user
  const timer = setTimeout(fetchTransactions, 200); 
  return () => {
    isMounted = false;
    clearTimeout(timer);
  };
}, []);


  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    navigate("/form", { state: { transaction } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const clearFilters = () => {
    setSearch("");
    setFilter({ month: "", year: "" });
  };

  // 🔹 Fixed filter logic
  const filteredTransactions = transactions.filter((t) => {
    const dateObj = new Date(t.date);
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");

    const matchesSearch = (t.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesMonth = filter.month ? month === filter.month : true;
    const matchesYear = filter.year ? year === filter.year : true;

    return matchesSearch && matchesMonth && matchesYear;
  });

  return (
    <div
      className="relative flex flex-col min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
        <img
          src={logo}
          alt="FinTrack Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full shadow-md"
          style={{ objectFit: "contain" }}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center flex-1">
          Dashboard
        </h1>
        <button
          className="px-3 sm:px-4 py-2 rounded-lg font-medium shadow hover:bg-red-700 transition-colors bg-red-600 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 sm:mb-6 text-red-500 text-center text-sm sm:text-base md:text-lg">
          {error}
        </div>
      )}

      {/* Budget Progress */}
      <BudgetProgress transactions={transactions} apiBaseUrl={API_BASE_URL} />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center">
          <input
            type="text"
            placeholder="Search transactions..."
            className="rounded-lg px-3 sm:px-4 py-2 flex-1 min-w-[200px] sm:min-w-[250px] outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-lg px-3 sm:px-4 py-2 min-w-[140px] sm:min-w-[160px] outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
            value={filter.month}
            onChange={(e) => setFilter({ ...filter, month: e.target.value })}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => {
              const monthNum = (i + 1).toString().padStart(2, "0");
              return (
                <option key={monthNum} value={monthNum}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              );
            })}
          </select>

          <select
            className="rounded-lg px-3 sm:px-4 py-2 min-w-[140px] sm:min-w-[160px] outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
            value={filter.year}
            onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <button
            className="px-3 sm:px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: COLORS.secondaryAccent, color: COLORS.primaryText }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Transaction List */}
        <div
          className="flex-1 overflow-y-auto rounded-xl shadow-lg p-4 sm:p-6"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Recent Transactions
          </h2>
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showRemindersModal && <RemindersModal onClose={() => setShowRemindersModal(false)} />}

      {showReminderForm && (
        <ReminderForm
          onClose={() => setShowReminderForm(false)}
          onSave={() => setShowReminderForm(false)}
          onShowReminders={() => {
            setShowReminderForm(false);
            setShowRemindersModal(true);
          }}
        />
      )}

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 bg-gray-900/80 backdrop-blur-sm">
        <button
          className="flex-1 h-12 sm:h-16 md:h-20 py-2 sm:py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500"
          style={{ backgroundColor: COLORS.warning, color: COLORS.primaryText }}
          onClick={() => setShowReminderForm(true)}
        >
          Set Reminder
        </button>
        <button
          className="flex-1 h-12 sm:h-16 md:h-20 py-2 sm:py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors text-sm sm:text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ backgroundColor: COLORS.secondaryAccent, color: COLORS.primaryText }}
          onClick={() =>
            navigate("/form", {
              state: {
                transaction: {
                  userId: localStorage.getItem("userId") || "",
                  type: "Income",
                  amount: 0,
                  categoryName: "",
                  description: "",
                  date: new Date().toISOString().split("T")[0],
                },
              },
            })
          }
        >
          Add Transaction
        </button>
        <button
          className="flex-1 h-12 sm:h-16 md:h-20 py-2 sm:py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors text-sm sm:text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ backgroundColor: COLORS.primaryAccent, color: COLORS.primaryText }}
          onClick={() => navigate("/reports")}
        >
          View Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
