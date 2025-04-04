// server.js - Main entry point for the TaskNest API server.
const express = require("express");
const cors = require("cors");
const loadEnv = require("./config/dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables from .env file
loadEnv();

// Initialize Express app
const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define API routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Define root route
app.get("/", (req, res) => {
  res.send("TaskNest API is running...");
});

// Error handling middleware (must be defined last)
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
