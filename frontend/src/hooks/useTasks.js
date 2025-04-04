// This custom hook provides easy access to task-related state and functions.
import { useContext, useMemo } from "react";
import TaskContext from "../context/TaskContext";

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return useMemo(() => context, [context]);
};

export default useTasks;
