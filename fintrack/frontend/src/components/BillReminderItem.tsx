import React from 'react';
import type { Bill } from '../types';

interface BillReminderItemProps {
  bill: Bill;
  deleteBill: (id: string) => void;
}

const BillReminderItem: React.FC<BillReminderItemProps> = ({ bill, deleteBill }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div>
        <h3 className="font-bold text-white">{bill.billName}</h3>
        <p className="text-gray-400">${bill.amount.toFixed(2)} - Due: {bill.dueDate}</p>
        <p className="text-sm text-gray-500">Frequency: {bill.frequency}</p>
      </div>
      <button 
        onClick={() => deleteBill(bill._id)} 
        className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default BillReminderItem;
