import { Transaction } from "../../../fintrack-dashboard/fintrack-dashboard/src/types";
import { ChangeEvent, FormEvent } from "react";

interface Props {
  formData: Transaction;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

const TransactionForm: React.FC<Props> = ({ formData, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="border p-4 rounded space-y-4 max-w-md mx-auto">
    <input
      type="text"
      name="userId"
      placeholder="User ID"
      className="border rounded px-3 py-2 w-full"
      value={formData.userId}
      onChange={handleInputChange}
    />
    <select
      name="type"
      className="border rounded px-3 py-2 w-full"
      value={formData.type}
      onChange={handleInputChange}
    >
      <option>Income</option>
      <option>Expense</option>
    </select>
    <input
      type="number"
      name="amount"
      placeholder="Amount"
      className="border rounded px-3 py-2 w-full"
      value={formData.amount}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="categoryName"
      placeholder="Category Name"
      className="border rounded px-3 py-2 w-full"
      value={formData.categoryName}
      onChange={handleInputChange}
    />
    <textarea
      name="description"
      placeholder="Description"
      className="border rounded px-3 py-2 w-full"
      value={formData.description}
      onChange={handleInputChange}
    />
    <input
      type="date"
      name="date"
      className="border rounded px-3 py-2 w-full"
      value={formData.date}
      onChange={handleInputChange}
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
      Submit
    </button>
  </form>
);

export default TransactionForm;
