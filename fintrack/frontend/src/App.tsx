 import { useState, useEffect } from 'react';
import BillReminderForm from './components/BillReminderForm';
import BillReminderList from './components/BillReminderList';
import type { Bill } from './types';
import './App.css';

const API_URL = 'http://localhost:8003/api'; 

function App() {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(`${API_URL}/bills`);
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };
    fetchBills();
  }, []);

  const addBill = async (bill: Omit<Bill, '_id'>) => {
    try {
      const response = await fetch(`${API_URL}/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bill),
      });
      const newBill = await response.json();
      setBills([...bills, newBill]);
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  const deleteBill = async (id: string) => {
    try {
      await fetch(`${API_URL}/bills/${id}`, {
        method: 'DELETE',
      });
      setBills(bills.filter(bill => bill._id !== id));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container p-4 mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">FinTrack</h1>
          <p className="text-gray-400">Your Personal Bill Payment Reminder</p>
        </header>
        <main>
          <BillReminderForm addBill={addBill} />
          <BillReminderList bills={bills} deleteBill={deleteBill} />
        </main>
      </div>
    </div>
  );
}

export default App;


