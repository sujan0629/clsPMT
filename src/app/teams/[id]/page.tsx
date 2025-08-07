
"use client";

import { notFound, useParams } from 'next/navigation';
import { teams } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Users } from 'lucide-react';
import Image from 'next/image';

export default function TeamDetailsPage() {
    const params = useParams();
    const teamId = params.id as string;
    const team = teams.find(t => t.id === teamId);

    if (!team) {
        notFound();
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div className="h-48 bg-muted rounded-lg relative">
                 <Image 
                    src="https://placehold.co/1200x300.png"
                    alt="Cover photo for team"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="abstract workspace"
                 />
            </div>

            <div className="pt-8 px-8 flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <Users className="h-10 w-10 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold">{team.name}</h1>
                        <p className="text-muted-foreground">A team at Codelits Studio.</p>
                    </div>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add People
                </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{team.description || "No description provided."}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Members ({team.members.length})</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            {team.members.map(user => (
                                <div key={user.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.role}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Remove</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center py-12">
                             <p className="text-muted-foreground">There is no work to see here yet.</p>
                             <p className="text-sm text-muted-foreground/80 mt-2">Team activity and assigned work will appear here.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
