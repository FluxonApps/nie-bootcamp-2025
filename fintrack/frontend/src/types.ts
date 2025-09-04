export interface Bill {
  _id: string;
  billName: string;
  amount: number;
  dueDate: string;
  frequency: 'one-time' | 'weekly' | 'monthly' | 'yearly';
}
