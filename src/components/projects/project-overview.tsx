
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentActivity } from "../dashboard/recent-activity";
import type { Task } from "@/types";
import { TrendingUp, PieChart, BarChart2, Users, GanttChartSquare } from "lucide-react";

interface ProjectOverviewProps {
    tasks: Task[];
}

const StatCard = ({ title, value, change, icon: Icon }: { title: string; value: string; change: string; icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{change}</p>
        </CardContent>
    </Card>
);

export function ProjectOverview({ tasks }: ProjectOverviewProps) {

    const completedLastWeek = tasks.filter(t => t.status === 'Done' && new Date(t.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const createdLastWeek = tasks.filter(t => new Date(t.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const dueSoon = tasks.filter(t => t.status !== 'Done' && new Date(t.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && new Date(t.dueDate) > new Date()).length;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-12 grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard title="Completed" value={completedLastWeek.toString()} change="in the last 7 days" icon={TrendingUp} />
                <StatCard title="Created" value={createdLastWeek.toString()} change="in the last 7 days" icon={TrendingUp}/>
                <StatCard title="Due Soon" value={dueSoon.toString()} change="in the next 7 days" icon={TrendingUp}/>
                <StatCard title="Total Work Items" value={tasks.length.toString()} change="" icon={GanttChartSquare}/>
            </div>
            
             <div className="lg:col-span-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A feed of recent project activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentActivity />
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PieChart className="h-5 w-5"/> Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-48">
                        <p>Status chart placeholder</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5"/>Priority Breakdown</CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center justify-center text-muted-foreground h-48">
                        <p>Priority chart placeholder</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GanttChartSquare className="h-5 w-5"/>Types of Work</CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center justify-center text-muted-foreground h-48">
                        <p>Work types chart placeholder</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/>Team Workload</CardTitle>
                    </CardHeader>
                     <CardContent className="flex items-center justify-center text-muted-foreground h-48">
                        <p>Workload chart placeholder</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
