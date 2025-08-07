
"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"
import { projects } from "@/lib/data"

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
  ChartLegendContent
} from "@/components/ui/chart"

const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const chartData = [
  { status: "Active", count: statusCounts["Active"] || 0, fill: "var(--color-active)" },
  { status: "On Hold", count: statusCounts["On Hold"] || 0, fill: "var(--color-onhold)" },
  { status: "Completed", count: statusCounts["Completed"] || 0, fill: "var(--color-completed)" },
]

const chartConfig = {
  count: {
    label: "Projects",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  onhold: {
    label: "On Hold",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
}

export function ProjectStatusChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Status Overview</CardTitle>
        <CardDescription>A summary of all projects.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" labelLine={false} nameKey="status" />
             <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
