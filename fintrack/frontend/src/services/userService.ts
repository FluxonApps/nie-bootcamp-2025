// src/services/userService.ts
import { User } from "../types";

const API_BASE_URL = "http://localhost:8003/api";

export const getUser = async (userId: string): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};
