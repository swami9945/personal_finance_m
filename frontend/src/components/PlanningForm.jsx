import { useState } from "react";

export default function PlanningForm({ kind, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    deadline: "",
    frequency: "Monthly",
  });
  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function submit(event) {
    event.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      amount: "",
      category: "",
      deadline: "",
      frequency: "Monthly",
    });
  }
  return (
    <form className="inline-form" onSubmit={submit}>
      <input
        required
        name="name"
        value={form.name}
        onChange={change}
        placeholder={
          kind === "budget"
            ? "Budget name"
            : kind === "goal"
              ? "Goal name"
              : "Transaction name"
        }
      />
      <input
        required
        min="0"
        step="0.01"
        type="number"
        name="amount"
        value={form.amount}
        onChange={change}
        placeholder={kind === "budget" ? "Monthly limit" : "Amount"}
      />
      {kind === "budget" && (
        <input
          required
          name="category"
          value={form.category}
          onChange={change}
          placeholder="Category"
        />
      )}
      {kind === "goal" && (
        <input
          required
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={change}
        />
      )}
      {kind === "recurring" && (
        <select name="frequency" value={form.frequency} onChange={change}>
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      )}
      <button className="primary-button compact" type="submit">
        Create
      </button>
    </form>
  );
}
