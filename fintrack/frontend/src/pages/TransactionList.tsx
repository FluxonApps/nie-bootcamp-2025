import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <div className="text-center text-gray-500">No transactions yet</div>;
  }

  return (
    <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="p-4 rounded-lg shadow-md border flex flex-col"
          style={{
            backgroundColor: COLORS.inputBackground,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {/* Transaction Info */}
          <div>
            <p className="font-semibold text-lg" style={{ color: COLORS.primaryText }}>
              {transaction.description || "No description"}
            </p>
            <p className="text-sm" style={{ color: COLORS.secondaryText }}>
              {transaction.categoryName || "Unknown Category"} | {transaction.type} | $
              {transaction.amount}
            </p>
            <p className="text-sm" style={{ color: COLORS.secondaryText }}>
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition bg-blue-600 text-white"
              onClick={() => onEdit(transaction)}
            >
              ✏️ Edit
            </button>
            <button
              className="px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition bg-red-600 text-white"
              onClick={() => onDelete(transaction._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
