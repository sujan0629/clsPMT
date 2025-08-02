
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projects, users } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, X, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MultiSelect } from "@/components/ui/multi-select";


const formSchema = z.object({
  title: z.string().min(3, "Task title must be at least 3 characters."),
  description: z.string().optional(),
  projectId: z.string({ required_error: "Please select a project."}),
  assignees: z.array(z.string()).min(1, "You must select at least one assignee."),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.date({ required_error: "A due date is required."}),
});

const projectOptions = projects.map(project => ({ value: project.id, label: project.name }));
const userOptions = users.map(user => ({ value: user.id, label: user.name }));

export default function CreateTaskPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      assignees: [],
      priority: "Medium",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Task Created:", values);
    toast({
        title: "Task Created!",
        description: `The task "${values.title}" has been successfully created.`,
    });
    router.push("/admin/tasks");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-8 w-full max-w-6xl mx-auto">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/tasks">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
            <h1 className="text-xl font-semibold">Create New Task</h1>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/tasks">
                     <X className="h-5 w-5" />
                     <span className="sr-only">Close</span>
                </Link>
            </Button>
        </header>

        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                <div className="hidden lg:flex justify-center items-center">
                    <Image 
                        src="https://placehold.co/600x400.png"
                        alt="A team organizing tasks on a board"
                        width={500}
                        height={400}
                        className="rounded-lg"
                        data-ai-hint="task management illustration"
                    />
                </div>
                <div className="space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Task Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Design the new user dashboard" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Provide a detailed description of the task..." {...field} rows={4} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a project" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {projectOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Set priority" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Low">Low</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="High">High</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name="assignees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assign to</FormLabel>
                                        <MultiSelect
                                            options={userOptions}
                                            selected={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select team members..."
                                            className="w-full"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" size="lg">Create Task</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    </div>
  );
}
