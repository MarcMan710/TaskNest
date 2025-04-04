// This file defines the routes for user-related operations in the application.
const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router
  .route("/register")
  .post(UserController.register);
router
  .route("/login")
  .post(UserController.login);

module.exports = router;
