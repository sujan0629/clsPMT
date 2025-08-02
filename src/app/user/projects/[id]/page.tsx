
"use client";

import { notFound, useParams } from 'next/navigation';
import { projects, tasks } from '@/lib/data';
import { ProjectHeader } from '@/components/projects/project-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard } from '@/components/tasks/kanban-board';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const project = projects.find(p => p.id === projectId);
    const projectTasks = tasks.filter(t => t.projectId === projectId);

    if (!project) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-8">
            <ProjectHeader project={project} />
            <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks ({projectTasks.length})</TabsTrigger>
                    <TabsTrigger value="team">Team ({project.members.length})</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Overview</CardTitle>
                            <CardDescription>A high-level view of the project's status and progress.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Project overview content goes here...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tasks">
                     <div className="flex-1 overflow-x-auto">
                        <KanbanBoard tasks={projectTasks} />
                    </div>
                </TabsContent>
                <TabsContent value="team">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>The people collaborating on this project.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {project.members.map(user => (
                                <Card key={user.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.role}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                             <CardDescription>A log of recent changes to the project.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
