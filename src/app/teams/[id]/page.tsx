
"use client";

import { notFound, useParams } from 'next/navigation';
import { teams, users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle } from 'lucide-react';

export default function TeamDetailsPage() {
    const params = useParams();
    const teamId = params.id as string;
    const team = teams.find(t => t.id === teamId);

    if (!team) {
        notFound();
    }
    
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add People
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{team.description || "No description provided."}</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Members ({team.members.length})</CardTitle>
                        </CardHeader>
                         <CardContent className="grid gap-4 md:grid-cols-2">
                            {team.members.map(user => (
                                <Card key={user.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.role}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Remove</Button>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
