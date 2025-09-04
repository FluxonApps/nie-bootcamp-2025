import axios from 'axios';

const API_URL = 'http://localhost:8003/api/bill-reminders';

export interface BillReminder {
  _id?: string;
  billName: string;
  amount: number;
  date: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const createBillReminder = async (reminderData: Omit<BillReminder, '_id'>): Promise<BillReminder> => {
  try {
    const response = await axios.post<ApiResponse<BillReminder>>(API_URL, reminderData);
    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to create bill reminder');
    }
  } catch (error) {
    console.error('Failed to create bill reminder:', error);
    throw error;
  }
};
