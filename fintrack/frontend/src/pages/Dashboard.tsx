import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import TransactionList from "../components/TransactionList";
import Slider from "../components/Slider";
import { Transaction } from "../types";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors";

const API_BASE_URL = "http://localhost:5000"; // Matches backend port

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [progress, setProgress] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/transactions/user/507f1f77bcf86cd799439100`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        console.log("Fetched transactions:", data);
        if (isMounted) setTransactions(data);
      } catch (err) {
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
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    console.log("Navigating to edit transaction:", transaction);
    navigate("/form", { state: { transaction } });
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

  return (
    <div
      className="flex flex-col min-h-screen p-6 max-w-5xl mx-auto"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {error && (
        <div className="mb-4 text-red-500 text-center">{error}</div>
      )}

      <div
        className="mb-8 flex flex-col gap-4 items-center p-6 rounded-2xl shadow"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <ProgressBar progress={progress} />
        <Slider value={progress} onChange={setProgress} />
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search transactions..."
            className="rounded-lg px-4 py-2 flex-1 min-w-[200px] outline-none"
            style={{
              backgroundColor: COLORS.inputBackground,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-lg px-4 py-2 min-w-[150px] outline-none"
            style={{
              backgroundColor: COLORS.inputBackground,
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
            className="rounded-lg px-4 py-2 min-w-[150px] outline-none"
            style={{
              backgroundColor: COLORS.inputBackground,
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
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: COLORS.secondaryAccent, color: COLORS.primaryText }}
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto rounded-xl shadow p-4"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className=" overflow-y-auto">
  <TransactionList
    transactions={transactions}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
</div>

        </div>
      </div>

      <div className="flex justify-between gap-4 mt-auto">
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/2 text-lg font-semibold transition"
          style={{ backgroundColor: COLORS.secondaryAccent, color: COLORS.primaryText }}
          onClick={() => navigate("/form")}
        >
          Add Transaction
        </button>
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/2 text-lg font-semibold transition"
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