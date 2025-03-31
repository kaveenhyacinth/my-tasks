export type TaskPriority = 1 | 2 | 3;
export type TaskSortQuery = "priority" | "dueDate";
export type TaskOrderQuery = "asc" | "desc";

export type TaskCreatePayload = {
  name: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
};

export type TaskQuery = {
  sort: TaskSortQuery;
  order: TaskOrderQuery;
};

export type TaskResponse = {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
};
