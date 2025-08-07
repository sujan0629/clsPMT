
import { PeopleDirectory } from "@/components/people/people-directory";

export default function PeoplePage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">People & Teams</h1>
                <p className="text-muted-foreground mt-1">Browse users and teams in your organization.</p>
            </div>
            <PeopleDirectory />
        </div>
    );
}
