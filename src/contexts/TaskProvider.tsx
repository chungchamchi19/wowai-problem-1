import { createContext, useContext, useEffect, useState } from "react";
import { FilterStatus, Task } from "../types/task";
import { getTasksApi } from "../api/task";

type ContextType = {
  tasks: Task[];
  filterStatus: FilterStatus;
  syncTasksWithStorage: () => void;
  setFilterStatus: (value: FilterStatus) => void;
}

const TaskContext = createContext<ContextType>({
  tasks: [],
  syncTasksWithStorage: () => { },
  filterStatus: "all",
  setFilterStatus: () => { }
});

const TaskContextProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const syncTasksWithStorage = () => {
    const tasks = getTasksApi();
    setTasks(tasks);
  };

  useEffect(() => {
    syncTasksWithStorage();
  }, []);

  return <TaskContext.Provider value={{ tasks, filterStatus, syncTasksWithStorage, setFilterStatus }}>
    {props.children}
  </TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskContextProvider");
  }
  return context;
};

export default TaskContextProvider;
