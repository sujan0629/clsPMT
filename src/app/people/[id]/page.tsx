
"use client";

import { notFound, useParams } from 'next/navigation';
import { users } from '@/lib/data';
import { UserProfile } from '@/components/people/user-profile';

export default function UserProfilePage() {
    const params = useParams();
    const userId = params.id as string;
    const user = users.find(u => u.id === userId);

    if (!user) {
        notFound();
    }

    return <UserProfile user={user} />;
}
