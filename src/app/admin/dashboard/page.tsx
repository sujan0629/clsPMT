
import { Activity, BarChart3, HardDrive, LayoutDashboard, Share2, Users, Calendar, CheckCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { MyTasks } from "@/components/dashboard/my-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamProductivity } from "@/components/dashboard/team-productivity";
import { Deadlines } from "@/components/dashboard/deadlines";
import { FocusMode } from "@/components/dashboard/focus-mode";

export default function DashboardPage() {
  const totalProjects = 12;
  const activeTasks = 45;
  const completedTasks = 128;
  const teamMembers = 8;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FocusMode />
        <Card>
            <CardHeader>
                <CardTitle size="lg">Deadlines</CardTitle>
                <CardDescription>Upcoming project deadlines.</CardDescription>
            </CardHeader>
            <CardContent>
                <Deadlines />
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle size="sm" className="font-medium">Total Projects</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-muted-foreground">+2 since last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle size="sm" className="font-medium">Active Tasks</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{activeTasks}</div>
                <p className="text-xs text-muted-foreground">+5 since last week</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TeamProductivity />
        </div>
        <div>
          <TasksChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
         <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>A log of recent changes to the project.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
          <MyTasks />
      </div>

    </div>
  );
}
