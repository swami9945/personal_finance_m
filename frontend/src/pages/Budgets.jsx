import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import BudgetCard from "../components/BudgetCard";
import PlanningForm from "../components/PlanningForm";
import {
  createBudget,
  deleteBudget,
  getBudgets,
} from "../services/budgetService";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getBudgets()
      .then(setBudgets)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message || "Budgets are unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading budgets...</h2>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>Budgets could not be loaded.</h2>
        <p>{error}</p>
      </div>
    );
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Planning</p>
          <h1>Budgets</h1>
          <p className="subhead">Give every dollar a clear job.</p>
        </div>
        <button
          className="primary-button compact"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} /> Create budget
        </button>
      </div>
      {showForm && (
        <section className="panel inline-panel">
          <PlanningForm
            kind="budget"
            onSubmit={(form) => {
              createBudget({
                name: form.name,
                category: form.category,
                limitAmount: Number(form.amount),
              })
                .then((budget) => {
                  setBudgets([...budgets, budget]);
                  setShowForm(false);
                })
                .catch((requestError) =>
                  setError(
                    requestError.response?.data?.message ||
                      "Unable to create budget.",
                  ),
                );
            }}
          />
        </section>
      )}
      <div className="card-grid">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={(id) =>
              deleteBudget(id)
                .then(() =>
                  setBudgets((items) => items.filter((item) => item.id !== id)),
                )
                .catch((requestError) =>
                  setError(
                    requestError.response?.data?.message ||
                      "Unable to delete budget.",
                  ),
                )
            }
          />
        ))}
      </div>
    </>
  );
}
