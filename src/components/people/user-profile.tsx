
"use client";

import type { User } from "@/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building, CaseSensitive, MapPin, Briefcase } from "lucide-react";


interface UserProfileProps {
    user: User;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-medium">{value || 'Not specified'}</p>
        </div>
    </div>
);


export function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="h-48 bg-muted rounded-lg relative">
                 <Image 
                    src="https://placehold.co/1200x300.png"
                    alt="Cover photo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="abstract office"
                 />
                 <div className="absolute -bottom-12 left-8">
                     <Avatar className="h-28 w-28 border-4 border-background">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                 </div>
            </div>

            <div className="pt-14 px-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.title}</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow icon={Briefcase} label="Job title" value={user.title} />
                            <InfoRow icon={CaseSensitive} label="Department" value={user.department} />
                            <InfoRow icon={Building} label="Organization" value={user.organization} />
                            <InfoRow icon={MapPin} label="Location" value={user.location} />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Contact</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-primary hover:underline cursor-pointer">{user.email}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Activity feed coming soon...</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
