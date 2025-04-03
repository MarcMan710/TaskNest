// Description: This file loads environment variables from a .env file into process.env.
const dotenv = require("dotenv");

const loadEnv = () => {
  dotenv.config();
  if (!process.env.DB_USER || !process.env.JWT_SECRET) {
    console.error("❌ Missing environment variables!");
    process.exit(1);
  }
};

module.exports = loadEnv;
