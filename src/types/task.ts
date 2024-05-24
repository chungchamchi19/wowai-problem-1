export type StatusEnum = "todo" | "pending" | "completed";

export type Task = {
  id: string;
  title: string;
  desc?: string;
  status: StatusEnum,
  dueDate?: string;
}

export type Status = {
  value: StatusEnum;
  label: string;
}

export type FilterStatus = StatusEnum | "all";
