import { Transaction } from "../../../fintrack-dashboard/fintrack-dashboard/src/types";

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => (
  <div className="mb-6 max-h-60 overflow-y-auto border rounded p-4">
    {transactions.length > 0 ? (
      transactions.map((t, i) => (
        <div key={i} className="flex justify-between py-2 border-b last:border-b-0">
          <span>{t.type}</span>
          <span>{t.amount}</span>
          <span>{t.categoryName}</span>
          <span>{t.date}</span>
        </div>
      ))
    ) : (
      <p>No transactions found.</p>
    )}
  </div>
);

export default TransactionList;
