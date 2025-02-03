const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3005,
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3005",
  DB_HOST: process.env.DB_HOST || "db", // Use the service name from docker-compose.yml
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "8445",
  DB_NAME: process.env.DB_NAME || "FAQs_DB_DEV",
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
};
