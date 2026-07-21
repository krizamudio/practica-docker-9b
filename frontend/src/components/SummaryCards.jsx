function SummaryCards({ activities }) {
  const statistics = {
    total: activities.length,
    pending: activities.filter(
      (activity) => activity.status === "pendiente"
    ).length,
    inProgress: activities.filter(
      (activity) => activity.status === "en_proceso"
    ).length,
    completed: activities.filter(
      (activity) => activity.status === "terminada"
    ).length,
  };

  const cards = [
    {
      title: "Total",
      value: statistics.total,
      className: "border-primary",
    },
    {
      title: "Pendientes",
      value: statistics.pending,
      className: "border-warning",
    },
    {
      title: "En proceso",
      value: statistics.inProgress,
      className: "border-info",
    },
    {
      title: "Terminadas",
      value: statistics.completed,
      className: "border-success",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-6 col-lg-3" key={card.title}>
          <div className={`card shadow-sm h-100 ${card.className}`}>
            <div className="card-body">
              <p className="text-secondary mb-1">{card.title}</p>
              <h2 className="mb-0">{card.value}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;