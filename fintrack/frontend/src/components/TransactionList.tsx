import React from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => (
  <div className="flex flex-col gap-2">
    {transactions.map((t, i) => (
      <div
        key={i}
        className="bg-gray-800 text-white px-4 py-2 rounded shadow-sm"
      >
        {t.type} - {t.amount} - {t.categoryName} - {t.date}
      </div>
    ))}
  </div>
);

export default TransactionList;
