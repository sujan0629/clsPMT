"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { tasks } from "@/lib/data"
import { isSameDay } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

export function CalendarView() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const tasksForSelectedDay = date
    ? tasks.filter((task) => isSameDay(task.dueDate, date))
    : []

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                table: "w-full border-collapse space-y-1",
                head_cell: "w-full text-muted-foreground rounded-md font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-auto text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-full",
                day: "h-16 w-full p-1 text-left font-normal aria-selected:opacity-100",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
              }}
              components={{
                DayContent: ({ date }) => {
                  const dayTasks = tasks.filter((task) => isSameDay(task.dueDate, date));
                  return (
                    <div className="relative h-full w-full">
                      <time dateTime={date.toISOString()} className="absolute top-1 left-1">{date.getDate()}</time>
                      {dayTasks.length > 0 && (
                        <div className="absolute bottom-1 right-1 flex items-center justify-end w-full">
                           <span className="flex h-2 w-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </div>
          <div className="border-l p-4">
            <h3 className="text-lg font-semibold mb-4">
              Tasks for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'selected date'}
            </h3>
            <div className="space-y-2">
              {tasksForSelectedDay.length > 0 ? (
                tasksForSelectedDay.map((task) => (
                  <div key={task.id} className="p-2 rounded-md border bg-card">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.projectName}</p>
                    <Badge variant={priorityVariant[task.priority]} className="mt-1">{task.priority}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tasks due on this day.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
