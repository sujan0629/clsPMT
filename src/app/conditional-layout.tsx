
'use client';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noShellRoutes = ['/welcome', '/signup', '/forgot-password', '/'];

  // Exact match for the admin route, or any route starting with /auth/ for the invite flow
  if (noShellRoutes.includes(pathname) || pathname.startsWith('/auth/') || pathname.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  // Handle new project routes without the main app shell
  if (pathname.startsWith('/admin/projects/new')) {
     return <>{children}</>;
  }


  return <AppShell>{children}</AppShell>;
}
