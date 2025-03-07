const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/tasknest",
});

pool.connect()
  .then(() => console.log("📦 Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error", err));

module.exports = pool;
