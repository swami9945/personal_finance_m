import { formatCurrency } from "../utils/formatters";

export default function BudgetCard({ budget, onDelete }) {
  const spent = budget.spent ?? budget.spentAmount ?? 0;
  const limit = budget.limit ?? budget.limitAmount ?? 0;
  const percent = Math.min(100, limit ? Math.round((spent / limit) * 100) : 0);
  return (
    <article className="budget-card">
      <div className="card-heading">
        <div>
          <h3>{budget.name}</h3>
          <p>{budget.category}</p>
        </div>
        <strong>{percent}%</strong>
      </div>
      <div className="progress">
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="card-meta">
        <span>{formatCurrency(spent)} spent</span>
        <span>{formatCurrency(limit - spent)} left</span>
      </div>
      {onDelete && (
        <button
          className="card-delete"
          onClick={() => onDelete(budget.id)}
          aria-label={`Delete ${budget.name}`}
        >
          Delete
        </button>
      )}
    </article>
  );
}
