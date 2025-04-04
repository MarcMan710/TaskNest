const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { Op } = require('sequelize');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("To-Do", "In Progress", "Done"),
    defaultValue: "To-Do",
  },
  priority: {
    type: DataTypes.ENUM("Low", "Medium", "High"),
    defaultValue: "Medium",
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true,
});

const TaskModel = {
  async getAllTasks() {
    return await Task.findAll({
      order: [['createdAt', 'DESC']],
    });
  },

  async getTaskById(taskId) {
    return await Task.findByPk(taskId);
  },

  async createTask(title, description, userId, dueDate, priority) {
    return await Task.create({ title, description, userId, dueDate, priority });
  },

  async updateTask(taskId, title, completed, status) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({ title, completed, status });
      return await Task.findByPk(taskId);
    }
    return null;
  },

  async updateTaskDetails(taskId, title, completed, status, dueDate, priority) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({ title, completed, status, dueDate, priority });
      return await Task.findByPk(taskId);
    }
    return null;
  },

  async deleteTask(taskId) {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.destroy();
      return { message: 'Task deleted successfully' };
    }
    return null;
  },
  async getTasksByDueDate(date) {
    return await Task.findAll({ where: { dueDate: { [Op.lte]: date } } });
  },
};

module.exports = { Task, TaskModel };
