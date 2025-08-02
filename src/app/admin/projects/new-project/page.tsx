
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-4">
        <div className="w-full max-w-xs">
            <Card className="rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle>Create a New Project</CardTitle>
                    <CardDescription>Get started by creating a project from scratch.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/admin/projects/new/create" className="w-full">
                        <Button className="w-full h-28 text-lg" variant="outline">
                            <FilePlus2 className="mr-4 h-8 w-8" />
                            Create from scratch
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
