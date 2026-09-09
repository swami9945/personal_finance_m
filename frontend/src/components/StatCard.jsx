function StatCard({ title, value, icon, description }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <div className="stat-icon">{icon}</div>
      </div>

      <h2>{value}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

export default StatCard;