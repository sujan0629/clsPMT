
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, CalendarDays, CheckSquare, Home, LayoutDashboard, Settings, Shapes, FolderKanban, BarChart3, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";


export function MainNav() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setUserRole(sessionStorage.getItem('userRole'));
    }
  }, [pathname]); // Re-check on path change

  const isAdmin = userRole === 'admin';

  const adminNavItems = [
      { href: "/admin/home", label: "Home", icon: Home },
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  ];

  const userNavItems = [
      { href: "/user/home", label: "Home", icon: Home },
      { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/user/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/user/calendar", label: "Calendar", icon: CalendarDays },
  ];
  
  const aiNavItems = [
      { href: "/ai-prioritizer", label: "Task Prioritizer", icon: Bot },
      { href: "/ai-meeting-summarizer", label: "Meeting Summarizer", icon: ClipboardList },
  ];


  const navItems = isAdmin ? adminNavItems : userNavItems;
  const homePath = isAdmin ? '/admin/home' : '/user/home';
  const settingsPath = isAdmin ? '/admin/settings' : '/user/settings';
  const projectsPath = isAdmin ? '/admin/projects' : '/user/projects';

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-center border-b px-4 shrink-0">
        <Link href={homePath} className="flex items-center gap-2 font-semibold">
          <Shapes className="h-6 w-6 text-primary" />
          <span className="hidden lg:block">clsPMT™</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        <TooltipProvider>
            {navItems.map((item) => (
                <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <span>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                                    pathname === item.href && "bg-accent text-primary font-semibold"
                                )}
                                >
                                <item.icon className="h-5 w-5" />
                                <span className="hidden lg:inline">{item.label}</span>
                            </Link>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="block lg:hidden">
                        <p>{item.label}</p>
                    </TooltipContent>
                </Tooltip>
            ))}

             <Accordion type="single" collapsible defaultValue={pathname.includes('/projects/') ? "projects" : ""} className="space-y-0.5">
                <AccordionItem value="projects" className="border-b-0">
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span className="w-full">
                                <AccordionTrigger className={cn(
                                    "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                                    pathname.startsWith(projectsPath) && !pathname.startsWith('/admin/home') && "bg-accent text-primary font-semibold",
                                    "hover:no-underline font-normal text-sm w-full"
                                )}>
                                    <Link href={projectsPath} className="flex items-center gap-3">
                                        <FolderKanban className="h-5 w-5" />
                                        <span className="hidden lg:inline">Projects</span>
                                    </Link>
                                </AccordionTrigger>
                            </span>
                        </TooltipTrigger>
                         <TooltipContent side="right" className="block lg:hidden">
                            <p>Projects</p>
                        </TooltipContent>
                    </Tooltip>
                    <AccordionContent className="pl-8 pr-2 hidden lg:block">
                        <nav className="grid gap-0.5 pt-1">
                        {projects.map(project => (
                             <Link key={project.id} href={`${projectsPath}/${project.id}`} className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary",
                                pathname === `${projectsPath}/${project.id}` && "bg-accent text-primary font-medium"
                             )}>
                                {project.name}
                             </Link>
                        ))}
                        </nav>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
             <Accordion type="single" collapsible defaultValue={pathname.startsWith('/ai-') ? "ai-tools" : ""} className="space-y-0.5">
                <AccordionItem value="ai-tools" className="border-b-0">
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span className="w-full">
                                <AccordionTrigger className={cn(
                                    "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                                    pathname.startsWith('/ai-') && "bg-accent text-primary font-semibold",
                                    "hover:no-underline font-normal text-sm w-full"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Bot className="h-5 w-5" />
                                        <span className="hidden lg:inline">AI Assistant</span>
                                    </div>
                                </AccordionTrigger>
                            </span>
                        </TooltipTrigger>
                         <TooltipContent side="right" className="block lg:hidden">
                            <p>AI Assistant</p>
                        </TooltipContent>
                    </Tooltip>
                    <AccordionContent className="pl-8 pr-2 hidden lg:block">
                        <nav className="grid gap-0.5 pt-1">
                        {aiNavItems.map(item => (
                             <Link key={item.href} href={item.href} className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-primary",
                                pathname === item.href && "bg-accent text-primary font-medium"
                             )}>
                                <item.icon className="h-4 w-4 mr-1"/>
                                {item.label}
                             </Link>
                        ))}
                        </nav>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </TooltipProvider>
      </nav>
      <div className="mt-auto p-2 border-t">
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <span>
                        <Link
                            href={settingsPath}
                            className={cn(
                            "flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-1.5 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                            pathname.startsWith(settingsPath) && "bg-accent text-primary font-semibold"
                            )}
                        >
                            <Settings className="h-5 w-5" />
                            <span className="hidden lg:inline">Settings</span>
                        </Link>
                    </span>
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
