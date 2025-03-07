const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Create Task (Protected)
router.post('/tasks', authMiddleware, createTask);

// ✅ Get All Tasks (Protected)
router.get('/tasks', authMiddleware, getTasks);

// ✅ Update Task (Protected)
router.put('/tasks/:id', authMiddleware, updateTask);

// ✅ Delete Task (Protected)
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
