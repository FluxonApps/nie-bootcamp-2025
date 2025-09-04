// src/types.ts
export interface Transaction {
  userId: string;
  type: "Income" | "Expense";
  amount: number | string;
  categoryName: string;
  description: string;
  date: string;
}
