import { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

function Budget() {
  const [budget, setBudget] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBudget = async () => {
    try {
      setError("");

      const data = await api.getBudget();
      setBudget(data);
    } catch (error) {
      console.error("Budget error:", error);
      setError(
        "Unable to load budget. Please make sure the backend is running."
      );
    }
  };

  useEffect(() => {
    loadBudget();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid budget amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.createBudget({
        amount: Number(amount),
      });

      setAmount("");

      await loadBudget();
    } catch (error) {
      console.error("Budget save error:", error);

      setError("Unable to save budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="budget-page">

      <Header
        title="Budget"
        subtitle="Set and monitor your monthly budget"
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          SET BUDGET
      ========================= */}

      <section className="budget-card">

        <div className="budget-card-header">
          <div>
            <h2>Set Monthly Budget</h2>
            <p>
              Create a spending limit for your month
            </p>
          </div>

          <div className="budget-icon">
            ₹
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="budget-form"
        >

          <div className="budget-input-group">

            <label>
              Monthly Budget Amount
            </label>

            <div className="budget-input-wrapper">

              <span>₹</span>

              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="budget-save-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Budget"}
          </button>

        </form>

      </section>


      {/* =========================
          CURRENT BUDGET
      ========================= */}

      <section className="budget-card current-budget-card">

        <div className="budget-card-header">

          <div>
            <h2>Current Budget</h2>

            <p>
              Your active monthly spending limit
            </p>
          </div>

          <div className="current-budget-icon">
            ✓
          </div>

        </div>

        {budget ? (

          <div className="current-budget">

            <div className="current-budget-info">

              <span>
                Monthly Budget
              </span>

              <strong>
                {formatMoney(budget.amount)}
              </strong>

            </div>

            <div className="budget-status">
              <span className="status-dot"></span>
              Budget is active
            </div>

          </div>

        ) : (

          <div className="budget-empty">

            <div className="budget-empty-icon">
              ₹
            </div>

            <h3>
              No budget set
            </h3>

            <p>
              Set your monthly budget to start
              tracking your spending.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default Budget;