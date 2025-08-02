
'use client';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noShellRoutes = ['/', '/signup', '/forgot-password', '/adminclsPMT'];

  // Exact match for the admin route, or any route starting with /auth/ for the invite flow
  if (noShellRoutes.includes(pathname) || pathname.startsWith('/auth/')) {
    return <>{children}</>;
  }

  // Handle new project routes
  if (pathname.startsWith('/projects/new')) {
     return <AppShell>{children}</AppShell>;
  }


  return <AppShell>{children}</AppShell>;
}
