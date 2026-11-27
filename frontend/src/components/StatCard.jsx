
function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="stat-card">

      <div className="stat-info">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{description}</span>
      </div>

      <div className="stat-icon">
        <Icon size={24} />
      </div>

    </div>
  );
}

export default StatCard;
