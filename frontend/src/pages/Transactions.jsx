import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionTable from "../components/TransactionTable";
import { api } from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    type: "EXPENSE",
    category: "",
    amount: "",
    description: "",
    transactionDate: "",
  });

  const loadTransactions = async () => {
    try {
      setError("");

      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError("Unable to load transactions.");
      console.error(err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.category.trim()) {
      alert("Please enter a category.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!form.transactionDate) {
      alert("Please select a date.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.createTransaction({
        type: form.type,
        category: form.category.trim(),
        amount: Number(form.amount),
        description: form.description.trim(),
        transactionDate: form.transactionDate,
      });

      setForm({
        type: "EXPENSE",
        category: "",
        amount: "",
        description: "",
        transactionDate: "",
      });

      await loadTransactions();
    } catch (err) {
      setError("Unable to save transaction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.deleteTransaction(id);

      await loadTransactions();
    } catch (err) {
      setError("Unable to delete transaction.");
      console.error(err);
    }
  };

  return (
    <>
      <Header
        title="Transactions"
        subtitle="Manage your income and expenses"
      />

      {error && <div className="error-message">{error}</div>}

      <section className="content-card form-card">
        <div className="section-header">
          <div>
            <h2>Add Transaction</h2>
            <p>Record a new income or expense</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Transaction Type</label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              placeholder="Food, Salary, Travel..."
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="transactionDate"
              value={form.transactionDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </section>

      <section className="content-card">
        <div className="section-header">
          <div>
            <h2>All Transactions</h2>
            <p>{transactions.length} transaction(s)</p>
          </div>
        </div>

        <TransactionTable
          transactions={transactions}
          onDelete={handleDelete}
        />
      </section>
    </>
  );
}

export default Transactions;