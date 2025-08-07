
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const formSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  teamMembers: z.array(z.string()).min(1, "You must select at least one team member."),
  membership: z.enum(["anyone", "approval"]),
});

const teamMemberOptions = users.map(user => ({ value: user.id, label: user.name }));

export function CreateTeamDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

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
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Team
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
             <DialogHeader>
                <DialogTitle>Create a New Team</DialogTitle>
                <DialogDescription>Fill in the details below to set up your new team.</DialogDescription>
            </DialogHeader>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
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
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Team</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
