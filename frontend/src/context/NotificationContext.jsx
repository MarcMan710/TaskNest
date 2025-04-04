import React, { createContext, useState, useEffect } from "react";
import taskApi from "../api/taskApi";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchTasks = async () => {
    try {
      const tasks = await taskApi.getTasks();
      setNotifications(tasks);
    } catch (error) {
      console.error("Error fetching tasks for notifications:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTasks();
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
