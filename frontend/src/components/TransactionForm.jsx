import { useState } from "react";

export default function TransactionForm({
  type = "expense",
  initialValues,
  onSubmit,
}) {
  const [form, setForm] = useState(
    initialValues || {
      merchant: "",
      amount: "",
      category: type === "income" ? "Salary" : "Shopping",
      date: new Date().toISOString().slice(0, 10),
    },
  );
  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  function submit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount),
      type,
    });
  }
  return (
    <form className="form-grid" onSubmit={submit}>
      <label>
        Merchant or source
        <input
          required
          name="merchant"
          value={form.merchant}
          onChange={change}
          placeholder={
            type === "income" ? "e.g. Acme Studio" : "e.g. Grocery store"
          }
        />
      </label>
      <label>
        Amount
        <input
          required
          min="0"
          step="0.01"
          type="number"
          name="amount"
          value={Math.abs(form.amount || "")}
          onChange={change}
          placeholder="0.00"
        />
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={change}>
          <option>Shopping</option>
          <option>Food & dining</option>
          <option>Groceries</option>
          <option>Transport</option>
          <option>Utilities</option>
          <option>Salary</option>
          <option>Freelance</option>
        </select>
      </label>
      <label>
        Date
        <input
          required
          type="date"
          name="date"
          value={form.date}
          onChange={change}
        />
      </label>
      <button className="primary-button" type="submit">
        Save {type}
      </button>
    </form>
  );
}
