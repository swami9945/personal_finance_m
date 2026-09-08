export default function Reports() {
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Export center</p>
          <h1>Reports</h1>
          <p className="subhead">Prepare a clear snapshot of your finances.</p>
        </div>
        <button className="primary-button compact">Download report</button>
      </div>
      <section className="panel report-list">
        <div className="simple-row">
          <div>
            <strong>September 2026 overview</strong>
            <span>Income, expenses, budgets and goals</span>
          </div>
          <b>PDF</b>
        </div>
        <div className="simple-row">
          <div>
            <strong>Transaction history</strong>
            <span>All activity for the current year</span>
          </div>
          <b>CSV</b>
        </div>
      </section>
    </>
  );
}
