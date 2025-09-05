import { Transaction } from "../types";
import { ChangeEvent, FormEvent } from "react";

interface Props {
  formData: Transaction;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent) => void;
}

const TransactionForm: React.FC<Props> = ({ formData, handleInputChange, handleSubmit }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Add Transaction
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400 outline-none"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Enter amount"
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Category</label>
        <input
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="e.g. Food, Salary"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="Optional notes"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-pink-400 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 shadow-lg"
      >
        💾 Save Transaction
      </button>
    </form>
  </div>
);

export default TransactionForm;
