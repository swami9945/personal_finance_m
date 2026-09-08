import { useEffect, useState } from "react";
import PlanningForm from "../components/PlanningForm";
import {
  createRecurring,
  deleteRecurring,
  getRecurring,
  updateRecurring,
} from "../services/recurringService";
import { formatCurrency } from "../utils/formatters";

export default function RecurringTransactions() {
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getRecurring()
      .then(setRows)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Recurring transactions are unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  function save(form) {
    createRecurring({
      name: form.name,
      amount: Number(form.amount),
      frequency: form.frequency,
    })
      .then((item) => {
        setRows((items) => [...items, item]);
        setShowForm(false);
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to create recurring transaction.",
        ),
      );
  }
  function remove(id) {
    deleteRecurring(id)
      .then(() => setRows((items) => items.filter((item) => item.id !== id)))
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to delete recurring transaction.",
        ),
      );
  }
  function edit(item) {
    const name = window.prompt("Recurring transaction name", item.name);
    if (!name) return;
    updateRecurring(item.id, {
      name,
      amount: item.amount,
      frequency: item.frequency,
    })
      .then((updated) =>
        setRows((items) =>
          items.map((current) => (current.id === item.id ? updated : current)),
        ),
      )
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to update recurring transaction.",
        ),
      );
  }
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading recurring transactions...</h2>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>Recurring transactions could not be loaded.</h2>
        <p>{error}</p>
      </div>
    );
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Automation</p>
          <h1>Recurring transactions</h1>
          <p className="subhead">
            Stay ahead of subscriptions, bills, and regular income.
          </p>
        </div>
        <button
          className="primary-button compact"
          onClick={() => setShowForm(!showForm)}
        >
          Add recurring
        </button>
      </div>
      {showForm && (
        <section className="panel inline-panel">
          <PlanningForm kind="recurring" onSubmit={save} />
        </section>
      )}
      <section className="panel simple-list">
        {rows.length ? (
          rows.map((row) => (
            <div className="simple-row" key={row.id}>
              <div>
                <strong>{row.name}</strong>
                <span>
                  {formatCurrency(row.amount)} · {row.frequency}
                </span>
              </div>
              <div className="row-actions">
                <button onClick={() => edit(row)}>Edit</button>
                <button onClick={() => remove(row.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="state-panel empty-state-panel">
            <h2>No recurring transactions yet</h2>
            <p>Add rent, bills, subscriptions, or regular income.</p>
          </div>
        )}
      </section>
    </>
  );
}
