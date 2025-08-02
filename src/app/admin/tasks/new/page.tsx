
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default function CreateTaskPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
             <div className="mb-8">
                <Button variant="ghost" asChild>
                    <Link href="/admin/tasks">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tasks
                    </Link>
                </Button>
            </div>
            <CreateTaskForm />
        </div>
    </div>
  );
}
