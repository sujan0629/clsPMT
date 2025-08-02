
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { users } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { MultiSelect } from "@/components/ui/multi-select";
import Image from "next/image";


const formSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  projectDescription: z.string().min(10, "Description must be at least 10 characters."),
  team: z.array(z.string()).min(1, "You must select at least one team member."),
});

const teamOptions = users.map(user => ({ value: user.id, label: user.name }));

export default function CreateProjectFormPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      team: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Project Created:", values);
    toast({
        title: "Project Created!",
        description: `The project "${values.projectName}" has been successfully created.`,
    });
    router.push("/admin/projects");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-8 w-full max-w-5xl mx-auto">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/projects/new-project">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/projects">
                     <X className="h-5 w-5" />
                     <span className="sr-only">Close</span>
                </Link>
            </Button>
        </header>

        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Create a new project</h1>
                        <p className="text-muted-foreground mt-2">Fill in the details below to get your project up and running.</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Q4 Marketing Campaign" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="projectDescription"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A brief description of what this project is about." {...field} rows={3} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                                control={form.control}
                                name="team"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assign Team</FormLabel>
                                        <MultiSelect
                                            options={teamOptions}
                                            selected={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select team members..."
                                            className="w-full"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Create Project</Button>
                        </form>
                    </Form>
                </div>
                 <div className="hidden lg:block">
                    <Image 
                        src="https://placehold.co/600x400.png"
                        alt="A team collaborating on a project"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-2xl"
                        data-ai-hint="team collaboration"
                    />
                </div>
            </div>
        </main>
    </div>
  );
}
