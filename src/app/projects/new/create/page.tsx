
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { users } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { MultiSelect } from "@/components/ui/multi-select";


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
    router.push("/projects");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/projects/new-project">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
            <h1 className="text-xl font-semibold">Create Project</h1>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/projects">
                     <X className="h-5 w-5" />
                     <span className="sr-only">Close</span>
                </Link>
            </Button>
        </header>

        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className="rounded-xl">
                             <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                                <CardDescription>Fill in the details below to start your new project.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
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
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit">Create Project</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </main>
    </div>
  );
}
