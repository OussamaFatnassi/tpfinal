// Import necessary modules
var express = require("express");
const Sequelize = require("sequelize");

// Initialize express app
var app = express();

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true",
    },
  }
);

// Define the 'Log' model
const Log = sequelize.define("log", {
  message: Sequelize.STRING,
});

// Function to establish database connection and sync models
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Rethrow to handle it in the caller
  }
}

// Function to start the express server
function startServer() {
  app.listen(3005, () => {
    console.log("Server is running on port 3005");
  });
}

// Route to create a log entry and fetch all log entries
app.get("/", async (req, res) => {
  try {
    await Log.create({ message: "Hello World" });
    const logs = await Log.findAll();
    res.json(logs);
  } catch (error) {
    console.error("Failed to handle request:", error);
    res.status(500).send("An error occurred");
  }
});

// Periodically create log entries
setInterval(async () => {
  try {
    await Log.create({ message: new Date().toISOString() });
    console.log("Log entry created successfully.");
  } catch (error) {
    console.error("Failed to create log entry:", error);
  }
}, 10000);

// Initialize and start the application
initializeDatabase()
  .then(startServer)
  .catch((error) => console.error("Failed to start application:", error));
