import { useEffect, useState } from 'react';
import { BillReminder, getBillReminders, deleteBillReminder } from '../services/billReminderService';
import { COLORS } from '../theme/colors';

interface RemindersModalProps {
  onClose: () => void;
}

const RemindersModal: React.FC<RemindersModalProps> = ({ onClose }) => {
  const [reminders, setReminders] = useState<BillReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getBillReminders();
        setReminders(data);
      } catch (err) {
        setError('Failed to fetch reminders.');
      }
      setLoading(false);
    };

    fetchReminders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBillReminder(id);
      setReminders(reminders.filter((r) => r._id !== id));
    } catch (err) {
      setError('Failed to delete reminder.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        className="w-full max-w-2xl p-6 rounded-2xl shadow-2xl text-white relative border"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.primaryAccent }}>Bill Reminders</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        {loading && <p className="text-center">Loading reminders...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {reminders.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No reminders found.</p>
            ) : (
              reminders.map((reminder) => (
                <div 
                  key={reminder._id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{ backgroundColor: COLORS.background, borderColor: COLORS.border }}
                >
                  <div>
                    <p className="font-semibold text-lg" style={{ color: COLORS.primaryText }}>{reminder.billName}</p>
                    <p style={{ color: COLORS.secondaryText }}>
                      Amount: <span className="font-medium" style={{ color: COLORS.primaryAccent }}>${reminder.amount.toFixed(2)}</span>
                    </p>
                    <p style={{ color: COLORS.secondaryText }}>
                      Due: {new Date(reminder.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(reminder._id!)}
                    className="py-2 px-4 rounded-lg font-semibold transition"
                    style={{ backgroundColor: COLORS.danger, color: COLORS.primaryText }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersModal;
