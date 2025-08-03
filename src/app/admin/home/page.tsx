
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users, projects, tasks } from "@/lib/data";
import { UserCheck } from "lucide-react";
import { format, isThisWeek } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function AdminHomePage() {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 60000);
        setDate(new Date());
        return () => clearInterval(timer);
    }, []);

    const tasksCompletedThisWeek = tasks.filter(t => t.status === 'Done' && isThisWeek(t.dueDate, { weekStartsOn: 1 })).length;
    const activeProjects = projects.filter(p => p.status === 'Active').length;

    const userActivity = users.map(user => {
        const completedTasks = tasks.filter(t => 
            t.assignees.some(a => a.id === user.id) && 
            t.status === 'Done' && 
            isThisWeek(t.dueDate, { weekStartsOn: 1 })
        ).length;
        return { ...user, completedTasks };
    }).sort((a, b) => b.completedTasks - a.completedTasks);

    const mostActiveUser = userActivity[0] || users[0];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Home</h1>
                    {date && <p className="text-muted-foreground mt-1">{format(date, "EEEE, MMMM d")}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Overview This Week</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-around">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{tasksCompletedThisWeek}</p>
                            <p className="text-sm text-muted-foreground">Tasks Completed</p>
                        </div>
                         <div className="text-center">
                            <p className="text-3xl font-bold">{activeProjects}</p>
                            <p className="text-sm text-muted-foreground">Active Projects</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                           <UserCheck className="h-5 w-5 text-primary" /> Most Active Member
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={mostActiveUser.avatarUrl} alt={mostActiveUser.name} />
                            <AvatarFallback>{mostActiveUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{mostActiveUser.name}</p>
                            <p className="text-sm text-muted-foreground">{mostActiveUser.completedTasks} tasks completed</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Project Progress</CardTitle>
                        <CardDescription>A summary of all project statuses.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {projects.map(project => (
                             <div key={project.id}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">{project.name}</p>
                                    <p className="text-sm text-muted-foreground">{project.progress}%</p>
                                </div>
                                <Progress value={project.progress} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Productivity</CardTitle>
                             <CardDescription>Tasks completed by each team member this week.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {userActivity.map(user => (
                               <div key={user.id} className="flex items-center justify-between">
                                   <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                       <div>
                                           <p className="font-semibold text-sm">{user.name}</p>
                                           <p className="text-xs text-muted-foreground">{user.role}</p>
                                       </div>
                                   </div>
                                   <p className="text-sm font-semibold">{user.completedTasks} task(s)</p>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity Log</CardTitle>
                            <CardDescription>A feed of recent actions across all projects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
