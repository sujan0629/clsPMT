
"use client";
import { Bell, LogOut, Search, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const currentUser = users[0];
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');
  const homePath = isAdmin ? '/admin/dashboard' : '/user/home';


  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('userRole');
    }
    router.push('/');
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-6 shrink-0 mb-8">
      <div className="flex items-center gap-4 md:hidden">
        <SidebarTrigger />
        <Link href={homePath} className="flex items-center gap-2 font-semibold md:hidden">
          <Shapes className="h-6 w-6 text-primary" />
          <span className="sr-only">clsPMT™</span>
        </Link>
      </div>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full appearance-none bg-background pl-9 shadow-none md:w-2/3 lg:w-1/3"
              placeholder="Search projects or tasks..."
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-start gap-2 cursor-pointer">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="https://placehold.co/32x32.png" alt="Maria Garcia" data-ai-hint="person portrait"/>
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Maria Garcia assigned you a new task</p>
              <p className="text-xs text-muted-foreground">&quot;Develop user authentication&quot; &middot; 1h ago</p>
            </div>
          </DropdownMenuItem>
           <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-start gap-2 cursor-pointer">
             <Avatar className="h-8 w-8 border">
              <AvatarImage src="https://placehold.co/32x32.png" alt="James Smith" data-ai-hint="person portrait"/>
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">James Smith mentioned you in a comment</p>
              <p className="text-xs text-muted-foreground">&quot;Design new homepage...&quot; &middot; 3h ago</p>
            </div>
          </DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem className="flex justify-center text-sm text-primary hover:underline cursor-pointer">
             See all notifications
           </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person portrait" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
