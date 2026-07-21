const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "TaskContainer API",
    message: "API funcionando correctamente",
  });
});

module.exports = app;