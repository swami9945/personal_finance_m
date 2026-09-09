import { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../services/api";

function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [availableMoney, setAvailableMoney] = useState(0);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const [addAmount, setAddAmount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  const loadData = async () => {
    try {
      setError("");

      const [goalsData, moneyData] =
        await Promise.all([
          api.getSavingsGoals(),
          api.getAvailableMoney(),
        ]);

      setGoals(goalsData);
      setAvailableMoney(
        Number(moneyData.availableMoney || 0)
      );

    } catch (error) {
      console.error(error);

      setError(
        "Unable to load savings goals. Please make sure the backend is running."
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // CREATE GOAL
  // =========================

  const handleCreateGoal = async (event) => {
    event.preventDefault();

    if (!goalName.trim()) {
      setError("Please enter a goal name.");
      return;
    }

    if (
      !targetAmount ||
      Number(targetAmount) <= 0
    ) {
      setError("Please enter a valid target amount.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.createSavingsGoal({
        name: goalName.trim(),
        targetAmount: Number(targetAmount),
      });

      setGoalName("");
      setTargetAmount("");

      await loadData();

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Unable to create savings goal."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD MONEY
  // =========================

  const handleAddMoney = async (id) => {
    const amount = Number(addAmount[id]);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (amount > availableMoney) {
      setError(
        `Not enough available money. Available: ${formatMoney(
          availableMoney
        )}`
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.addMoneyToSavingsGoal(
        id,
        amount
      );

      setAddAmount((previous) => ({
        ...previous,
        [id]: "",
      }));

      await loadData();

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Unable to add money."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE GOAL
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this savings goal?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      await api.deleteSavingsGoal(id);

      await loadData();

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Unable to delete savings goal."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORMAT MONEY
  // =========================

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`;
  };

  // =========================
  // TOTAL SAVED
  // =========================

  const totalSaved = goals.reduce(
    (sum, goal) =>
      sum + Number(goal.savedAmount || 0),
    0
  );

  return (
    <div className="savings-goals-page">

      <Header
        title="Savings Goals"
        subtitle="Save money for the things you want in the future"
      />

      {/* ERROR MESSAGE */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          MONEY SUMMARY
      ========================= */}

      <div className="goals-summary">

        <div className="goals-summary-card">

          <span>Available Money</span>

          <strong>
            {formatMoney(availableMoney)}
          </strong>

          <small>
            Income − Expenses − Goals
          </small>

        </div>

        <div className="goals-summary-card">

          <span>Total Goals</span>

          <strong>
            {goals.length}
          </strong>

        </div>

        <div className="goals-summary-card">

          <span>Total Saved</span>

          <strong>
            {formatMoney(totalSaved)}
          </strong>

        </div>

      </div>

      {/* =========================
          CREATE GOAL
      ========================= */}

      <section className="savings-card create-goal-card">

        <div className="savings-card-header">

          <div>

            <h2>
              Create Savings Goal
            </h2>

            <p>
              Create a goal for something you want
              to buy in the future.
            </p>

          </div>

          <div className="savings-goal-icon">
            🎯
          </div>

        </div>

        <form
          className="goal-form"
          onSubmit={handleCreateGoal}
        >

          <div className="goal-input-group">

            <label>
              Goal Name
            </label>

            <input
              type="text"
              placeholder="Example: Bike, House, Laptop..."
              value={goalName}
              onChange={(event) =>
                setGoalName(
                  event.target.value
                )
              }
            />

          </div>

          <div className="goal-input-group">

            <label>
              Target Amount
            </label>

            <div className="goal-money-input">

              <span>₹</span>

              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter target amount"
                value={targetAmount}
                onChange={(event) =>
                  setTargetAmount(
                    event.target.value
                  )
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="create-goal-button"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "+ Create Goal"}
          </button>

        </form>

      </section>

      {/* =========================
          SAVINGS GOALS
      ========================= */}

      <section className="savings-card">

        <div className="savings-card-header">

          <div>

            <h2>
              My Savings Goals
            </h2>

            <p>
              Keep money aside for your future plans.
            </p>

          </div>

        </div>

        {goals.length === 0 ? (

          <div className="goals-empty">

            <div className="goals-empty-icon">
              🎯
            </div>

            <h3>
              No savings goals yet
            </h3>

            <p>
              Create your first goal above,
              such as a Bike or House.
            </p>

          </div>

        ) : (

          <div className="goals-grid">

            {goals.map((goal) => {

              const target =
                Number(
                  goal.targetAmount || 0
                );

              const saved =
                Number(
                  goal.savedAmount || 0
                );

              const remaining =
                Math.max(
                  target - saved,
                  0
                );

              const percentage =
                target > 0
                  ? Math.min(
                      (saved / target) * 100,
                      100
                    )
                  : 0;

              return (
                <div
                  className="goal-card"
                  key={goal.id}
                >

                  {/* GOAL HEADER */}

                  <div className="goal-card-top">

                    <div>

                      <h3>
                        {goal.name}
                      </h3>

                      <span>
                        Savings Goal
                      </span>

                    </div>

                    <button
                      className="delete-goal-button"
                      onClick={() =>
                        handleDelete(
                          goal.id
                        )
                      }
                      disabled={loading}
                      title="Delete goal"
                    >
                      ×
                    </button>

                  </div>

                  {/* AMOUNTS */}

                  <div className="goal-amounts">

                    <div>

                      <span>
                        Saved
                      </span>

                      <strong>
                        {formatMoney(saved)}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Target
                      </span>

                      <strong>
                        {formatMoney(target)}
                      </strong>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="goal-progress">

                    <div className="goal-progress-bar">

                      <div
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <span>
                      {Math.round(
                        percentage
                      )}%
                    </span>

                  </div>

                  {/* REMAINING */}

                  <div className="goal-remaining">

                    {remaining > 0 ? (
                      <>
                        <span>
                          Remaining
                        </span>

                        <strong>
                          {formatMoney(
                            remaining
                          )}
                        </strong>
                      </>
                    ) : (
                      <strong className="goal-complete">
                        🎉 Goal Achieved!
                      </strong>
                    )}

                  </div>

                  {/* ADD MONEY */}

                  {remaining > 0 && (

                    <div className="add-money-section">

                      <label>
                        Add Money
                      </label>

                      <div className="add-money-row">

                        <div className="goal-money-input">

                          <span>
                            ₹
                          </span>

                          <input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="Amount"
                            value={
                              addAmount[
                                goal.id
                              ] || ""
                            }
                            onChange={(
                              event
                            ) =>
                              setAddAmount(
                                (previous) => ({
                                  ...previous,
                                  [goal.id]:
                                    event.target.value,
                                })
                              )
                            }
                          />

                        </div>

                        <button
                          className="add-money-button"
                          onClick={() =>
                            handleAddMoney(
                              goal.id
                            )
                          }
                          disabled={loading}
                        >
                          Add
                        </button>

                      </div>

                    </div>

                  )}

                </div>
              );
            })}

          </div>

        )}

      </section>

    </div>
  );
}

export default SavingsGoals;