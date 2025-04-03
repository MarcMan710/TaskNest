// This is the main entry point for the TaskNest API server.
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const loadEnv = require("./config/dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");

// Load environment variables
loadEnv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("TaskNest API is running...");
});

// Error Handling Middleware (must be at the end)
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
