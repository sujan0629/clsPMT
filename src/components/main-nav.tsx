"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, CalendarDays, CheckSquare, LayoutDashboard, Settings, Shapes, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/ai-prioritizer", label: "AI Assistant", icon: Bot },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-center border-b px-4 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Shapes className="h-6 w-6 text-primary" />
          <span className="hidden lg:block">clsPMT™</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                    pathname === item.href && "bg-accent text-primary font-semibold"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="block lg:hidden">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="mt-auto p-4 border-t">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                    pathname === "/settings" && "bg-accent text-primary font-semibold"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span className="hidden lg:inline">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="block lg:hidden">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
