
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { users } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  projectDescription: z.string().min(10, "Description must be at least 10 characters."),
  team: z.array(z.string()).min(1, "You must select at least one team member."),
});

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
    <div className="flex flex-col">
       <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below to start your new project.</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardContent className="p-6 space-y-6">
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
                                <Textarea placeholder="A brief description of what this project is about." {...field} rows={4} />
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
                                <Select onValueChange={(value) => field.onChange([value])} defaultValue={field.value?.[0]}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select team members" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
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
  );
}
