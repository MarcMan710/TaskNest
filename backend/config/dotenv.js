// Description: This file loads environment variables from a .env file into process.env.
const dotenv = require("dotenv");

const loadEnv = () => {  
  const result = dotenv.config();

  if (result.error) {
    console.error("❌ Error loading environment variables:", result.error);
    process.exit(1); 
  }

  if (!process.env.DB_USER || !process.env.JWT_SECRET || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing required environment variables!");
      process.exit(1);
    }
};

module.exports = loadEnv;
