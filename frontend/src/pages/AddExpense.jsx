import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { createTransaction } from "../services/transactionService";

export default function AddExpense() {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">New entry</p>
          <h1>Add expense</h1>
          <p className="subhead">Keep your spending picture current.</p>
        </div>
      </div>
      <section className="panel form-panel">
        <TransactionForm
          type="expense"
          onSubmit={(payload) =>
            createTransaction(payload).then(() => navigate("/app/transactions"))
          }
        />
      </section>
    </>
  );
}
