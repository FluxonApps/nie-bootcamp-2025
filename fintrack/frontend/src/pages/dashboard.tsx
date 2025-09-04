// import { useState } from "react";
// import ProgressBar from "../components/ProgressBar";
// import TransactionList from "../components/TransactionList";
// import Slider from "../components/Slider";
// import { Transaction } from "../types";
// import { useNavigate } from "react-router-dom";

// const Dashboard: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState({ month: "", year: "" });
//   const [progress, setProgress] = useState(60);
//   const navigate = useNavigate();

//   const filteredTransactions = transactions.filter((t) => {
//     const [year, month] = t.date.split("-");
//     return (
//       t.description.toLowerCase().includes(search.toLowerCase()) &&
//       (filter.month ? month === filter.month : true) &&
//       (filter.year ? year === filter.year : true)
//     );
//   });

//   return (
//     <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto bg-black text-white">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>

//       {/* Progress Section */}
//       <div className="mb-6 flex flex-col gap-3 items-center">
//         <ProgressBar progress={progress} />
//         <Slider value={progress} onChange={setProgress} />
//       </div>

//       {/* Recent Transactions */}
//       <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>

//       {/* Filters */}
//       <div className="flex gap-4 mb-4 overflow-x-auto">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search transactions..."
//           className="bg-gray-800 border border-gray-600 rounded px-3 py-2 flex-1 min-w-[200px] text-white placeholder-gray-400"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* Month Dropdown */}
//         <select
//           className="bg-gray-800 border border-gray-600 rounded px-3 py-2 min-w-[150px] text-white"
//           value={filter.month}
//           onChange={(e) => setFilter({ ...filter, month: e.target.value })}
//         >
//           <option value="">All Months</option>
//           <option value="01">January</option>
//           <option value="02">February</option>
//           <option value="03">March</option>
//           <option value="04">April</option>
//           <option value="05">May</option>
//           <option value="06">June</option>
//           <option value="07">July</option>
//           <option value="08">August</option>
//           <option value="09">September</option>
//           <option value="10">October</option>
//           <option value="11">November</option>
//           <option value="12">December</option>
//         </select>

//         {/* Year Dropdown */}
//         <select
//           className="bg-gray-800 border border-gray-600 rounded px-3 py-2 min-w-[150px] text-white"
//           value={filter.year}
//           onChange={(e) => setFilter({ ...filter, year: e.target.value })}
//         >
//           <option value="">All Years</option>
//           <option value="2023">2023</option>
//           <option value="2024">2024</option>
//           <option value="2025">2025</option>
//         </select>
//       </div>

//       {/* Transaction List */}
//       <div className="flex-1 overflow-y-auto mb-6">
//         <TransactionList transactions={filteredTransactions} />
//       </div>

//       {/* Fixed bottom buttons */}
//       <div className="flex justify-between mt-auto gap-4">
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white h-24 flex items-center justify-center rounded shadow w-1/2 text-lg font-semibold"
//           onClick={() =>
//             navigate("/form", {
//               state: {
//                 transaction: {
//                   userId: "",
//                   type: "Income",
//                   amount: 0,
//                   categoryName: "",
//                   description: "",
//                   date: "",
//                 },
//               },
//             })
//           }
//         >
//           Add Transaction
//         </button>
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white h-24 flex items-center justify-center rounded shadow w-1/2 text-lg font-semibold"
//           onClick={() => navigate("/reports")}
//         >
//           View Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import TransactionList from "../components/TransactionList";
import Slider from "../components/Slider";
import { Transaction } from "../types";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../theme/colors";
import ReminderForm from "../components/ReminderForm";
import RemindersModal from "../components/RemindersModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [progress, setProgress] = useState(60);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);

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
      
      {showRemindersModal && <RemindersModal onClose={() => setShowRemindersModal(false)} />}

      {showReminderForm && (
        <ReminderForm
          onClose={() => setShowReminderForm(false)}
          onSave={() => {
            console.log('Reminder saved!');
            // Optionally, refresh data or show a success message
          }}
          onShowReminders={() => {
            setShowReminderForm(false);
            setShowRemindersModal(true);
          }}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between space-x-4 bg-gray-900/80 backdrop-blur-sm">
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/3 text-lg font-semibold transition"
          style={{ backgroundColor: COLORS.warning }}
          onClick={() => setShowReminderForm(true)}
        >
          Set Reminder
        </button>
        <button
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/3 text-lg font-semibold transition"
          style={{ backgroundColor: COLORS.secondaryAccent }}
          onClick={() =>
            navigate("/form", {
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
          className="h-24 flex items-center justify-center rounded-xl shadow w-1/3 text-lg font-semibold transition"
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
