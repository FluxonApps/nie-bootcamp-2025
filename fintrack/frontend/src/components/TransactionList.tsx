// src/components/TransactionList.tsx
import React from "react";
import { Transaction } from "../types";
import { COLORS } from "../theme/colors";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <div className="text-center text-gray-500 py-4">No transactions yet</div>;
  }

  const getTransactionClassName = (transaction: Transaction) =>
    transaction.type === "Income" ? "text-green-500" : "text-red-500";

  return (
    <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="p-4 rounded-xl shadow-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center"
          style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{t.description || "No description"}</p>
            <p className={`text-sm ${getTransactionClassName(t)}`}>
              {t.categoryName || "Unknown"} | {t.type} |₹{t.amount.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
          </div>

          {onEdit && onDelete && (
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                onClick={() => onEdit(t)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded-lg"
                onClick={() => onDelete(t._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
