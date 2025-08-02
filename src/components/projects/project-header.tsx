
"use client";

import type { Project } from "@/types";
import { format } from "date-fns";
import { Calendar, Users, Percent, MoreVertical, CheckCircle, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ProjectHeaderProps {
    project: Project;
}

const statusConfig = {
    Active: { icon: CheckCircle, color: "text-green-500" },
    "On Hold": { icon: Clock, color: "text-yellow-500" },
    Completed: { icon: CheckCircle, color: "text-blue-500" },
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
    const StatusIcon = statusConfig[project.status].icon;
    const statusColor = statusConfig[project.status].color;

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <p className="text-muted-foreground mt-1 max-w-2xl">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Share</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem>Archive Project</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-lg border bg-card text-card-foreground p-4">
                 <div className="flex items-center gap-3">
                    <StatusIcon className={`h-6 w-6 ${statusColor}`} />
                    <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-semibold">{project.status}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="font-semibold">{format(project.deadline, "MMM d, yyyy")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Team</p>
                        <p className="font-semibold">{project.members.length} members</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Percent className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="w-24 h-2" />
                            <span className="font-semibold">{project.progress}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
