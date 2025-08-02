
import { CalendarView } from "@/components/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
      </div>
      <div className="flex-1">
        <CalendarView />
      </div>
    </div>
  );
}
