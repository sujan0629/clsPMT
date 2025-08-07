
"use client";

import { useState } from "react";
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
import type { Task, TaskStatus } from "@/types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

const statusOptions: TaskStatus[] = ["To Do", "In Progress", "On Hold", "Done"];


interface ProjectTasksListProps {
    tasks: Task[];
    isAdmin: boolean;
}

export function ProjectTasksList({ tasks, isAdmin }: ProjectTasksListProps) {
  const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(
    tasks.reduce((acc, task) => ({ ...acc, [task.id]: task.status }), {})
  );

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTaskStatuses(prev => ({ ...prev, [taskId]: newStatus }));
    // Here you would typically also make an API call to update the backend
  };

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
              <TableHead>Due Date</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                    <Select value={taskStatuses[task.id]} onValueChange={(value) => handleStatusChange(task.id, value as TaskStatus)}>
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="Set status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
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
                <TableCell>{format(task.dueDate, "MMM d, yyyy")}</TableCell>
                {isAdmin && (
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Manage Task</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                )}
              </TableRow>
            ))}
             {tasks.length === 0 && (
                <TableRow>
                    <TableCell colSpan={isAdmin ? 6 : 5} className="h-24 text-center">
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
