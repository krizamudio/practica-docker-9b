const express = require("express");
const activitiesController = require(
  "../controllers/activities.controller"
);

const router = express.Router();

router.get("/", activitiesController.getAll);
router.get("/:id", activitiesController.getById);
router.post("/", activitiesController.create);
router.put("/:id", activitiesController.update);
router.patch("/:id/status", activitiesController.updateStatus);
router.delete("/:id", activitiesController.remove);

module.exports = router;