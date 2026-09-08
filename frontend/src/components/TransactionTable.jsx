import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency, formatDate, initials } from "../utils/formatters";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Type</th>
            <th className="align-right">Amount</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className="table-merchant">
                  <span className="merchant-icon blue">
                    {initials(transaction.merchant)}
                  </span>
                  <strong>{transaction.merchant}</strong>
                </div>
              </td>
              <td>{transaction.category}</td>
              <td>{formatDate(transaction.date)}</td>
              <td>
                <span className={`status ${transaction.type}`}>
                  {transaction.type}
                </span>
              </td>
              <td
                className={`align-right amount ${transaction.type === "income" ? "income-amount" : ""}`}
              >
                {formatCurrency(transaction.amount)}
              </td>
              <td>
                <div className="row-actions">
                  <button
                    aria-label={`Edit ${transaction.merchant}`}
                    onClick={() => onEdit(transaction)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    aria-label={`Delete ${transaction.merchant}`}
                    onClick={() => onDelete(transaction.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <p className="empty-state">No transactions match your filters.</p>
      )}
    </div>
  );
}
