
"use client";

import { Activity, BarChart3, HardDrive, LayoutDashboard, Share2 } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { MyTasks } from "@/components/dashboard/my-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tasks, users, projects } from '@/lib/data';

export default function DashboardPage() {
  const currentUser = users[0]; // Assuming current user for demo

  const totalProjects = projects.filter(p => p.members.some(m => m.id === currentUser.id)).length;
  const activeTasks = tasks.filter(t => t.status !== 'Done' && t.assignees.some(a => a.id === currentUser.id)).length;
  const completedTasks = tasks.filter(t => t.status === 'Done' && t.assignees.some(a => a.id === currentUser.id)).length;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="My Projects" 
          value={totalProjects.toString()}
          icon={HardDrive} 
          change=""
        />
        <StatsCard 
          title="My Active Tasks" 
          value={activeTasks.toString()}
          icon={Activity} 
          change=""
        />
        <StatsCard 
          title="My Completed Tasks" 
          value={completedTasks.toString()}
          icon={LayoutDashboard} 
          change="" 
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TasksChart />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <MyTasks />
      </div>
    </div>
  );
}
