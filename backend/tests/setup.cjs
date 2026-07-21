const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

process.env.DB_HOST = "localhost";
process.env.DB_PORT = process.env.POSTGRES_PORT;
process.env.DB_NAME = process.env.POSTGRES_DB;
process.env.DB_USER = process.env.POSTGRES_USER;
process.env.DB_PASSWORD = process.env.POSTGRES_PASSWORD;
