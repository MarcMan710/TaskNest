// This file contains the TaskController which handles the logic for task-related routes.
const TaskModel = require("../models/taskModel");

const TaskController = {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error); // Pass error to middleware
    }
  },

  async getTaskById(req, res, next) {
    try {
      const task = await TaskModel.getTaskById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async createTask(req, res, next) {
    try {
      const { title, description } = req.body;
      if (!title) return res.status(400).json({ message: "Title is required" });

      const newTask = await TaskModel.createTask(title, description, req.user.id);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const { title, description, status } = req.body;
      const { id } = req.params;
      const updatedTask = await TaskModel.updateTask(id, title, description, status);
      if (!updatedTask) return res.status(404).json({ message: "Task not found" });
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },
  async deleteTask(req, res, next) {
    try {
      await TaskModel.deleteTask(req.params.id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TaskController;
