import { formatCurrency } from "../utils/formatters";

export default function GoalCard({ goal, onDelete }) {
  const saved = goal.saved ?? goal.savedAmount ?? 0;
  const target = goal.target ?? goal.targetAmount ?? 0;
  const percent = Math.min(
    100,
    target ? Math.round((saved / target) * 100) : 0,
  );
  return (
    <article className="goal-card">
      <div className="goal-mark">{goal.emoji || "◎"}</div>
      <div className="card-heading">
        <div>
          <h3>{goal.name}</h3>
          <p>Target {formatCurrency(target)}</p>
        </div>
        <strong>{percent}%</strong>
      </div>
      <div className="progress">
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="card-meta">
        <span>{formatCurrency(saved)} saved</span>
        <span>{goal.deadline}</span>
      </div>
      {onDelete && (
        <button
          className="card-delete"
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete ${goal.name}`}
        >
          Delete
        </button>
      )}
    </article>
  );
}
