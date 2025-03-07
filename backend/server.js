const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes/index');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const pool = require('./src/config/db'); // Import database connection

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api', routes); // All API endpoints will start with /api

// ✅ Error Handling
app.use(errorMiddleware);

// ✅ Database Connection Check
pool.connect()
  .then(() => console.log('✅ PostgreSQL Connected'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;