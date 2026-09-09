import { Link } from "react-router-dom";

function TransactionTable({ transactions = [], onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-empty">
        <div className="transaction-empty-icon">₹</div>
        <h3>No transactions yet</h3>
        <p>Add your first income or expense to see it here.</p>

        <Link to="/transactions" className="add-transaction-link">
          Add Transaction →
        </Link>
      </div>
    );
  }

  return (
    <div className="transaction-table-wrapper">

      <div className="transaction-table-header">
        <div className="transaction-title-area">
          <div className="transaction-main-icon">
            ₹
          </div>

          <div>
            <h2>Recent Transactions</h2>
            <p>Your latest financial activity</p>
          </div>
        </div>

        <Link
          to="/transactions"
          className="view-all-button"
        >
          View All →
        </Link>
      </div>

      <div className="transaction-table">

        <div className="transaction-table-head">

          <div>Description</div>
          <div>Category</div>
          <div>Date</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Action</div>

        </div>

        {transactions.map((transaction) => {

          const isIncome =
            transaction.type === "INCOME";

          return (
            <div
              className={`transaction-row ${
                isIncome
                  ? "income-row"
                  : "expense-row"
              }`}
              key={transaction.id}
            >

              {/* Description */}
              <div className="transaction-description">

                <div
                  className={`transaction-icon ${
                    isIncome
                      ? "income-icon"
                      : "expense-icon"
                  }`}
                >
                  {isIncome ? "↗" : "↘"}
                </div>

                <div>
                  <strong>
                    {transaction.description ||
                      "No description"}
                  </strong>

                  <span>
                    {transaction.category ||
                      "Other"}
                  </span>
                </div>

              </div>

              {/* Category */}
              <div className="transaction-category">
                {transaction.category ||
                  "Other"}
              </div>

              {/* Date */}
              <div className="transaction-date">
                <span>📅</span>
                {transaction.transactionDate}
              </div>

              {/* Type */}
              <div>

                <span
                  className={`transaction-badge ${
                    isIncome
                      ? "income-badge"
                      : "expense-badge"
                  }`}
                >
                  {isIncome
                    ? "↗ INCOME"
                    : "↘ EXPENSE"}
                </span>

              </div>

              {/* Amount */}
              <div
                className={`transaction-amount ${
                  isIncome
                    ? "income-amount"
                    : "expense-amount"
                }`}
              >
                {isIncome ? "+" : "-"}₹
                {Number(
                  transaction.amount || 0
                ).toLocaleString("en-IN")}
              </div>

              {/* Action */}
              <div>

                {onDelete && (
                  <button
                    className={`delete-transaction-button ${
                      isIncome
                        ? "delete-income"
                        : "delete-expense"
                    }`}
                    onClick={() =>
                      onDelete(transaction.id)
                    }
                  >
                    🗑 Delete
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default TransactionTable;