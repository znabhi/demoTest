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

// Serve frontend files
app.use(express.static("frontend"));

console.log("DB_USER:", DB_USER);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_HOST:", DB_HOST);
console.log("DB_NAME:", DB_NAME);

// Database Connection
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "postgres",
// });
// console.log(sequelize);

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synchronized.");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

// Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// Routes
app.use("/api/v1/faqs", faqRoutes);

app.get("/config", (req, res) => {
  res.json({ API_BASE_URL });
});

// Export the app for testing
module.exports = app;

// Start server only if NOT in test mode
if (process.env.NODE_ENV !== "test") {
  app.use("/admin", (req, res) => {
    res.send("hellow");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
