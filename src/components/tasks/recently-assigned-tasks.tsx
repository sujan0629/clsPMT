
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tasks } from "@/lib/data";
import { format, isThisWeek } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export function RecentlyAssignedTasks() {
  const recentTasks = tasks.filter(task => isThisWeek(task.createdAt, { weekStartsOn: 1 }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Assigned</CardTitle>
        <CardDescription>Tasks that have been assigned this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="hidden sm:table-cell">Project</TableHead>
              <TableHead className="hidden sm:table-cell">Assigned To</TableHead>
              <TableHead className="text-right">Date Assigned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTasks.length > 0 ? recentTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{task.projectName}</TableCell>
                <TableCell className="hidden sm:table-cell">
                   <div className="flex items-center gap-2">
                     {task.assignees.map(user => (
                        <Avatar key={user.id} className="h-7 w-7 border-2 border-card">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                     ))}
                   </div>
                </TableCell>
                <TableCell className="text-right">{format(task.createdAt, "MMM d, yyyy")}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No new tasks assigned this week.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
