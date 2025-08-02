import { tasks } from "@/lib/data";
import { TaskCard } from "./task-card";
import { TaskStatus } from "@/types";

const columns: { title: TaskStatus; tasks: typeof tasks }[] = [
  {
    title: "To Do",
    tasks: tasks.filter((task) => task.status === "To Do"),
  },
  {
    title: "In Progress",
    tasks: tasks.filter((task) => task.status === "In Progress"),
  },
  {
    title: "Done",
    tasks: tasks.filter((task) => task.status === "Done"),
  },
];

export function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((column) => (
        <div key={column.title} className="bg-muted/50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            {column.title}
            <span className="ml-2 text-sm text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              {column.tasks.length}
            </span>
          </h2>
          <div className="space-y-4">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
