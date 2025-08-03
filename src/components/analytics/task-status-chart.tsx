
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { tasks } from "@/lib/data"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
}, {} as Record<string, number>);


const chartData = [
  { status: "To Do", count: statusCounts["To Do"] || 0, fill: "var(--color-todo)" },
  { status: "In Progress", count: statusCounts["In Progress"] || 0, fill: "var(--color-inprogress)" },
  { status: "Done", count: statusCounts["Done"] || 0, fill: "var(--color-done)" },
  { status: "On Hold", count: statusCounts["On Hold"] || 0, fill: "var(--color-onhold)" },
]

const chartConfig = {
  count: {
    label: "Tasks",
  },
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
  onhold: {
    label: "On Hold",
    color: "hsl(var(--chart-5))",
  }
}

export function TaskStatusChart() {
  const totalTasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Status Distribution</CardTitle>
        <CardDescription>A look at all current tasks.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          All tasks are accounted for.
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing status for all {totalTasks} tasks.
        </div>
      </CardFooter>
    </Card>
  )
}
