import {
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  Target,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import BudgetCard from "../components/BudgetCard";
import GoalCard from "../components/GoalCard";
import { formatCurrency, formatDate } from "../utils/formatters";
import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Dashboard data is unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading your financial picture...</h2>
        <p>Fetching the latest data from your workspace.</p>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>We could not load your dashboard.</h2>
        <p>{error}</p>
        <button
          className="primary-button"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  const transactions = data.recentTransactions || [];
  const budgets = data.budgets || [];
  const goals = data.goals || [];
  const income = data.income || 0;
  const expenses = data.expenses || 0;
  /* Keep the dashboard's presentation model separate from the API response shape. */
  return (
    <>
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Monday, September 8, 2026</p>
          <h1>
            Track Smart Save More<span>✦</span>
          </h1>
          <p className="subhead">
            Here is your financial picture for September.
          </p>
        </div>
        <button className="period-picker">September 2026</button>
      </div>
      <section className="stats-grid">
        <StatCard
          label="Total balance"
          value={formatCurrency(data.balance)}
          detail={
            <>
              <ArrowUpRight size={14} /> 8.4% vs last month
            </>
          }
          icon={WalletCards}
        />
        <StatCard
          label="Total income"
          value={formatCurrency(income)}
          detail={
            <>
              <ArrowUpRight size={14} /> 12.1% vs last month
            </>
          }
          icon={ArrowDownLeft}
          tone="blue"
        />
        <StatCard
          label="Total expenses"
          value={formatCurrency(expenses)}
          detail={
            <>
              <ArrowDownLeft size={14} /> 3.2% vs last month
            </>
          }
          icon={ArrowUpRight}
          tone="coral"
        />
        <StatCard
          label="Total savings"
          value={formatCurrency(data.savings)}
          detail={`Savings rate ${data.savingsRate}%`}
          icon={PiggyBank}
          tone="sun"
        />
      </section>
      <section className="dashboard-command">
        <div className="health-score">
          <span className="health-ring">82</span>
          <div>
            <p className="eyebrow">Financial health</p>
            <strong>Looking steady</strong>
            <small>Up 6 points this month</small>
          </div>
        </div>
        <div className="command-divider" />
        <div className="quick-actions">
          <span className="eyebrow">Quick actions</span>
          <div>
            <Link to="/app/income">+ Add income</Link>
            <Link to="/app/expense">+ Add expense</Link>
            <Link to="/app/savings-goals">Set a goal</Link>
          </div>
        </div>
      </section>
      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Monthly cash flow</h2>
              <p>Income and expenses over time</p>
            </div>
            <div className="legend">
              <span>
                <i className="legend-dot income" /> Income
              </span>
              <span>
                <i className="legend-dot expense" /> Expenses
              </span>
            </div>
          </div>
          <div className="chart-wrap">
            <div className="chart-y">
              <span>₹8k</span>
              <span>₹6k</span>
              <span>₹4k</span>
              <span>₹2k</span>
              <span>₹0</span>
            </div>
            <div className="chart">
              <div className="grid-lines">
                {[1, 2, 3, 4].map((line) => (
                  <i key={line} />
                ))}
              </div>
              <div className="bars">
                {[34, 50, 43, 68, 57, 82, 63, 76, 54, 71, 87, 61].map(
                  (height, index) => (
                    <div className="bar-group" key={index}>
                      <div
                        className="bar income-bar"
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className="bar expense-bar"
                        style={{ height: `${Math.max(14, height - 24)}%` }}
                      />
                      <small>
                        {
                          [
                            "Oct",
                            "",
                            "Dec",
                            "",
                            "Feb",
                            "",
                            "Apr",
                            "",
                            "Jun",
                            "",
                            "Aug",
                            "",
                          ][index]
                        }
                      </small>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Expense categories</h2>
              <p>September breakdown</p>
            </div>
          </div>
          <div className="category-chart">
            <div className="donut">
              <div>
                <strong>68%</strong>
                <span>used</span>
              </div>
            </div>
            <div className="category-list">
              <span>
                <i className="budget-dot coral" /> Housing <b>38%</b>
              </span>
              <span>
                <i className="budget-dot blue" /> Food & dining <b>24%</b>
              </span>
              <span>
                <i className="budget-dot mint" /> Transport <b>16%</b>
              </span>
              <span>
                <i className="budget-dot sun" /> Lifestyle <b>12%</b>
              </span>
            </div>
          </div>
        </article>
      </section>
      <section className="lower-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent transactions</h2>
              <p>Your latest money moves</p>
            </div>
            <Link className="text-button" to="/app/transactions">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="transaction-list">
            {transactions.map((item) => (
              <div className="transaction" key={item.id}>
                <div className="merchant-icon blue">
                  {item.merchant.slice(0, 2).toUpperCase()}
                </div>
                <div className="transaction-info">
                  <strong>{item.merchant}</strong>
                  <span>
                    {item.category} <i /> {formatDate(item.date)}
                  </span>
                </div>
                <strong
                  className={`amount ${item.amount > 0 ? "income-amount" : ""}`}
                >
                  {formatCurrency(item.amount)}
                </strong>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Goals in motion</h2>
              <p>Small steps add up</p>
            </div>
            <Target size={18} color="var(--coral)" />
          </div>
          <div className="goal-stack">
            {goals.map((goal) => (
              <GoalCard key={goal.name} goal={goal} />
            ))}
          </div>
        </article>
      </section>
      <section className="dashboard-grid card-grid">
        <div>
          <div className="section-heading">
            <h2>Budget progress</h2>
            <Link to="/app/budgets">Manage budgets</Link>
          </div>
          <div className="goal-stack">
            {budgets.map((budget) => (
              <BudgetCard key={budget.name} budget={budget} />
            ))}
          </div>
        </div>
        <div className="alert-panel">
          <p className="eyebrow">One thing to notice</p>
          <h2>You are ₹430 under your average monthly spend.</h2>
          <p>That gives your savings goals a little more room this month.</p>
        </div>
      </section>
    </>
  );
}
