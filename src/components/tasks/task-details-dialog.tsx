"use client"

import { Task } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Paperclip, Send } from "lucide-react";
import { Badge } from "../ui/badge";

interface TaskDetailsDialogProps {
  task: Task;
  children: React.ReactNode;
}

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
};

export function TaskDetailsDialog({ task, children }: TaskDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            {task.title}
            <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
            <Badge variant="outline">{task.status}</Badge>
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            In project: <span className="font-semibold text-foreground">{task.projectName}</span>
            <span className="mx-2">|</span>
            Due on: <span className="font-semibold text-foreground">{format(task.dueDate, "PPP")}</span>
          </div>
        </DialogHeader>
        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subtasks">Subtasks ({task.subtasks.length})</TabsTrigger>
            <TabsTrigger value="comments">Comments ({task.comments.length})</TabsTrigger>
            <TabsTrigger value="attachments">Attachments ({task.attachments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <p className="text-sm text-muted-foreground">{task.description || "No description provided."}</p>
          </TabsContent>
          <TabsContent value="subtasks" className="py-4 space-y-2">
            {task.subtasks.map(subtask => (
              <div key={subtask.id} className="flex items-center space-x-2">
                <Checkbox id={subtask.id} checked={subtask.completed} />
                <label htmlFor={subtask.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {subtask.title}
                </label>
              </div>
            ))}
             {task.subtasks.length === 0 && <p className="text-sm text-muted-foreground">No subtasks yet.</p>}
          </TabsContent>
          <TabsContent value="comments" className="py-4">
             {task.comments.length === 0 && <p className="text-sm text-muted-foreground mb-4">No comments yet. Be the first to comment!</p>}
            <div className="space-y-4">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatarUrl} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{comment.author.name}</p>
                            <p className="text-xs text-muted-foreground">{format(comment.timestamp, "PPp")}</p>
                        </div>
                        <p className="text-sm text-muted-foreground bg-accent/50 p-2 rounded-md mt-1">{comment.content}</p>
                    </div>
                </div>
              ))}
              <div className="flex items-start gap-3 pt-4 border-t">
                  <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/32x32.png" data-ai-hint="person portrait" />
                      <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="w-full relative">
                    <Textarea placeholder="Write a comment... (@mention to notify)" className="pr-20" />
                    <Button size="icon" variant="ghost" className="absolute right-10 top-1.5"><Paperclip className="h-4 w-4" /></Button>
                    <Button size="icon" className="absolute right-1 top-1.5"><Send className="h-4 w-4" /></Button>
                  </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="attachments" className="py-4">
            {task.attachments.length === 0 && <p className="text-sm text-muted-foreground">No attachments.</p>}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
