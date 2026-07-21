const activitiesService = require("../servicies/activities.service");

const validPriorities = ["baja", "media", "alta"];
const validStatuses = ["pendiente", "en_proceso", "terminada"];

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const validateNewActivity = (body) => {
  const errors = [];

  if (typeof body.title !== "string" || !body.title.trim()) {
    errors.push("title es obligatorio");
  } else if (body.title.trim().length > 150) {
    errors.push("title no puede superar 150 caracteres");
  }

  if (typeof body.subject !== "string" || !body.subject.trim()) {
    errors.push("subject es obligatorio");
  } else if (body.subject.trim().length > 100) {
    errors.push("subject no puede superar 100 caracteres");
  }

  if (typeof body.dueDate !== "string" || !isValidDate(body.dueDate)) {
    errors.push("dueDate debe ser una fecha válida con formato YYYY-MM-DD");
  }

  if (
    body.priority !== undefined &&
    !validPriorities.includes(body.priority)
  ) {
    errors.push("priority debe ser baja, media o alta");
  }

  if (body.status !== undefined && !validStatuses.includes(body.status)) {
    errors.push("status debe ser pendiente, en_proceso o terminada");
  }

  return errors;
};

const handleError = (res, error) => {
  console.error("Error al procesar la actividad:", error);
  return res.status(500).json({
    status: "error",
    message: "No fue posible procesar la solicitud",
  });
};

const getAll = async (req, res) => {
  try {
    const activities = await activitiesService.getAllActivities();
    return res.json(activities);
  } catch (error) {
    return handleError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        status: "error",
        message: "Actividad no encontrada",
      });
    }

    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
};

const create = async (req, res) => {
  try {
    const errors = validateNewActivity(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Los datos de la actividad son inválidos",
        errors,
      });
    }

    const activity = await activitiesService.createActivity({
      ...req.body,
      title: req.body.title.trim(),
      subject: req.body.subject.trim(),
    });
    return res.status(201).json(activity);
  } catch (error) {
    return handleError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const activity = await activitiesService.updateActivity(
      req.params.id,
      req.body
    );

    if (!activity) {
      return res.status(404).json({
        status: "error",
        message: "Actividad no encontrada",
      });
    }

    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const activity = await activitiesService.updateActivityStatus(
      req.params.id,
      req.body.status
    );

    if (!activity) {
      return res.status(404).json({
        status: "error",
        message: "Actividad no encontrada",
      });
    }

    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const activity = await activitiesService.deleteActivity(req.params.id);

    if (!activity) {
      return res.status(404).json({
        status: "error",
        message: "Actividad no encontrada",
      });
    }

    return res.json(activity);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
