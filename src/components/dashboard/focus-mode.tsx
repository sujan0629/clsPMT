
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label";


export function FocusMode() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
            <CardHeader>
                <CardTitle>Focus Mode</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                    Zone in on your most important tasks.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center gap-2 rounded-md bg-primary-foreground/20 p-3 text-sm font-medium">
                    <Compass className="mr-2 h-4 w-4" />
                    Start Focus Session
                </div>
            </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a Focus Session</DialogTitle>
          <DialogDescription>
            Select a duration for your focused work session. We'll help you stay on track.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Select defaultValue="30">
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        <DialogFooter>
          <Button>Begin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
