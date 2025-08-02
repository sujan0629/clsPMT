
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { tasks } from "@/lib/data";

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Tasks Board</h1>
      </div>
      <div className="flex-1 overflow-x-auto">
        <KanbanBoard tasks={tasks} />
      </div>
    </div>
  );
}
