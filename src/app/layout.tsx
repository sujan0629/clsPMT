
import type { Metadata } from "next";
import "./globals.css";
import "@/styles/nprogress.css";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalLayout } from "./conditional-layout";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { NextTopLoader } from "@/components/ui/next-top-loader";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "clsPMT™: Codelits Project Manager",
  description: "The ultimate project management tool to streamline your workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <NextTopLoader />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}
