import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import { api } from "../services/api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const transactions = await api.getTransactions();

      const expenseTransactions = transactions.filter(
        (transaction) => transaction.type === "EXPENSE"
      );

      setExpenses(expenseTransactions);
    } catch (error) {
      console.error("Expenses error:", error);

      setError(
        "Unable to load expenses. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const totalExpenses = expenses.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <>
      <Header
        title="Expenses"
        subtitle="Track and manage your spending"
      />

      {loading && (
        <div className="loading">
          Loading expenses...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="single-summary">
        <div className="summary-card">
          <span>Total Expenses</span>

          <strong>
            {formatMoney(totalExpenses)}
          </strong>
        </div>
      </div>

      <section className="content-card">
        <div className="section-header">
          <div>
            <h2>Expense Transactions</h2>

            <p>
              {expenses.length} expense transaction(s)
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={loadExpenses}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <TransactionTable transactions={expenses} />
      </section>
    </>
  );
}

export default Expenses;