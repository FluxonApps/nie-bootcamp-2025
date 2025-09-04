import { ChangeEvent, FormEvent, useState } from "react";
import { COLORS } from "../theme/colors";
import { createBillReminder } from "../services/billReminderService";

interface ReminderFormProps {
  onClose: () => void;
  onSave: () => void;
  onShowReminders: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  onClose,
  onSave,
  onShowReminders,
}) => {
  const [formData, setFormData] = useState({
    billName: "",
    amount: 0,
    date: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createBillReminder(formData);
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save reminder:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8 bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">Set Reminder</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Bill Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Bill Name</label>
            <input
              type="text"
              name="billName"
              value={formData.billName}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter bill name"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Due Date</label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none pr-10"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📅
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              style={{ backgroundColor: COLORS.primary }}
            >
              Save Reminder
            </button>
            <button
              type="button"
              onClick={onShowReminders}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              style={{ backgroundColor: COLORS.secondary }}
            >
              Show Reminders
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;
