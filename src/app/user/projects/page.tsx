
import { ProjectsDataTable } from "@/components/projects/projects-data-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground mt-1">A list of projects you are a member of.</p>
        </div>
      </div>
      <ProjectsDataTable />
    </div>
  );
}
