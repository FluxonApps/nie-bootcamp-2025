export interface Transaction {
  userId: string;
  type: "Income" | "Expense";
  amount: number; // strictly number
  categoryName: string;
  description: string;
  date: string; // ISO string
}
