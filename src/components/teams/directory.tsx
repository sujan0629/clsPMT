
"use client";

import { useState } from "react";
import { users } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";


export function TeamDirectory() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Tabs defaultValue="people">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="people">People</TabsTrigger>
                        <TabsTrigger value="teams">Teams</TabsTrigger>
                    </TabsList>
                    <div className="w-full max-w-sm">
                        <Input 
                            placeholder="Search people..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <TabsContent value="people">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredUsers.map(user => (
                             <Link key={user.id} href={`/people/${user.id}`} className="group">
                                <Card className="h-full transition-all duration-200 group-hover:bg-accent group-hover:shadow-md">
                                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                        <Avatar className="h-24 w-24 border-2 border-primary/20">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="mt-2">
                                            <p className="font-semibold">{user.name}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="teams">
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Team management is coming soon.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
