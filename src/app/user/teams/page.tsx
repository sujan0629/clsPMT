
import { TeamDirectory } from "@/components/teams/directory";

export default function TeamsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                <p className="text-muted-foreground mt-1">Browse users and teams in your organization.</p>
            </div>
            <TeamDirectory />
        </div>
    );
}
