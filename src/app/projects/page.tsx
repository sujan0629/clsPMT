import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div >
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage all your projects in one place.</p>
        </div>
        <Button>
          <PlusCircle />
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
