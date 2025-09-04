import React, { useState } from 'react';
import type { Bill } from '../types';

interface BillReminderFormProps {
  addBill: (bill: Omit<Bill, '_id'>) => void;
}

const BillReminderForm: React.FC<BillReminderFormProps> = ({ addBill }) => {
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'monthly' | 'yearly'>('one-time');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billName || !amount || !dueDate) return;
    addBill({ 
      billName, 
      amount: parseFloat(amount), 
      dueDate, 
      frequency 
    });
    setBillName('');
    setAmount('');
    setDueDate('');
    setFrequency('one-time');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 bg-gray-800 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-white">Add New Bill Reminder</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Bill Name"
          value={billName}
          onChange={(e) => setBillName(e.target.value)}
          className="w-full p-2 text-white bg-gray-700 rounded-md"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 text-white bg-gray-700 rounded-md"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 text-white bg-gray-700 rounded-md"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'one-time' | 'weekly' | 'monthly' | 'yearly')}
          className="w-full p-2 text-white bg-gray-700 rounded-md"
        >
          <option value="one-time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <button type="submit" className="block w-full p-2 mt-8 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Add Reminder
      </button>
    </form>
  );
};

export default BillReminderForm;
