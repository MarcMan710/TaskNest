// This file defines the UserModel which interacts with the database to perform CRUD operations on users.
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const UserModel = {
  async findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return result.rows[0];
  },
};

module.exports = UserModel;
