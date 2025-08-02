import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tasks, users } from "@/lib/data";
import { format } from "date-fns";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

export function MyTasks() {
  const myTasks = tasks.filter(task => task.assignees.some(a => a.id === users[0].id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>A list of tasks assigned to you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="hidden sm:table-cell">Project</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Priority</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{task.projectName}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{task.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                </TableCell>
                <TableCell className="text-right">{format(task.dueDate, "MMM d, yyyy")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
