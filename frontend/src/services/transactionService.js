import api from "./api";

export const fallbackTransactions = [
  {
    id: 1,
    merchant: "Whole Foods Market",
    category: "Groceries",
    date: "2026-09-08",
    amount: -84.32,
    type: "expense",
  },
  {
    id: 2,
    merchant: "Acme Studio",
    category: "Salary",
    date: "2026-09-07",
    amount: 4200,
    type: "income",
  },
  {
    id: 3,
    merchant: "Blue Bottle Coffee",
    category: "Dining",
    date: "2026-09-04",
    amount: -6.5,
    type: "expense",
  },
  {
    id: 4,
    merchant: "City Power & Light",
    category: "Utilities",
    date: "2026-09-03",
    amount: -124.8,
    type: "expense",
  },
];

export async function getTransactions() {
  const response = await api.get("/transactions");
  return response.data;
}

export async function createTransaction(payload) {
  const response = await api.post("/transactions", payload);
  return response.data;
}

export async function updateTransaction(id, payload) {
  const response = await api.put(`/transactions/${id}`, payload);
  return response.data;
}

export async function deleteTransaction(id) {
  await api.delete(`/transactions/${id}`);
}
