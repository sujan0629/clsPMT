import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shapes } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <main className="w-full max-w-sm mx-auto p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                  <Shapes className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold">clsPMT™</h1>
              </div>
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>Enter your email and we'll send you a link to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Remembered your password?{' '}
              <Link href="/" prefetch={false} className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
