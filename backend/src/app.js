const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const activitiesRoutes = require("./routes/activities.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "TaskContainer API",
    message: "API funcionando correctamente",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/activities", activitiesRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

module.exports = app;