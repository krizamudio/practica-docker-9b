const statusLabels = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  terminada: "Terminada",
};

const statusClasses = {
  pendiente: "text-bg-warning",
  en_proceso: "text-bg-info",
  terminada: "text-bg-success",
};

const priorityClasses = {
  baja: "text-bg-secondary",
  media: "text-bg-primary",
  alta: "text-bg-danger",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sin fecha";
  }

  const date = new Date(`${dateValue.slice(0, 10)}T00:00:00`);

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function ActivityTable({
  activities,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" />
        <p className="mt-2">Consultando actividades...</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="alert alert-info">
        Todavía no existen actividades registradas.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th>Materia</th>
            <th>Entrega</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.title}</td>
              <td>{activity.subject}</td>
              <td>{formatDate(activity.due_date)}</td>

              <td>
                <span
                  className={`badge ${
                    priorityClasses[activity.priority]
                  }`}
                >
                  {activity.priority}
                </span>
              </td>

              <td>
                <select
                  className={`form-select form-select-sm ${
                    statusClasses[activity.status]
                  }`}
                  value={activity.status}
                  onChange={(event) =>
                    onStatusChange(
                      activity.id,
                      event.target.value
                    )
                  }
                  aria-label={`Estado de ${activity.title}`}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="terminada">Terminada</option>
                </select>
              </td>

              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => onEdit(activity)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => onDelete(activity)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityTable;