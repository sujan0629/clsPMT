"use client";

import { MainNav } from "@/components/main-nav";
import { Header } from "@/components/header";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="bg-card border-r">
          <MainNav />
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
