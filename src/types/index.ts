export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  role: "Admin" | "Manager" | "Member";
};

export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export type Comment = {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: User[];
  dueDate: Date;
  startDate?: Date;
  subtasks: Subtask[];
  comments: Comment[];
  attachments: Attachment[];
  projectId: string;
  projectName: string;
};

export type ProjectStatus = "Active" | "On Hold" | "Completed";

export type Project = {
  id: string;
  name: string;
  description?: string;
  members: User[];
  status: ProjectStatus;
  deadline: Date;
  progress: number;
};

export type Activity = {
    id: string;
    user: User;
    action: string;
    target: string;
    timestamp: Date;
};
