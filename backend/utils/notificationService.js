const cron = require("node-cron");
const { Op } = require("sequelize");
const Task = require("../models/taskModel");
const sendEmail = require("./emailService");

const sendTaskNotification = async (task, message) => {
  console.log(message);
  await sendEmail(task.title, message);
};

const checkTaskNotifications = async () => {
  try {
    const now = new Date();
    const tasks = await Task.findAll({
      where: {
        dueDate: { [Op.not]: null },
      },
    });

    for (const task of tasks) {
      const dueDate = new Date(task.dueDate);
      const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

      if (daysLeft === 1) {
        await sendTaskNotification(
          task,
          `Reminder: Your task "${task.title}" is due tomorrow!`
        );
      } else if (daysLeft < 0) {        
        await sendTaskNotification(task, `Your task "${task.title}" is overdue!`);
      }
    }
  } catch (error) {
    console.error("Error checking task notifications:", error);
  }
};

// Run the job every midnight
cron.schedule("0 0 * * *", checkTaskNotifications);
