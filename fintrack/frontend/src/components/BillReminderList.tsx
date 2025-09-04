import React from 'react';
import BillReminderItem from './BillReminderItem';
import type { Bill } from '../types';

interface BillReminderListProps {
  bills: Bill[];
  deleteBill: (id: string) => void;
}

const BillReminderList: React.FC<BillReminderListProps> = ({ bills, deleteBill }) => {
  return (
    <div className="space-y-4">
      {bills.map(bill => (
        <BillReminderItem key={bill._id} bill={bill} deleteBill={deleteBill} />
      ))}
    </div>
  );
};

export default BillReminderList;
