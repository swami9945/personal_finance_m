export default function Analytics() {
  return (
    <SimplePage
      title="Analytics"
      eyebrow="Insights"
      copy="Spot patterns in your financial life."
      metric="Your expenses are trending 8% below your three-month average."
    />
  );
}
function SimplePage({ title, eyebrow, copy, metric }) {
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="subhead">{copy}</p>
        </div>
      </div>
      <section className="panel insight-panel">
        <div className="mini-chart">
          {[40, 55, 48, 72, 64, 82, 68, 90].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <h2>{metric}</h2>
        <p>Use these signals to make the next month feel more intentional.</p>
      </section>
    </>
  );
}
