
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shapes, ShieldAlert } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <main className="w-full max-w-sm mx-auto p-4">
        <Card>
          <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                  <ShieldAlert className="h-8 w-8 text-primary" />
              </div>
            <CardTitle className="text-2xl font-bold">Invitation Required</CardTitle>
            <CardDescription>
                This is a private system. Accounts can only be created via an invitation link sent by an administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
