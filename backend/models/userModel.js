// backend/models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

class UserModel {
  static async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(`Error getting all users: ${error.message}`);
    }
  }

  static async getUserById(userId) {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error(`Error getting user by ID: ${error.message}`);
    }
  }

  static async createUser(username, email, password) {
    try {
      return await User.create({ username, email, password });
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async updateUser(userId, username, email, password) {
    const user = await User.findByPk(userId);
    if (!user) return null;
    await user.update({ username, email, password });
    return user;
  }

  static async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) return null;
    await user.destroy();
    return { message: "User deleted successfully" };
  }
}

module.exports = { User, UserModel };
