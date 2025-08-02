
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProjectsDataTable } from "@/components/projects/projects-data-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage all your projects in one place.</p>
        </div>
        <Button asChild>
          <Link href="/projects/new-project">
            <PlusCircle />
            New Project
          </Link>
        </Button>
      </div>
      <ProjectsDataTable />
    </div>
  );
}
