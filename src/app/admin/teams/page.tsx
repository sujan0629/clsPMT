
import { TeamDirectory } from "@/components/teams/directory";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";

export default function TeamsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                    <p className="text-muted-foreground mt-1">Manage users and organize them into teams.</p>
                </div>
                <div className="flex gap-2">
                    <CreateTeamDialog />
                </div>
            </div>
            <TeamDirectory />
        </div>
    );
}
