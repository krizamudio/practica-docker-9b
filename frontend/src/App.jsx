import { useCallback, useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityTable from "./components/ActivityTable";
import SummaryCards from "./components/SummaryCards";
import SystemStatus from "./components/SystemStatus";

import {
  createActivity,
  deleteActivity,
  getActivities,
  getSystemHealth,
  updateActivity,
  updateActivityStatus,
} from "./services/api";

function App() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [health, setHealth] = useState(null);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });

    window.setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const loadActivities = useCallback(async () => {
  try {
    setLoadingActivities(true);

    const response = await getActivities();

    console.log("Respuesta de actividades:", response);

    const activitiesData = Array.isArray(response)
      ? response
      : response.data;

    setActivities(
      Array.isArray(activitiesData) ? activitiesData : []
    );
  } catch (error) {
    console.error("Error cargando actividades:", error);

    showMessage(
      "danger",
      error.response?.data?.message ||
        "No fue posible consultar las actividades."
    );
  } finally {
    setLoadingActivities(false);
  }
}, []);

  const loadHealth = useCallback(async () => {
    try {
      setLoadingHealth(true);

      const response = await getSystemHealth();
      setHealth(response);
    } catch (error) {
      console.error(error);

      setHealth({
        status: "error",
        database: "disconnected",
      });
    } finally {
      setLoadingHealth(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
    loadHealth();
  }, [loadActivities, loadHealth]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (selectedActivity) {
        await updateActivity(selectedActivity.id, formData);
        showMessage(
          "success",
          "Actividad actualizada correctamente."
        );
      } else {
        await createActivity(formData);
        showMessage(
          "success",
          "Actividad registrada correctamente."
        );
      }

      setSelectedActivity(null);
      await loadActivities();
    } catch (error) {
      console.error(error);

      const apiErrors = error.response?.data?.errors;
      const apiMessage = error.response?.data?.message;

      showMessage(
        "danger",
        Array.isArray(apiErrors)
          ? apiErrors.join(" ")
          : apiMessage || "No fue posible guardar la actividad."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateActivityStatus(id, status);

      setActivities((currentActivities) =>
        currentActivities.map((activity) =>
          activity.id === id
            ? { ...activity, status }
            : activity
        )
      );

      showMessage("success", "Estado actualizado.");
    } catch (error) {
      console.error(error);
      showMessage(
        "danger",
        "No fue posible actualizar el estado."
      );

      await loadActivities();
    }
  };

  const handleDelete = async (activity) => {
    const confirmed = window.confirm(
      `¿Deseas eliminar la actividad "${activity.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteActivity(activity.id);

      if (selectedActivity?.id === activity.id) {
        setSelectedActivity(null);
      }

      showMessage(
        "success",
        "Actividad eliminada correctamente."
      );

      await loadActivities();
    } catch (error) {
      console.error(error);
      showMessage(
        "danger",
        "No fue posible eliminar la actividad."
      );
    }
  };

  return (
    <>
      <header className="bg-dark text-white py-4 mb-4">
        <div className="container">
          <h1 className="h3 mb-1">TaskContainer</h1>
          <p className="mb-0 text-white-50">
            Gestor de actividades académicas
          </p>
        </div>
      </header>

      <main className="container pb-5">
        <SystemStatus
          health={health}
          loading={loadingHealth}
        />

        {message && (
          <div
            className={`alert alert-${message.type} alert-dismissible`}
            role="alert"
          >
            {message.text}

            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setMessage(null)}
            />
          </div>
        )}

        <SummaryCards activities={activities} />

        <ActivityForm
          selectedActivity={selectedActivity}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedActivity(null)}
          submitting={submitting}
        />

        <section className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Actividades registradas</strong>

            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={loadActivities}
              disabled={loadingActivities}
            >
              Actualizar
            </button>
          </div>

          <div className="card-body">
            <ActivityTable
              activities={activities}
              loading={loadingActivities}
              onEdit={setSelectedActivity}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;