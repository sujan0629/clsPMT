
"use client";

import { useState } from 'react';
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { tasks, users, projects } from "@/lib/data";
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FolderKanban } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TasksPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // For demo purposes, we'll assume the logged-in user is the first user.
    const currentUser = users[0]; 
    const userProjects = projects.filter(p => p.members.some(m => m.id === currentUser.id));
    const projectTasks = selectedProject 
        ? tasks.filter(task => task.projectId === selectedProject.id && task.assignees.some(a => a.id === currentUser.id))
        : [];

    if (selectedProject) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setSelectedProject(null)}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to projects</span>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{selectedProject.name} Tasks</h1>
                            <p className="text-muted-foreground mt-1">Your tasks for this project.</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto">
                    <KanbanBoard tasks={projectTasks} />
                </div>
            </div>
        );
    }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Select a Project</h1>
         <p className="text-muted-foreground mt-1">Choose a project to view its tasks.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProjects.map(project => (
            <Card key={project.id} className="hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => setSelectedProject(project)}>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                            <FolderKanban className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">{tasks.filter(t => t.projectId === project.id && t.assignees.some(a => a.id === currentUser.id)).length} task(s) assigned to you.</p>
                </CardContent>
            </Card>
        ))}
        {userProjects.length === 0 && (
             <p className="text-muted-foreground col-span-full text-center py-10">You have not been assigned to any projects yet.</p>
        )}
      </div>
    </div>
  );
}
