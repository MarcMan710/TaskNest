// This custom hook provides easy access to task-related functions.
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const useTasks = () => {
  return useContext(TaskContext);
};

export default useTasks;
