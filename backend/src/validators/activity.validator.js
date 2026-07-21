const VALID_PRIORITIES = ["baja", "media", "alta"];
const VALID_STATUSES = ["pendiente", "en_proceso", "terminada"];

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const isValidStatus = (status) => VALID_STATUSES.includes(status);

const validateActivity = (body) => {
  const errors = [];

  if (typeof body.title !== "string" || !body.title.trim()) {
    errors.push("El título es obligatorio");
  } else if (body.title.trim().length > 150) {
    errors.push("El título no puede superar 150 caracteres");
  }

  if (typeof body.subject !== "string" || !body.subject.trim()) {
    errors.push("La materia es obligatoria");
  } else if (body.subject.trim().length > 100) {
    errors.push("La materia no puede superar 100 caracteres");
  }

  if (typeof body.dueDate !== "string" || !body.dueDate.trim()) {
    errors.push("La fecha de entrega es obligatoria");
  } else if (!isValidDate(body.dueDate)) {
    errors.push("La fecha de entrega debe tener formato YYYY-MM-DD");
  }

  if (
    body.priority !== undefined &&
    !VALID_PRIORITIES.includes(body.priority)
  ) {
    errors.push("La prioridad debe ser baja, media o alta");
  }

  if (body.status !== undefined && !isValidStatus(body.status)) {
    errors.push("El estado debe ser pendiente, en_proceso o terminada");
  }

  return errors;
};

module.exports = {
  validateActivity,
  isValidStatus,
  VALID_STATUSES,
};
