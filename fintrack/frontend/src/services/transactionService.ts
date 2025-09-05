// src/services/transactionService.ts
import { Transaction } from "../types";

const API_BASE_URL = "http://localhost:8003/api";

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  const res = await fetch(`${API_BASE_URL}/transactions/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const deleteTransaction = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete transaction");
};
