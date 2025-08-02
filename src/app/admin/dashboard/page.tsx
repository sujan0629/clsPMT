
import { Activity, BarChart3, HardDrive, LayoutDashboard, Share2 } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { MyTasks } from "@/components/dashboard/my-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const totalProjects = 12;
  const activeTasks = 45;
  const completedTasks = 128;
  const teamMembers = 8;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Projects" 
          value={totalProjects.toString()}
          icon={HardDrive} 
          change="+2 this month"
        />
        <StatsCard 
          title="Active Tasks" 
          value={activeTasks.toString()}
          icon={Activity} 
          change="+10 this week"
        />
        <StatsCard 
          title="Completed Tasks" 
          value={completedTasks.toString()}
          icon={LayoutDashboard} 
          change="+30 this month" 
        />
        <StatsCard 
          title="Team Members" 
          value={teamMembers.toString()}
          icon={Share2} 
          change="+1 this month"
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
