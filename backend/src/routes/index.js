const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');

const router = express.Router();

// ✅ Authentication Routes
router.use('/auth', authRoutes);

// ✅ Task Management Routes
router.use('/tasks', taskRoutes);

module.exports = router;
