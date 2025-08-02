"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestTaskPriority, SuggestTaskPriorityOutput } from "@/ai/flows/smart-task-prioritization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  taskDescription: z.string().min(10, "Please provide a more detailed task description."),
  projectContext: z.string().min(10, "Please provide more context about the project."),
});

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Low: "secondary",
    Medium: "default",
    High: "destructive",
  };

export function SmartPrioritizerForm() {
  const [result, setResult] = useState<SuggestTaskPriorityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: "",
      projectContext: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const aiResult = await suggestTaskPriority(values);
      setResult(aiResult);
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Describe Your Task</CardTitle>
                    <CardDescription>Fill in the details below for an AI-powered priority suggestion.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="taskDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Task Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Implement a real-time chat feature for customer support..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="projectContext"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Context</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., This is for a new e-commerce platform launching next quarter. Customer retention is a key goal..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                        </>
                    ) : (
                        <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Suggestion
                        </>
                    )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
      
      <div className="lg:mt-0">
        <Card className="min-h-[300px] flex items-center justify-center bg-muted/20 border-dashed">
            <CardContent className="p-6 text-center w-full">
            {isLoading && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Our AI is thinking...</p>
                </div>
            )}
            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {result && (
                <div className="text-left space-y-4 animate-in fade-in-50 duration-500">
                    <h3 className="text-lg font-semibold">AI Suggestion</h3>
                    <div>
                        <p className="text-sm text-muted-foreground">Suggested Priority</p>
                        <Badge variant={priorityVariant[result.priority]} className="text-base mt-1">{result.priority}</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Reasoning</p>
                        <p className="text-foreground bg-background p-3 rounded-md border mt-1">{result.reasoning}</p>
                    </div>
                </div>
            )}
            {!isLoading && !error && !result && (
                 <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-8 w-8" />
                    <p>Your AI-suggested priority will appear here.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
