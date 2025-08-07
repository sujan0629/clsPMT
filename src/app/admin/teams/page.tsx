
import { TeamDirectory } from "@/components/teams/directory";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function TeamsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                    <p className="text-muted-foreground mt-1">Manage users and organize them into teams.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                      <Link href="/admin/teams/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Team
                      </Link>
                    </Button>
                </div>
            </div>
            <TeamDirectory />
        </div>
    );
}
