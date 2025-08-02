import type { Project } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "../ui/button";

interface ProjectCardProps {
  project: Project;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "Active": "default",
  "On Hold": "secondary",
  "Completed": "outline",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
            </div>
            <Badge variant={statusVariant[project.status]} className="whitespace-nowrap">{project.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <p className="text-sm font-medium">{project.progress}%</p>
            </div>
            <Progress value={project.progress} aria-label={`${project.progress}% complete`} />
        </div>
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Team</p>
            <div className="flex -space-x-2">
                {project.members.map(member => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-card">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
            <p className="text-xs text-muted-foreground">Deadline</p>
            <p className="text-sm font-medium">{format(project.deadline, "MMM d, yyyy")}</p>
        </div>
        <Button variant="secondary" size="sm">View Project</Button>
      </CardFooter>
    </Card>
  );
}
