import { Task } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CalendarIcon, MessageSquare, Paperclip } from "lucide-react";
import { TaskDetailsDialog } from "./task-details-dialog";

interface TaskCardProps {
  task: Task;
}

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <TaskDetailsDialog task={task}>
      <Card className="hover:bg-accent/50 cursor-pointer transition-colors duration-200">
        <CardHeader className="p-4">
          <Badge variant={priorityVariant[task.priority]} className="w-fit mb-2">{task.priority}</Badge>
          <CardTitle className="text-base">{task.title}</CardTitle>
          <p className="text-xs text-muted-foreground">{task.projectName}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1.5 h-4 w-4" />
            <span>Due {format(task.dueDate, "MMM d")}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex -space-x-2">
            {task.assignees.map((assignee) => (
              <Avatar key={assignee.id} className="h-7 w-7 border-2 border-card">
                <AvatarImage src={assignee.avatarUrl} alt={assignee.name} data-ai-hint="person portrait" />
                <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.comments.length > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {task.comments.length}
              </span>
            )}
            {task.attachments.length > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="h-4 w-4" /> {task.attachments.length}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </TaskDetailsDialog>
  );
}
