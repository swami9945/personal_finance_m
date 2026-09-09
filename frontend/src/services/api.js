const API_BASE_URL = "http://localhost:8081/api";

export const api = {

  // =========================
  // AUTHENTICATION
  // =========================

  register: async (user) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Registration failed"
      );
    }

    return data;
  },

  login: async (user) => {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    return data;
  },


  // =========================
  // TRANSACTIONS
  // =========================

  getTransactions: async () => {
    const response = await fetch(
      `${API_BASE_URL}/transactions`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch transactions"
      );
    }

    return response.json();
  },

  createTransaction: async (transaction) => {
    const response = await fetch(
      `${API_BASE_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to create transaction"
      );
    }

    return response.json();
  },

  updateTransaction: async (id, transaction) => {
    const response = await fetch(
      `${API_BASE_URL}/transactions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to update transaction"
      );
    }

    return response.json();
  },

  deleteTransaction: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/transactions/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to delete transaction"
      );
    }

    return true;
  },


  // =========================
  // DASHBOARD
  // =========================

  getDashboard: async () => {
    const response = await fetch(
      `${API_BASE_URL}/dashboard`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch dashboard"
      );
    }

    return response.json();
  },


  // =========================
  // BUDGET
  // =========================

  getBudget: async () => {
    const response = await fetch(
      `${API_BASE_URL}/budgets`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch budget"
      );
    }

    return response.json();
  },

  createBudget: async (budget) => {
    const response = await fetch(
      `${API_BASE_URL}/budgets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budget),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to create budget"
      );
    }

    return response.json();
  },


  // =========================
  // SAVINGS GOALS
  // =========================

  getSavingsGoals: async () => {
    const response = await fetch(
      `${API_BASE_URL}/savings-goals`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch savings goals"
      );
    }

    return response.json();
  },


  // =========================
  // AVAILABLE MONEY
  // =========================

  getAvailableMoney: async () => {
    const response = await fetch(
      `${API_BASE_URL}/savings-goals/available-money`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to fetch available money"
      );
    }

    return data;
  },


  // =========================
  // CREATE SAVINGS GOAL
  // =========================

  createSavingsGoal: async (goal) => {
    const response = await fetch(
      `${API_BASE_URL}/savings-goals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to create savings goal"
      );
    }

    return data;
  },


  // =========================
  // ADD MONEY TO SAVINGS GOAL
  // =========================

  addMoneyToSavingsGoal: async (
    id,
    amount
  ) => {

    const response = await fetch(
      `${API_BASE_URL}/savings-goals/${id}/add-money`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to add money to savings goal"
      );
    }

    return data;
  },


  // =========================
  // DELETE SAVINGS GOAL
  // =========================

  deleteSavingsGoal: async (id) => {

    const response = await fetch(
      `${API_BASE_URL}/savings-goals/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to delete savings goal"
      );
    }

    return true;
  },

};