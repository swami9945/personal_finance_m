import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import { api } from "../services/api";

function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIncome = async () => {
    try {
      setLoading(true);
      setError("");

      const transactions = await api.getTransactions();

      const incomeTransactions = transactions.filter(
        (transaction) => transaction.type === "INCOME"
      );

      setIncome(incomeTransactions);
    } catch (error) {
      console.error("Income error:", error);

      setError(
        "Unable to load income. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncome();
  }, []);

  const totalIncome = income.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <>
      <Header
        title="Income"
        subtitle="Track money coming into your account"
      />

      {loading && (
        <div className="loading">
          Loading income...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="single-summary">
        <div className="summary-card">
          <span>Total Income</span>

          <strong>
            {formatMoney(totalIncome)}
          </strong>
        </div>
      </div>

      <section className="content-card">
        <div className="section-header">
          <div>
            <h2>Income Transactions</h2>

            <p>
              {income.length} income transaction(s)
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={loadIncome}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <TransactionTable transactions={income} />
      </section>
    </>
  );
}

export default Income;