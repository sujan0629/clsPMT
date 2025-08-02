import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and application settings.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>This page is currently under development. Please check back later!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Settings content will be here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
