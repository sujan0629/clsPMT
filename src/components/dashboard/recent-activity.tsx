
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { activities } from "@/lib/data";
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

export function RecentActivity() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} data-ai-hint="person portrait" />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{activity.user.name}</span>
              {" "}
              {activity.action}
              {" "}
              <span className="font-semibold text-foreground">{activity.target}</span>
            </p>
            <div className="text-xs text-muted-foreground">
              {isClient ? (
                formatDistanceToNow(activity.timestamp, { addSuffix: true })
              ) : (
                <Skeleton className="h-4 w-20" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
