import { Task } from "../types/task";

export const createTaskApi = (task: Task) => {
  const listTask = getTasksApi();
  listTask.push(task);
  localStorage.setItem("tasks", JSON.stringify(listTask));
  return listTask;
};

export const updateTaskApi = (task: Task) => {
  const listTask = getTasksApi();
  const newListTask = listTask.map((t) => (t.id === task.id ? task : t));
  localStorage.setItem("tasks", JSON.stringify(newListTask));
  return listTask;
};

export const deleteTaskApi = (id: string) => {
  const listTask = getTasksApi();
  const newListTask = listTask.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(newListTask));
  return listTask;
};

export const getTasksApi = () => {
  const listTaskStr = localStorage.getItem("tasks");
  const listTask: Task[] = listTaskStr ? JSON.parse(listTaskStr) : [];
  return listTask;
};
