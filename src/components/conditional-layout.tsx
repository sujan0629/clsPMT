'use client';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noShellRoutes = ['/', '/signup', '/forgot-password'];

  if (noShellRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
