
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { users, tasks } from "@/lib/data"
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "../ui/chart"

const productivityData = users.map(user => {
  const completed = tasks.filter(t => t.assignees.some(a => a.id === user.id) && t.status === 'Done').length;
  const overdue = tasks.filter(t => t.assignees.some(a => a.id === user.id) && new Date(t.dueDate) < new Date() && t.status !== 'Done').length;
  return {
    name: user.name.split(' ')[0],
    completed,
    overdue,
  };
});

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--destructive))",
  },
}

export function TeamProductivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Productivity</CardTitle>
        <CardDescription>Completed vs. Overdue tasks per member.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart data={productivityData} margin={{ top: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="overdue" fill="var(--color-overdue)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
