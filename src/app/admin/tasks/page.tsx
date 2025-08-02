
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Eye, FolderKanban } from "lucide-react";
import { tasks, users, projects } from "@/lib/data";
import { format } from "date-fns";
import type { Task } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "To Do": "secondary",
  "In Progress": "default",
  "Done": "outline",
};

const UserTaskRow = ({ task }: { task: Task }) => (
  <TableRow>
    <TableCell className="font-medium">{task.title}</TableCell>
    <TableCell className="hidden sm:table-cell">
      <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell text-right">{format(task.dueDate, "MMM d, yyyy")}</TableCell>
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
          <DropdownMenuItem>Publish</DropdownMenuItem>
           <DropdownMenuItem>Make Draft</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);


export default function TasksPage() {
  const router = useRouter();

  const projectsWithTasks = projects.map(project => {
    const membersWithTasks = project.members
        .map(member => {
            const memberTasks = tasks.filter(task => 
                task.projectId === project.id && task.assignees.some(a => a.id === member.id)
            );
            return {
                ...member,
                tasks: memberTasks,
            };
        })
        .filter(member => member.tasks.length > 0);

    return {
        ...project,
        members: membersWithTasks,
    };
  }).filter(project => project.members.length > 0);


  const handleViewUserTasks = (event: React.MouseEvent, userId: string) => {
    event.stopPropagation();
    router.push(`/admin/tasks/${userId}`);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks Management</h1>
            <p className="text-muted-foreground mt-1">Oversee and manage all tasks across your projects.</p>
        </div>
        <Button asChild>
            <Link href="/admin/tasks/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
            </Link>
        </Button>
      </div>
      
      <div className="rounded-lg border">
        <Accordion type="multiple" className="w-full">
            {projectsWithTasks.map(project => (
                <AccordionItem value={`project-${project.id}`} key={project.id}>
                    <AccordionTrigger className="px-4 hover:no-underline bg-muted/30">
                       <div className="flex items-center gap-3">
                           <FolderKanban className="h-5 w-5 text-primary" />
                           <div className="text-left">
                               <p className="font-semibold text-base">{project.name}</p>
                               <p className="text-xs text-muted-foreground">{project.members.length} member(s) with tasks</p>
                           </div>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                        <Accordion type="multiple" className="w-full">
                             {project.members.map(user => (
                                <AccordionItem value={`user-${user.id}`} key={user.id}>
                                    <AccordionTrigger className="px-4 hover:no-underline">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-left">
                                                    <p className="font-semibold text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.tasks.length} task(s) in this project</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={(e) => handleViewUserTasks(e, user.id)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Board
                                            </Button>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Task</TableHead>
                                                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                                                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                                                    <TableHead className="hidden md:table-cell text-right">Due Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {user.tasks.map(task => <UserTaskRow key={task.id} task={task} />)}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
