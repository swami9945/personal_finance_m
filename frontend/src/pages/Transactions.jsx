import { useEffect, useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";
import {
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../services/transactionService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Transactions are unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const listener = (event) => setQuery(event.detail);
    window.addEventListener("transaction-search", listener);
    return () => window.removeEventListener("transaction-search", listener);
  }, []);
  const filtered = useMemo(
    () =>
      [...transactions]
        .filter(
          (item) =>
            `${item.merchant} ${item.category}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (category === "All categories" || item.category === category),
        )
        .sort((a, b) =>
          sort === "amount"
            ? Math.abs(b.amount) - Math.abs(a.amount)
            : new Date(b.date) - new Date(a.date),
        ),
    [transactions, query, category, sort],
  );
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  function updateFilters(setter, value) {
    setter(value);
    setPage(1);
  }
  function saveEdit(values) {
    updateTransaction(editing.id, values)
      .then((updated) => {
        setTransactions((items) =>
          items.map((item) => (item.id === editing.id ? updated : item)),
        );
        setEditing(null);
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to update transaction.",
        ),
      );
  }
  function removeTransaction(id) {
    deleteTransaction(id)
      .then(() =>
        setTransactions((items) => items.filter((item) => item.id !== id)),
      )
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to delete transaction.",
        ),
      );
  }
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading transactions...</h2>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>Transactions could not be loaded.</h2>
        <p>{error}</p>
      </div>
    );
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Activity</p>
          <h1>Transactions</h1>
          <p className="subhead">A complete record of your money in and out.</p>
        </div>
        <Link className="primary-button compact" to="/app/expense">
          <Plus size={16} /> Add expense
        </Link>
      </div>
      <section className="panel">
        <div className="filter-bar">
          <div className="filter-search">
            <Filter size={16} />
            <input
              value={query}
              onChange={(event) => updateFilters(setQuery, event.target.value)}
              placeholder="Search transactions"
            />
          </div>
          <select
            value={category}
            onChange={(event) => updateFilters(setCategory, event.target.value)}
          >
            <option>All categories</option>
            <option>Groceries</option>
            <option>Salary</option>
            <option>Dining</option>
            <option>Utilities</option>
          </select>
          <select
            value={sort}
            onChange={(event) => updateFilters(setSort, event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="amount">Largest amount</option>
          </select>
        </div>
        <TransactionTable
          transactions={visible}
          onDelete={removeTransaction}
          onEdit={setEditing}
        />
        {pageCount > 1 && (
          <div className="pagination">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                className={page === index + 1 ? "current" : ""}
                key={index}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>
      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <section
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Update entry</p>
                <h2>Edit transaction</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <TransactionForm
              type={editing.type}
              initialValues={{ ...editing, amount: Math.abs(editing.amount) }}
              onSubmit={saveEdit}
            />
          </section>
        </div>
      )}
    </>
  );
}
