import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import TransactionList from "../components/TransactionList";
import Slider from "../components/Slider";
import { Transaction } from "../types";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors";

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [progress, setProgress] = useState(60);
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter((t) => {
    const [year, month] = t.date.split("-");
    return (
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (filter.month ? month === filter.month : true) &&
      (filter.year ? year === filter.year : true)
    );
  });

  return (
    <div
      className="flex flex-col min-h-screen p-6 max-w-5xl mx-auto"
      style={{ backgroundColor: COLORS.background, color: COLORS.primaryText }}
    >
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard
      </h1>

      {/* Progress Section */}
      <div
        className="mb-8 flex flex-col gap-4 items-center p-6 rounded-2xl shadow"
        style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
      >
        <ProgressBar progress={progress} />
        <Slider value={progress} onChange={setProgress} />
      </div>

      {/* Filters + Transactions */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search transactions..."
            className="rounded-lg px-4 py-2 flex-1 min-w-[200px] outline-none"
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.primaryText,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Month Dropdown */}
          <select
            className="rounded-lg px-4 py-2 min-w-[150px] outline-none"
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

          {/* Year Dropdown */}
          <select
            className="rounded-lg px-4 py-2 min-w-[150px] outline-none"
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
        </div>

        {/* Transaction List */}
        <div
          className="flex-1 overflow-y-auto rounded-xl shadow p-4"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>

      {/* Fixed bottom buttons */}
      <div className="flex justify-between gap-4 mt-auto">
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/2 text-lg font-semibold transition"
          style={{ backgroundColor: COLORS.secondaryAccent }}
          onClick={() =>
            navigate("/add-transaction", {
              state: {
                transaction: {
                  userId: "",
                  type: "Income",
                  amount: 0,
                  categoryName: "",
                  description: "",
                  date: "",
                },
              },
            })
          }
        >
          Add Transaction
        </button>
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/2 text-lg font-semibold transition"
          style={{ backgroundColor: COLORS.primaryAccent }}
          onClick={() => navigate("/reports")}
        >
          View Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;      