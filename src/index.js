const express = require("express");
const { Sequelize } = require("sequelize");
const {
  PORT,
  API_BASE_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = require("./config/serverConfig");
const faqRoutes = require("./routers/faqRouter");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files (make sure 'frontend' folder is in the correct location)
app.use("/faqs", express.static("frontend"));

// Routes
app.use("/api/v1/faqs", faqRoutes);

app.use("/", (req, res) => {
  res.send("everything is ok");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Optional: Sequelize database connection (if you're using Sequelize)
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "postgres", // or 'postgres', 'sqlite', 'mssql' depending on your DB
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
