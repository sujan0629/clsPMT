"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { summarizeMeeting, SummarizeMeetingOutput } from "@/ai/flows/summarize-meeting";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, AlertTriangle, CheckSquare, ClipboardList, Flag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  transcript: z.string().min(50, "Please provide at least 50 characters of meeting notes."),
});


export function MeetingSummarizerForm() {
  const [result, setResult] = useState<SummarizeMeetingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transcript: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const aiResult = await summarizeMeeting(values);
      setResult(aiResult);
    } catch (e) {
      setError("An unexpected error occurred. The AI model may have had trouble with the input. Please try again.");
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
                    <CardTitle>Meeting Notes/Transcript</CardTitle>
                    <CardDescription>Paste the raw text from your meeting here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="transcript"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Transcript</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Paste your unformatted meeting notes or transcript here..." {...field} rows={15} />
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
                        Summarizing...
                        </>
                    ) : (
                        <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Summarize
                        </>
                    )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
      
      <div className="lg:mt-0">
        <Card className="min-h-[400px] flex items-center justify-center bg-muted/20 border-dashed">
            <CardContent className="p-6 text-center w-full">
            {isLoading && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Our AI is analyzing the transcript...</p>
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
                <div className="text-left space-y-6 animate-in fade-in-50 duration-500">
                    <h2 className="text-xl font-bold text-center">{result.title}</h2>
                    
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><ClipboardList className="h-5 w-5 text-primary"/>Summary</h3>
                        <p className="text-foreground bg-background/50 p-3 rounded-md border text-sm">{result.summary}</p>
                    </div>

                    {result.keyDecisions.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Flag className="h-5 w-5 text-primary"/>Key Decisions</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm bg-background/50 p-3 rounded-md border">
                                {result.keyDecisions.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    )}
                    
                    {result.actionItems.length > 0 && (
                         <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><CheckSquare className="h-5 w-5 text-primary"/>Action Items</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm bg-background/50 p-3 rounded-md border">
                                {result.actionItems.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    )}

                </div>
            )}
            {!isLoading && !error && !result && (
                 <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-8 w-8" />
                    <p>Your AI-generated summary will appear here.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
