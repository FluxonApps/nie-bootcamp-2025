// src/types.ts

export interface Transaction {
  _id: string;
  userId: string;
  type: "Income" | "Expense";
  amount: number;
  categoryName: string;
  description: string;
  date: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  budget: number;
}
