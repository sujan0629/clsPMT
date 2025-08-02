
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { tasks } from "@/lib/data";

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tasks Board</h1>
        <AddTaskDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </AddTaskDialog>
      </div>
      <div className="flex-1 overflow-x-auto">
        <KanbanBoard tasks={tasks} />
      </div>
    </div>
  );
}
