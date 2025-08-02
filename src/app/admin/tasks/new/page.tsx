
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { TaskPreviewPanel } from "@/components/tasks/task-preview-panel";

// Define the schema here to be shared between the page and the form
const formSchema = z.object({
    projectId: z.string({ required_error: "Please select a project." }),
    title: z.string().min(3, "Task title must be at least 3 characters."),
    description: z.string().optional(),
    subtasks: z.array(z.object({ 
        title: z.string().min(1, "Subtask title cannot be empty."),
        description: z.string().optional(),
    })).optional(),
    priority: z.enum(["Low", "Medium", "High"]),
    assignees: z.array(z.string()).min(1, "You must select at least one assignee."),
    dueDate: z.date({ required_error: "A due date is required."}),
    attachments: z.any().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
export type FocusableField = 'title' | 'description' | 'subtasks' | 'priority' | 'dueDate' | 'assignees' | 'attachments' | null;

export default function CreateTaskPage() {
    const [focusedField, setFocusedField] = useState<FocusableField>(null);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            subtasks: [],
            assignees: [],
            priority: "Medium",
        },
    });

    const watchedData = useWatch({ control: form.control });

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/tasks">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Tasks</span>
                            </Link>
                        </Button>
                        <h1 className="text-xl font-semibold">Create New Task</h1>
                     </div>
                 </div>
            </header>

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Panel: Form */}
                    <div className="flex-1">
                        <CreateTaskForm form={form} setFocusedField={setFocusedField} />
                    </div>

                    {/* Right Panel: Preview */}
                     <div className="hidden md:flex flex-col sticky top-24 h-[calc(100vh-8rem)]">
                       <TaskPreviewPanel 
                            focusedField={focusedField} 
                            formData={watchedData}
                            form={form}
                       />
                    </div>
                </div>
            </main>
        </div>
    );
}
