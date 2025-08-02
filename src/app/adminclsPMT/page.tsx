
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shapes, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'adminclspmt' && password === 'fRuits123!') {
      setError('');
      router.push('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <main className="w-full max-w-sm mx-auto p-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Shapes className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">clsPMT™</h1>
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your administrator credentials</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="adminclspmt" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="button" className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Not an admin?{' '}
                <Link href="/" prefetch={false} className="underline">
                    User Login
                </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
