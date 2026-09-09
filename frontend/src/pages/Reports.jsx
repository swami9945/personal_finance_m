import { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Reports error:", error);

      setError(
        "Unable to load reports. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // =========================
  // INCOME & EXPENSES
  // =========================

  const income = transactions.filter(
    (item) => item.type === "INCOME"
  );

  const expenses = transactions.filter(
    (item) => item.type === "EXPENSE"
  );

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const savings = totalIncome - totalExpenses;

  // =========================
  // CATEGORY DATA
  // =========================

  const categories = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categories[category] =
      (categories[category] || 0) +
      Number(expense.amount || 0);
  });

  const categoryData = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  );

  // =========================
  // SAVINGS PERCENTAGE
  // =========================

  let savingsPercentage = 0;

  if (totalIncome > 0) {
    savingsPercentage =
      (savings / totalIncome) * 100;
  }

  // Keep percentage between 0 and 100
  const healthPercentage = Math.min(
    Math.max(savingsPercentage, 0),
    100
  );

  // =========================
  // FINANCIAL HEALTH MESSAGE
  // =========================

  let healthTitle = "Start Saving";

  let healthMessage =
    "Add income and expenses to understand your financial health.";

  if (totalIncome > 0) {
    if (savingsPercentage >= 50) {
      healthTitle = "Excellent! 🎉";
      healthMessage =
        "You are saving a healthy portion of your income.";
    } else if (savingsPercentage >= 20) {
      healthTitle = "Good Financial Health 👍";
      healthMessage =
        "You are maintaining a good balance between spending and saving.";
    } else if (savingsPercentage > 0) {
      healthTitle = "Keep Improving 💪";
      healthMessage =
        "Try reducing unnecessary expenses to increase your savings.";
    } else {
      healthTitle = "Watch Your Spending ⚠️";
      healthMessage =
        "Your expenses are equal to or greater than your income.";
    }
  }

  // =========================
  // MONEY FORMAT
  // =========================

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <div className="report-page">

      <Header
        title="Reports"
        subtitle="Understand your financial activity"
      />

      {loading && (
        <div className="loading">
          Loading reports...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="report-summary-grid">

        {/* Income */}

        <div className="report-card report-income">

          <div className="report-card-icon">
            ↗
          </div>

          <span>Total Income</span>

          <strong>
            {formatMoney(totalIncome)}
          </strong>

        </div>

        {/* Expenses */}

        <div className="report-card report-expense">

          <div className="report-card-icon">
            ↘
          </div>

          <span>Total Expenses</span>

          <strong>
            {formatMoney(totalExpenses)}
          </strong>

        </div>

        {/* Savings */}

        <div className="report-card report-savings">

          <div className="report-card-icon">
            ₹
          </div>

          <span>Total Savings</span>

          <strong>
            {formatMoney(savings)}
          </strong>

        </div>

      </div>

      {/* =================================================
          REPORT CONTENT
      ================================================= */}

      <div className="report-content">

        {/* =========================
            CATEGORY EXPENSES
        ========================= */}

        <section className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>Expense Categories</h2>

              <p>
                See where your money is being spent
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={loadTransactions}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : "Refresh"}
            </button>

          </div>

          {categoryData.length === 0 ? (

            <div className="report-empty">

              <div className="report-empty-icon">
                ▥
              </div>

              <h3>No expense data</h3>

              <p>
                Add expenses to generate your
                spending report.
              </p>

            </div>

          ) : (

            <div className="category-list">

              {categoryData.map(
                ([category, amount]) => {

                  const percentage =
                    totalExpenses > 0
                      ? (amount /
                          totalExpenses) *
                        100
                      : 0;

                  return (
                    <div
                      className="category-item"
                      key={category}
                    >

                      <div className="category-info">

                        <div className="category-name">

                          <span className="category-dot"></span>

                          {category}

                        </div>

                        <span className="category-amount">
                          {formatMoney(amount)}
                        </span>

                      </div>

                      <div className="category-progress">

                        <div
                          className="category-progress-bar"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>


        {/* =========================
            FINANCIAL HEALTH
        ========================= */}

        <section className="report-panel financial-health">

          <div className="report-panel-header">

            <div>
              <h2>Financial Health</h2>

              <p>
                Based on your income and expenses
              </p>
            </div>

          </div>

          <div
            className="health-circle"
            style={{
              background: `
                radial-gradient(
                  circle,
                  #ffffff 55%,
                  transparent 56%
                ),
                conic-gradient(
                  #4f46e5
                  ${healthPercentage * 3.6}deg,
                  #e0e7ff
                  ${healthPercentage * 3.6}deg
                )
              `,
            }}
          >

            <strong>
              {Math.round(healthPercentage)}%
            </strong>

            <span>
              Savings
            </span>

          </div>

          <div className="health-message">

            <h3>
              {healthTitle}
            </h3>

            <p>
              {healthMessage}
            </p>

          </div>

          {/* Savings information */}

          <div className="savings-box">

            <div className="savings-box-header">

              <span>
                Income
              </span>

              <strong>
                {formatMoney(totalIncome)}
              </strong>

            </div>

            <div className="savings-box-header">

              <span>
                Expenses
              </span>

              <strong>
                {formatMoney(totalExpenses)}
              </strong>

            </div>

            <div className="savings-box-header">

              <span>
                Savings
              </span>

              <strong>
                {formatMoney(savings)}
              </strong>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Reports;