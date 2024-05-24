import { useEffect, useState } from "react";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { updateTaskApi } from "../../../../../api/task";
import { toast } from "react-toastify";
import { StatusEnum, Task } from "../../../../../types/task";
import { useValidateTask } from "../../../../../hooks/useValidateTask";
import { listStatus } from "../../../../../configs/status";

export const useEditTask = (task: Task, options: { isEditing: boolean }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string | undefined>("");
  const [status, setStatus] = useState<StatusEnum>(listStatus[0]?.value ?? "todo");
  const [dueDate, setDueDate] = useState<string>("");
  const { syncTasksWithStorage } = useTaskContext();
  const { isInvalidTitle } = useValidateTask({ title });

  const handleChangeDesc = (value: string) => {
    setDesc(value);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const updateTask = () => {
    if (isInvalidTitle) {
      toast.error("Title is required!");
      return;
    }
    const task = getTask();
    updateTaskApi(task);
    syncTasksWithStorage();
    toast.success("Task updated successfully!");
  };

  const getTask = () => {
    const newTask: Task = {
      id: task.id,
      title,
      desc,
      status,
      dueDate
    };
    return newTask;
  };

  useEffect(() => {
    setTitle(task.title);
    setDesc(task.desc);
    setStatus(task.status);
    setDueDate(task.dueDate || "");
  }, [task, options.isEditing]);

  return {
    title,
    desc,
    status,
    dueDate,
    isInvalidTitle,
    handleChangeDesc,
    handleChangeTitle,
    setStatus,
    setDueDate,
    updateTask,
  };
};
