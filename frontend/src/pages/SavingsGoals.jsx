import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import GoalCard from "../components/GoalCard";
import PlanningForm from "../components/PlanningForm";
import { createGoal, deleteGoal, getGoals } from "../services/goalService";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getGoals()
      .then(setGoals)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Savings goals are unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading savings goals...</h2>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>Savings goals could not be loaded.</h2>
        <p>{error}</p>
      </div>
    );
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Future planning</p>
          <h1>Savings goals</h1>
          <p className="subhead">Make room for what matters next.</p>
        </div>
        <button
          className="primary-button compact"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} /> New goal
        </button>
      </div>
      {showForm && (
        <section className="panel inline-panel">
          <PlanningForm
            kind="goal"
            onSubmit={(form) => {
              createGoal({
                name: form.name,
                targetAmount: Number(form.amount),
                deadline: form.deadline,
              })
                .then((goal) => {
                  setGoals([...goals, goal]);
                  setShowForm(false);
                })
                .catch((requestError) =>
                  setError(
                    requestError.response?.data?.message ||
                      "Unable to create savings goal.",
                  ),
                );
            }}
          />
        </section>
      )}
      <div className="card-grid">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={(id) =>
                deleteGoal(id)
                  .then(() =>
                    setGoals((items) => items.filter((item) => item.id !== id)),
                  )
                  .catch((requestError) =>
                    setError(
                      requestError.response?.data?.message ||
                        "Unable to delete savings goal.",
                    ),
                  )
              }
            />
          ))
        ) : (
          <div className="state-panel empty-state-panel">
            <h2>No savings goals yet</h2>
            <p>Create your first goal to start tracking progress.</p>
            <button
              className="primary-button compact"
              onClick={() => setShowForm(true)}
            >
              Create your first goal
            </button>
          </div>
        )}
      </div>
    </>
  );
}
