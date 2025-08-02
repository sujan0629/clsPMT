
"use client";

import { useState, useEffect } from 'react';
import { Activity, BarChart3, HardDrive, LayoutDashboard, Share2 } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { MyTasks } from "@/components/dashboard/my-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tasks, users, projects } from '@/lib/data';

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const role = sessionStorage.getItem('userRole');
        setUserRole(role);
    }
  }, []);

  const isAdmin = userRole === 'admin';
  const currentUser = users[0]; // Assuming current user for demo

  const totalProjects = isAdmin ? 12 : projects.filter(p => p.members.some(m => m.id === currentUser.id)).length;
  const activeTasks = isAdmin ? 45 : tasks.filter(t => t.status !== 'Done' && t.assignees.some(a => a.id === currentUser.id)).length;
  const completedTasks = isAdmin ? 128 : tasks.filter(t => t.status === 'Done' && t.assignees.some(a => a.id === currentUser.id)).length;
  const teamMembers = isAdmin ? 8 : 1; // Just the user

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Projects" 
          value={totalProjects.toString()}
          icon={HardDrive} 
          change={isAdmin ? "+2 this month" : ""}
        />
        <StatsCard 
          title="Active Tasks" 
          value={activeTasks.toString()}
          icon={Activity} 
          change={isAdmin ? "+10 this week" : ""}
        />
        <StatsCard 
          title="Completed Tasks" 
          value={completedTasks.toString()}
          icon={LayoutDashboard} 
          change={isAdmin ? "+30 this month" : ""} 
        />
        <StatsCard 
          title="Team Members" 
          value={teamMembers.toString()}
          icon={Share2} 
          change={isAdmin ? "+1 this month" : ""}
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
