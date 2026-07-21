function SystemStatus({ health, loading }) {
  if (loading) {
    return (
      <div className="alert alert-secondary">
        Comprobando estado del sistema...
      </div>
    );
  }

  const isHealthy =
    health?.status === "ok" &&
    health?.database === "connected";

  return (
    <div
      className={`alert ${
        isHealthy ? "alert-success" : "alert-danger"
      } d-flex flex-wrap justify-content-between align-items-center`}
    >
      <div>
        <strong>Estado del sistema:</strong>{" "}
        {isHealthy ? "Disponible" : "No disponible"}
      </div>

      <div className="small">
        API: {health?.status === "ok" ? "Activa" : "Sin conexión"} ·
        Base de datos:{" "}
        {health?.database === "connected"
          ? "Conectada"
          : "Desconectada"}{" "}
        · Versión: {health?.version || "No disponible"}
      </div>
    </div>
  );
}

export default SystemStatus;