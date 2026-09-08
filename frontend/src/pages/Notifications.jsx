export default function Notifications() {
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h1>Notifications</h1>
          <p className="subhead">Helpful reminders, never noise.</p>
        </div>
      </div>
      <section className="panel simple-list">
        <div className="simple-row">
          <div>
            <strong>Budget check-in</strong>
            <span>Essentials is 73% used with 22 days left.</span>
          </div>
          <span className="status expense">New</span>
        </div>
        <div className="simple-row">
          <div>
            <strong>Goal milestone</strong>
            <span>Your emergency fund crossed 68%.</span>
          </div>
          <span className="status income">Read</span>
        </div>
      </section>
    </>
  );
}
