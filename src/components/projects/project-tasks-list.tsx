
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

interface ProjectTasksListProps {
    tasks: Task[];
}

export function ProjectTasksList({ tasks }: ProjectTasksListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
                <TableCell><Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {task.assignees.map(user => (
                       <Avatar key={user.id} className="h-7 w-7 border-2 border-card">
                           <AvatarImage src={user.avatarUrl} alt={user.name} />
                           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                    ))}
                    <span className="text-sm">{task.assignees.map(u => u.name).join(', ')}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{format(task.dueDate, "MMM d, yyyy")}</TableCell>
              </TableRow>
            ))}
             {tasks.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No tasks have been created for this project yet.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
