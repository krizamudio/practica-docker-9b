const activitiesService = require("../services/activities.service");

const {
  validateActivity,
  isValidStatus,
  VALID_STATUSES,
} = require("../validators/activity.validator");

const handleError = (res, error) => {
  console.error("Error al procesar la actividad:", error);
  return res.status(500).json({
    status: "error",
    message: "No fue posible procesar la solicitud",
  });
};

const sendValidationError = (res, errors) =>
  res.status(400).json({
    status: "error",
    message: "Los datos de la actividad son inválidos",
    errors,
  });

const getAll = async (req, res) => {
  try {
    const activities = await activitiesService.getAllActivities();
    return res.json({ status: "ok", data: activities });
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

    return res.json({ status: "ok", data: activity });
  } catch (error) {
    return handleError(res, error);
  }
};

const create = async (req, res) => {
  try {
    const errors = validateActivity(req.body);

    if (errors.length > 0) {
      return sendValidationError(res, errors);
    }

    const activity = await activitiesService.createActivity({
      ...req.body,
      title: req.body.title.trim(),
      subject: req.body.subject.trim(),
    });
    return res.status(201).json({ status: "ok", data: activity });
  } catch (error) {
    return handleError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const errors = validateActivity(req.body);

    if (errors.length > 0) {
      return sendValidationError(res, errors);
    }

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

    return res.json({ status: "ok", data: activity });
  } catch (error) {
    return handleError(res, error);
  }
};

const updateStatus = async (req, res) => {
  try {
    if (!isValidStatus(req.body.status)) {
      return res.status(400).json({
        status: "error",
         message: `El estado debe ser: ${VALID_STATUSES.join(", ")}`,
     });
    }

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

    return res.json({ status: "ok", data: activity });
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

    return res.json({ status: "ok", data: activity });
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
