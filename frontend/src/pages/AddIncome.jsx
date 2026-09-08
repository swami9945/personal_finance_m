import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { createTransaction } from "../services/transactionService";

export default function AddIncome() {
  const navigate = useNavigate();
  return (
    <FormPage
      title="Add income"
      copy="Capture money coming into your accounts."
      type="income"
      onSubmit={(payload) =>
        createTransaction(payload).then(() => navigate("/app/transactions"))
      }
    />
  );
}
function FormPage({ title, copy, type, onSubmit }) {
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">New entry</p>
          <h1>{title}</h1>
          <p className="subhead">{copy}</p>
        </div>
      </div>
      <section className="panel form-panel">
        <TransactionForm type={type} onSubmit={onSubmit} />
      </section>
    </>
  );
}
export { FormPage };
