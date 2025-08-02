
"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MultiSelect } from "@/components/ui/multi-select";
import { Progress } from "@/components/ui/progress";

import { projects, users } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Trash2, FileUp } from "lucide-react";
import type { FocusableField, FormSchemaType } from "@/app/admin/tasks/new/page";


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

const projectOptions = projects.map(project => ({ value: project.id, label: project.name }));
const userOptions = users.map(user => ({ value: user.id, label: user.name }));

interface CreateTaskFormProps {
    form: UseFormReturn<FormSchemaType>;
    setFocusedField: (field: FocusableField) => void;
}


export function CreateTaskForm({ form, setFocusedField }: CreateTaskFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subtasks",
    });

    const triggerValidation = async (fields: (keyof FormSchemaType)[]) => {
        return await form.trigger(fields, { shouldFocus: true });
    };


    const nextStep = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await triggerValidation(["projectId", "title"]);
            if(isValid) setFocusedField('subtasks');
        } else if (step === 2) {
             isValid = await triggerValidation(["subtasks"]);
             if(isValid) setFocusedField('priority');
        } else if (step === 3) {
            isValid = await triggerValidation(["priority", "dueDate", "assignees"]);
        }


        if (isValid || step === 2) { // Allow next from step 2 even if subtasks are empty
            if (step < 3) {
                setStep(s => s + 1);
            }
        }
    };

    const prevStep = () => {
        if (step === 3) setFocusedField('subtasks');
        if (step === 2) setFocusedField('title');
        setStep(s => s - 1);
    }

    function onSubmit(values: FormSchemaType) {
        console.log("Task Created:", values);
        toast({
            title: "Task Created!",
            description: `The task "${values.title}" has been successfully created.`,
        });
        router.push("/admin/tasks");
    }

    const progress = (step / 3) * 100;

    return (
        <div className="space-y-8">
            <Progress value={progress} className="mb-8" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in-50">
                                <h3 className="text-xl font-semibold">Step 1: Task Details</h3>
                                <FormField
                                    control={form.control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <FormItem onFocus={() => setFocusedField(null)}>
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
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem onFocus={() => setFocusedField('title')}>
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
                                        <FormItem onFocus={() => setFocusedField('description')}>
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Provide a detailed description of the task..." {...field} rows={6} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in-50" onFocus={() => setFocusedField('subtasks')}>
                                <h3 className="text-xl font-semibold">Step 2: Add Subtasks (Optional)</h3>
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex flex-col gap-2 border p-4 rounded-md relative bg-background/50">
                                            <FormField
                                                control={form.control}
                                                name={`subtasks.${index}.title`}
                                                render={({ field }) => (
                                                     <FormItem>
                                                        <FormLabel>Subtask Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={`Subtask ${index + 1}`} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`subtasks.${index}.description`}
                                                render={({ field }) => (
                                                     <FormItem>
                                                        <FormLabel>Subtask Description (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Describe the subtask..." {...field} rows={2} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="absolute top-1 right-1 text-muted-foreground hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ title: "", description: "" })}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Subtask
                                </Button>
                            </div>
                        )}
                        
                        {step === 3 && (
                             <div className="space-y-6 animate-in fade-in-50">
                                <h3 className="text-xl font-semibold">Step 3: Assignments & Deadlines</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem onFocus={() => setFocusedField('priority')}>
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
                                    <FormField
                                        control={form.control}
                                        name="dueDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col" onFocus={() => setFocusedField('dueDate')}>
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
                                                    disabled={(date) => date < new Date("1900-01-01")}
                                                    initialFocus
                                                />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="assignees"
                                    render={({ field }) => (
                                        <FormItem onFocus={() => setFocusedField('assignees')}>
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
                                <div onFocus={() => setFocusedField('attachments')}>
                                    <FormLabel>Attachments (Optional)</FormLabel>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                                        <div className="text-center">
                                            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                                            <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-muted-foreground/80">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className="flex justify-between pt-8">
                        <div>
                            {step > 1 && <Button type="button" variant="outline" onClick={prevStep}>Back</Button>}
                        </div>
                        <div>
                            {step < 3 && <Button type="button" onClick={nextStep}>Next Step</Button>}
                            {step === 3 && <Button type="submit">Create Task</Button>}
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
