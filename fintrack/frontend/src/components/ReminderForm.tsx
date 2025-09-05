import { ChangeEvent, FormEvent, useState } from "react";
import { COLORS } from "../theme/colors";
import { createBillReminder } from "../services/billReminderService";

interface ReminderFormProps {
  onClose: () => void;
  onSave: () => void;
  onShowReminders: () => void;
  reminderData?: { billName: string; amount: string; date: string };
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  onClose,
  onSave,
  onShowReminders,
}) => {
  const [formData, setFormData] = useState({ billName: "", amount: 0, date: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createBillReminder(formData);
      setFormData({ billName: "", amount: 0, date: "" }); // reset
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save reminder:", error);
    }
  };

  const handleSyncToGoogleCalendar = () => {
    if (!formData.billName || !formData.amount || !formData.date) return;
    const formattedDate = new Date(formData.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(formData.date);
    endDate.setHours(endDate.getHours() + 1);
    const endDateFormatted = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Bill Reminder: ${formData.billName}`)}&dates=${formattedDate}/${endDateFormatted}&details=${encodeURIComponent(`Amount: $${formData.amount}`)}&sf=true&output=xml`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8 bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">Set Reminder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
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
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between space-x-4">
              <button type="button" onClick={onShowReminders} className="py-3 px-6 rounded-lg font-semibold flex-1 text-center transition" style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}>
                Show Reminders
              </button>
              <button type="submit" className="py-3 px-6 rounded-lg font-semibold flex-1 text-center transition" style={{ backgroundColor: COLORS.primaryAccent, color: COLORS.primaryText }}>
                Save Reminder
              </button>
            </div>

            <button type="button" onClick={handleSyncToGoogleCalendar} className="w-full py-3 px-6 rounded-lg font-semibold text-center transition flex items-center justify-center space-x-2" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#DB4437">
                <path d="M12 12h-6v-9h9v3h-6v6zm0 0h-6v9h9v-3h-6v-6zm12-6h-9v3h6v6h3v-9zm-9-3h9v9h-3v-6h-6v-3z"/>
              </svg>
              <span>Sync to Google Calendar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;
