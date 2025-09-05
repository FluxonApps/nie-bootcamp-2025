import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import Slider from "../components/Slider";
import ReminderForm from "../components/ReminderForm";
import RemindersModal from "../components/RemindersModal";
import { Transaction } from "../types";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors";
import logo from "./logo.png";

const API_BASE_URL = "http://localhost:8003";

// TransactionList Component
interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
  getTransactionClassName?: (transaction: Transaction) => string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  getTransactionClassName,
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center text-gray-500 text-base sm:text-lg py-4">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="p-4 sm:p-6 rounded-xl shadow-lg border flex flex-col transition-all hover:shadow-xl"
          style={{
            backgroundColor: COLORS.inputBackground,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {/* Transaction Info */}
          <div className="flex flex-col gap-2">
            <p
              className="font-semibold text-base sm:text-lg md:text-xl truncate"
              style={{ color: COLORS.primaryText }}
            >
              {transaction.description || "No description"}
            </p>
            <p
              className={`text-sm sm:text-base ${getTransactionClassName ? getTransactionClassName(transaction) : ""}`}
              style={{ color: COLORS.secondaryText }}
            >
              {transaction.categoryName || "Unknown Category"} | {transaction.type} | $
              <span className={getTransactionClassName ? getTransactionClassName(transaction) : ""}>
                {transaction.amount.toFixed(2)}
              </span>
            </p>
            <p className="text-xs sm:text-sm" style={{ color: COLORS.secondaryText }}>
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          {onEdit && onDelete && (
            <div className="mt-4 flex justify-end gap-2 sm:gap-3">
              <button
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition-colors bg-blue-600 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => onEdit(transaction)}
              >
                ✏️ Edit
              </button>
              <button
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium shadow hover:bg-red-700 transition-colors bg-red-600 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => onDelete(transaction._id)}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [progress, setProgress] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");
        const response = await fetch(`${API_BASE_URL}/api/transactions/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        console.log("Fetched transactions:", data);
        if (isMounted) setTransactions(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "An error occurred");
      }
    };
    fetchTransactions();
    return () => {
      isMounted = false;
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
    console.log("Navigating to edit transaction:", transaction);
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

  const filteredTransactions = transactions.filter((t) => {
    const [year, month] = new Date(t.date).toISOString().split("T")[0].split("-");
    return (
      (t.description || "").toLowerCase().includes(search.toLowerCase()) &&
      (filter.month ? month === filter.month : true) &&
      (filter.year ? year === filter.year : true)
    );
  });

  // Function to determine transaction className based on type
  const getTransactionClassName = (transaction: Transaction) => {
    return transaction.type === "Income" ? "text-green-500" : "text-red-500";
  };

  return (
    <div
      className="relative flex flex-col min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      {/* Header with Logo and Logout Button */}
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

      <div
        className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-4 items-center p-4 sm:p-6 rounded-2xl shadow-lg"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <ProgressBar progress={progress} />
        <Slider value={progress} onChange={setProgress} />
      </div>

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
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
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
            getTransactionClassName={getTransactionClassName}
          />
        </div>
      </div>

      {showRemindersModal && <RemindersModal onClose={() => setShowRemindersModal(false)} />}

      {showReminderForm && (
        <ReminderForm
          onClose={() => setShowReminderForm(false)}
          onSave={() => {
            console.log("Reminder saved!");
            setShowReminderForm(false);
          }}
          onShowReminders={() => {
            setShowReminderForm(false);
            setShowRemindersModal(true);
          }}
        />
      )}

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