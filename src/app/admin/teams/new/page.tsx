
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MultiSelect } from "@/components/ui/multi-select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  teamMembers: z.array(z.string()).min(1, "You must select at least one team member."),
  membership: z.enum(["anyone", "approval"]),
});

const teamMemberOptions = users.map(user => ({ value: user.id, label: user.name }));

export default function CreateTeamPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamMembers: [],
      membership: "approval",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Team Created:", values);
    toast({
        title: "Team Created!",
        description: `The team "${values.teamName}" has been successfully created.`,
    });
    router.push("/admin/teams");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-8 w-full max-w-2xl mx-auto">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/teams">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
        </header>

        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a New Team</CardTitle>
                        <CardDescription>Fill in the details below to set up your new team.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                control={form.control}
                                name="teamName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Team Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Frontend Developers" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                    control={form.control}
                                    name="teamMembers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Add Team Members *</FormLabel>
                                            <MultiSelect
                                                options={teamMemberOptions}
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
                                    name="membership"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Membership Controls</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                                >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                    <RadioGroupItem value="approval" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Only admins and team leads can add members
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                    <RadioGroupItem value="anyone" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Anyone can join this team without approval
                                                    </FormLabel>
                                                </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                <Button type="submit">Create Team</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
