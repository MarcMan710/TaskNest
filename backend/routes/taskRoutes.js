// This file defines the routes for task-related operations in the application.
const express = require("express");
const TaskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, TaskController.getAllTasks);
router.get("/:id", authMiddleware, TaskController.getTaskById);
router.post("/", authMiddleware, TaskController.createTask);
router.put("/:id", authMiddleware, TaskController.updateTask);
router.delete("/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
