import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  subject: "",
  dueDate: "",
  priority: "media",
  status: "pendiente",
};

function ActivityForm({
  selectedActivity,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (selectedActivity) {
      setForm({
        title: selectedActivity.title || "",
        subject: selectedActivity.subject || "",
        dueDate: selectedActivity.due_date
          ? selectedActivity.due_date.slice(0, 10)
          : "",
        priority: selectedActivity.priority || "media",
        status: selectedActivity.status || "pendiente",
      });
    } else {
      setForm(initialForm);
    }

    setErrors([]);
  }, [selectedActivity]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors = [];

    if (!form.title.trim()) {
      validationErrors.push("El título es obligatorio.");
    }

    if (!form.subject.trim()) {
      validationErrors.push("La materia es obligatoria.");
    }

    if (!form.dueDate) {
      validationErrors.push("La fecha de entrega es obligatoria.");
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    await onSubmit({
      title: form.title.trim(),
      subject: form.subject.trim(),
      dueDate: form.dueDate,
      priority: form.priority,
      status: form.status,
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <strong>
          {selectedActivity
            ? "Editar actividad"
            : "Registrar actividad"}
        </strong>
      </div>

      <div className="card-body">
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="title">
                Título
              </label>

              <input
                className="form-control"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={150}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="subject">
                Materia
              </label>

              <input
                className="form-control"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                maxLength={100}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="dueDate">
                Fecha de entrega
              </label>

              <input
                type="date"
                className="form-control"
                id="dueDate"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="priority">
                Prioridad
              </label>

              <select
                className="form-select"
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="status">
                Estado
              </label>

              <select
                className="form-select"
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="terminada">Terminada</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Guardando..."
                : selectedActivity
                  ? "Actualizar"
                  : "Registrar"}
            </button>

            {selectedActivity && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;