export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "mint",
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className={`stat-icon ${tone}`}>
          <Icon size={17} />
        </span>
      </div>
      <strong>{value}</strong>
      <div className="stat-sparkline" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="stat-foot">{detail}</div>
    </article>
  );
}
