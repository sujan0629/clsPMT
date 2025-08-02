"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { tasks } from "@/lib/data"

const chartData = tasks.reduce((acc, task) => {
  const project = acc.find(p => p.project === task.projectName);
  if (project) {
    if (task.status === "To Do") project.todo++;
    if (task.status === "In Progress") project.inprogress++;
    if (task.status === "Done") project.done++;
  } else {
    acc.push({
      project: task.projectName,
      todo: task.status === "To Do" ? 1 : 0,
      inprogress: task.status === "In Progress" ? 1 : 0,
      done: task.status === "Done" ? 1 : 0,
    });
  }
  return acc;
}, [] as { project: string; todo: number; inprogress: number; done: number }[]);


const chartConfig = {
  todo: {
    label: "To Do",
    color: "hsl(var(--chart-2))",
  },
  inprogress: {
    label: "In Progress",
    color: "hsl(var(--chart-4))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-1))",
  },
}

export function TasksChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Tasks Overview</CardTitle>
        <CardDescription>Tasks distribution by project</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="project"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? '...' : '')}
            />
             <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="todo" stackId="a" fill="var(--color-todo)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inprogress" stackId="a" fill="var(--color-inprogress)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="done" stackId="a" fill="var(--color-done)" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
