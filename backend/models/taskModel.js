// This file defines the TaskModel which interacts with the database to perform CRUD operations on tasks.
const pool = require("../config/db");

const TaskModel = {
  async getAllTasks() {
    const result = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
    return result.rows;
  },

  async getTaskById(taskId) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [taskId]);
    return result.rows[0];
  },

  async createTask(title, description, userId) {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
      [title, description, userId]
    );
    return result.rows[0];
  },

  async updateTask(taskId, title, description, status) {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, description, status, taskId]
    );
    return result.rows[0];
  },

  async deleteTask(taskId) {
    await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
    return { message: "Task deleted successfully" };
  }
};

module.exports = TaskModel;

