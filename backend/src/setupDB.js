const { createUserTable } = require('./models/User');
const { createTaskTable } = require('./models/Task');

const setupDatabase = async () => {
  try {
    await createUserTable();
    await createTaskTable();
    console.log("✅ Database tables created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error setting up database:", err);
    process.exit(1);
  }
};

setupDatabase();
