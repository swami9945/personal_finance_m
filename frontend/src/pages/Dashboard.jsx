import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import { api } from "../services/api";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    budget: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardData, transactionData] =
        await Promise.all([
          api.getDashboard(),
          api.getTransactions(),
        ]);

      setDashboard(dashboardData);
      setTransactions(transactionData);
    } catch (error) {
      console.error("Dashboard error:", error);

      setError(
        "Unable to load financial data. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // =========================
  // CHART DATA
  // =========================

  const incomeExpenseData = [
    {
      name: "Income",
      amount: Number(dashboard.totalIncome || 0),
    },
    {
      name: "Expenses",
      amount: Number(dashboard.totalExpenses || 0),
    },
    {
      name: "Savings",
      amount: Number(dashboard.totalSavings || 0),
    },
  ];

  // Category-wise expense data
  const categoryTotals = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE"
    )
    .forEach((transaction) => {
      const category =
        transaction.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(transaction.amount || 0);
    });

  const expenseCategoryData = Object.entries(
    categoryTotals
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Overview of your personal finances"
      />

      {loading && (
        <div className="loading">
          Loading financial data...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="stats-grid">
        <StatCard
          title="Total Income"
          value={formatMoney(dashboard.totalIncome)}
          icon="↗"
          description="Total income"
        />

        <StatCard
          title="Total Expenses"
          value={formatMoney(dashboard.totalExpenses)}
          icon="↘"
          description="Total expenses"
        />

        <StatCard
          title="Total Savings"
          value={formatMoney(dashboard.totalSavings)}
          icon="₹"
          description="Income minus expenses"
        />

        <StatCard
          title="Monthly Budget"
          value={formatMoney(dashboard.budget)}
          icon="◫"
          description="Current budget"
        />
      </div>

      {/* =========================
          CHARTS
      ========================= */}

      <div className="dashboard-charts">

        {/* Income / Expense / Savings */}

        <section className="content-card chart-card">
          <div className="section-header">
            <div>
              <h2>Financial Overview</h2>
              <p>Compare your income, expenses and savings</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart
                data={incomeExpenseData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    formatMoney(value)
                  }
                />

                <Legend />

                <Bar
                  dataKey="amount"
                  name="Amount"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Expense Categories */}

        <section className="content-card chart-card">
          <div className="section-header">
            <div>
              <h2>Expense by Category</h2>
              <p>See where your money is being spent</p>
            </div>
          </div>

          {expenseCategoryData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◉</div>

              <h3>No expense data</h3>

              <p>
                Add expenses to see category-wise
                spending.
              </p>
            </div>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    label
                  >
                    {expenseCategoryData.map(
                      (_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#4f46e5",
                              "#10b981",
                              "#f59e0b",
                              "#ef4444",
                              "#8b5cf6",
                              "#06b6d4",
                            ][
                              index %
                                6
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatMoney(value)
                    }
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

      </div>

      {/* =========================
          RECENT TRANSACTIONS
      ========================= */}

      <section className="content-card">
        <div className="section-header">
          <div>
            <h2>Recent Transactions</h2>
            <p>Your latest financial activity</p>
          </div>

          <button
            className="refresh-button"
            onClick={loadDashboard}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        <TransactionTable
          transactions={transactions.slice(0, 5)}
        />
      </section>
    </>
  );
}

export default Dashboard;