// This file contains the user controller logic for handling user registration and login.
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const UserController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;      
      const requiredFields = ["name", "email", "password"];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
      }

      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = await UserModel.createUser(name, email, password);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findUserByEmail(email);

      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
