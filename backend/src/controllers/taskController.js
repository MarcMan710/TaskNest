const pool = require('../config/db');

// ✅ Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const userId = req.user.id; // Extracted from JWT in authMiddleware

    const newTask = await pool.query(
      "INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, title, description, status || 'todo', priority || 'medium', due_date]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get All Tasks for User
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC", [userId]);

    res.json(tasks.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;
    const userId = req.user.id;

    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5 WHERE id = $6 AND user_id = $7 RETURNING *",
      [title, description, status, priority, due_date, id, userId]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTask = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
