
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
           <footer className="shrink-0 border-t px-6 py-4">
              <p className="text-xs text-muted-foreground text-center">&copy; {new Date().getFullYear()} Codelits Studio Pvt. Ltd. All rights reserved.</p>
           </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
