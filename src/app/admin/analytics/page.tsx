
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Deadlines } from "@/components/dashboard/deadlines";
import { FocusMode } from "@/components/dashboard/focus-mode";
import { TeamProductivity } from "@/components/dashboard/team-productivity";
import { TaskStatusChart } from "@/components/analytics/task-status-chart";
import { ProjectStatusChart } from "@/components/analytics/project-status-chart";
import { TasksChart } from "@/components/dashboard/tasks-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";


export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Productivity Analytics</h1>
        <p className="text-muted-foreground mt-1">Visual charts showing completed tasks, overdue items, and more.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FocusMode />
        <Card>
            <CardHeader>
                <CardTitle>Deadlines</CardTitle>
                <CardDescription>Upcoming project deadlines.</CardDescription>
            </CardHeader>
            <CardContent>
                <Deadlines />
            </CardContent>
        </Card>
        <TaskStatusChart />
        <ProjectStatusChart />
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

      <div className="grid grid-cols-1 gap-6">
        <TeamProductivity />
      </div>
    </div>
  );
}
