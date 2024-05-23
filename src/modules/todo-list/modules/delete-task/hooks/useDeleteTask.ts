import { toast } from "react-toastify";
import { deleteTaskApi } from "../../../../../api/task";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { Task } from "../../../../../types/task";

export const useDeleteTask = (task: Task) => {
  const { syncTasksWithStorage } = useTaskContext();

  const deleteTask = () => {
    deleteTaskApi(task.id);
    syncTasksWithStorage();
    toast.success("Task deleted successfully!");
  };

  return {
    deleteTask,
  };
};
