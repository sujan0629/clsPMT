
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";


export function FocusMode() {
  return (
    <Card className="bg-primary text-primary-foreground">
        <CardHeader>
            <CardTitle size="lg">Focus Mode</CardTitle>
            <CardDescription className="text-primary-foreground/80">
                Zone in on your most important tasks.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="secondary" className="w-full">
                <Compass className="mr-2 h-4 w-4" />
                Start Focus Session
            </Button>
        </CardContent>
    </Card>
  );
}
