
"use client";

import { notFound, useParams } from 'next/navigation';
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { tasks, users } from "@/lib/data";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function UserTasksPage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const user = users.find(u => u.id === userId);
  const userTasks = tasks.filter(task => task.assignees.some(a => a.id === userId));

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/admin/tasks">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Tasks</span>
                </Link>
            </Button>
            <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                 <h1 className="text-2xl font-bold tracking-tight">{user.name}'s Tasks</h1>
                 <p className="text-sm text-muted-foreground">{userTasks.length} task(s) assigned</p>
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto">
        <KanbanBoard tasks={userTasks} />
      </div>
    </div>
  );
}

