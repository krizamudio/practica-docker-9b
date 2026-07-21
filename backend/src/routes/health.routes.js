const express = require("express");
const pool = require("../config/database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.status(200).json({
      status: "ok",
      application: "TaskContainer API",
      database: "connected",
      databaseTime: result.rows[0].current_time,
      version: process.env.APP_VERSION || "1.0.0",
    });
  } catch (error) {
    console.error("Error al comprobar la base de datos:", error);

    res.status(503).json({
      status: "error",
      application: "TaskContainer API",
      database: "disconnected",
      message: "No fue posible conectar con PostgreSQL",
    });
  }
});

module.exports = router;