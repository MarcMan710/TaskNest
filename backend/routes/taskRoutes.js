// This file defines the routes for task-related operations in the application.
const express = require("express");
const TaskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, TaskController.getAllTasks)
  .post(authMiddleware, TaskController.createTask);

router
  .route("/:id")
  .get(authMiddleware, TaskController.getTaskById)
  .put(authMiddleware, TaskController.updateTask)
  .delete(authMiddleware, TaskController.deleteTask);

router.put("/:id/details", authMiddleware, TaskController.updateTaskDetails);

module.exports = router;
