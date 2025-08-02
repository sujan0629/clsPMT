"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebar();
  
  return (
    <>
      <div className={cn("hidden md:block", className)}>
        {children}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
}

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "children">>(
  ({ className, variant = "ghost", size = "icon", ...props }, ref) => {
    const { isOpen, setIsOpen } = useSidebar();
    return (
      <SheetTrigger asChild>
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn("md:hidden", className)}
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          {isOpen ? <X /> : <Menu />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";


export function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-in-out",
        className
      )}
      {...props}
    />
  );
}
