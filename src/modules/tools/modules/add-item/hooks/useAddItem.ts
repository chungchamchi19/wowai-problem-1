import { useState } from "react";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { createTaskApi } from "../../../../../api/task";
import { toast } from "react-toastify";
import { randomId } from "../../../../../utils/id";
import { StatusEnum, Task } from "../../../../../types/task";
import { useValidateTask } from "../../../../../hooks/useValidateTask";
import { listStatus } from "../../../../../configs/status";

export const useAddItem = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<StatusEnum>(listStatus[0]?.value ?? "todo");
  const { syncTasksWithStorage } = useTaskContext();
  const { isInvalidTitle } = useValidateTask({ title });

  const handleChangeDesc = (value: string) => {
    setDesc(value);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const addTask = () => {
    if (isInvalidTitle) {
      toast.error("Title is required");
      return;
    }
    const task = getTask();
    createTaskApi(task);
    syncTasksWithStorage();
    toast.success("Task added successfully!");
    resetDefault();
  };

  const getTask = () => {
    const newTask: Task = {
      id: randomId(),
      title,
      desc,
      status,
    };
    return newTask;
  };

  const resetDefault = () => {
    setTitle("");
    setDesc("");
    setStatus(listStatus[0]?.value ?? "todo");
  };

  return {
    title,
    status,
    desc,
    setStatus,
    isInvalidTitle,
    handleChangeDesc,
    handleChangeTitle,
    getTask,
    addTask,
  };
};
