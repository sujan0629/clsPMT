
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users, projects } from "@/lib/data";
import { BarChart, ChevronRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';


export default function HomePage() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDate(new Date());
    }, []);

    const currentUser = users[0];
    const recentProjects = projects.slice(0, 4);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Home</h1>
                    <p className="text-muted-foreground mt-1">{format(date, "EEEE, MMMM d")}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold tracking-tight mb-4">Good afternoon, {currentUser.name.split(' ')[0]}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">My Week</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-around">
                        <div className="text-center">
                            <p className="text-3xl font-bold">5</p>
                            <p className="text-sm text-muted-foreground">Tasks Completed</p>
                        </div>
                         <div className="text-center">
                            <p className="text-3xl font-bold">3</p>
                            <p className="text-sm text-muted-foreground">Collaborators</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>My Tasks</CardTitle>
                            <CardDescription>Upcoming, overdue and completed tasks.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">Customize</Button>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="upcoming" className="w-full">
                            <TabsList>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upcoming" className="pt-4">
                                <p className="text-sm text-muted-foreground">You have 3 tasks upcoming.</p>
                            </TabsContent>
                            <TabsContent value="overdue" className="pt-4">
                                <p className="text-sm text-muted-foreground">You don't have any overdue tasks. Nice!</p>
                            </TabsContent>
                            <TabsContent value="completed" className="pt-4">
                                <p className="text-sm text-muted-foreground">You have completed 5 tasks this week.</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Projects</CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/user/projects">
                                    View All <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {recentProjects.map(project => (
                               <div key={project.id} className="flex items-center justify-between">
                                   <div className="flex items-center gap-4">
                                       <div className="p-3 bg-muted rounded-lg">
                                           <BarChart className="h-5 w-5 text-muted-foreground" />
                                       </div>
                                       <div>
                                           <p className="font-semibold">{project.name}</p>
                                           <p className="text-sm text-muted-foreground">Codelits Studio Pvt. Ltd.</p>
                                       </div>
                                   </div>
                                   <p className="text-sm text-muted-foreground">{project.progress}%</p>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>People</CardTitle>
                            <CardDescription>Frequent collaborators.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {users.slice(1).map(user => (
                                <div key={user.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.name.toLowerCase().replace(' ', '')}@codelitsstudio.com</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="sm">Invite</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
