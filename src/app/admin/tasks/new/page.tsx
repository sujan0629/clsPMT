
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookText, FileText, Type } from "lucide-react";
import { CreateTaskForm } from "@/components/tasks/create-task-form";

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

type FormSchemaType = z.infer<typeof formSchema>;
type FocusableField = 'title' | 'description' | 'attachments' | null;

const PreviewContent = ({ focusedField, formData }: { focusedField: FocusableField, formData: Partial<FormSchemaType> }) => {
    switch (focusedField) {
        case 'title':
            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Type className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">Task Title Preview</h3>
                    </div>
                    <p className="text-2xl font-bold break-words">{formData.title || '...'}</p>
                </div>
            );
        case 'description':
            return (
                <div className="space-y-2">
                     <div className="flex items-center gap-3 text-muted-foreground">
                        <FileText className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">Description Preview</h3>
                    </div>
                    <p className="text-sm break-words whitespace-pre-wrap">{formData.description || 'Start typing a description...'}</p>
                </div>
            );
        default:
            return (
                <div className="text-center text-muted-foreground space-y-3">
                    <BookText className="h-12 w-12 mx-auto" />
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <p className="text-sm">Click on a field like 'Title' or 'Description' to see a live preview of your content here.</p>
                </div>
            );
    }
};

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
                        <div className="flex-1 bg-muted/30 border-2 border-dashed rounded-xl flex items-center justify-center p-8">
                            <div className="w-full">
                                <PreviewContent focusedField={focusedField} formData={watchedData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
