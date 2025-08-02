
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create a New Project</CardTitle>
                <CardDescription>Get started by creating a project from scratch.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/projects/new/create" className="w-full">
                    <Button className="w-full h-24 text-lg" variant="outline">
                        <FilePlus2 className="mr-4 h-8 w-8" />
                        Create from scratch
                    </Button>
                </Link>
            </CardContent>
        </Card>
    </div>
  );
}
