
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shapes, CheckCircle, Users, BarChart2, KeyRound, Mail, Workflow } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <Link href="/welcome" className="flex items-center justify-center gap-2">
          <Shapes className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">clsPMT™</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
           <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            User Login
          </Link>
          <Link href="/adminclsPMT" className="text-sm font-medium hover:underline underline-offset-4">
            Admin Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow with clsPMT™
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                    The ultimate project management tool designed for elite teams. Manage tasks, projects, and collaboration seamlessly in one powerful, secure platform.
                  </p>
                </div>
                <div className="w-full max-w-4xl mx-auto pt-6">
                    <Image
                        src="https://placehold.co/1200x600.png"
                        width="1200"
                        height="600"
                        alt="Hero Image"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                        data-ai-hint="dashboard analytics"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose clsPMT™?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is built with security and efficiency at its core, enabling your organization to achieve its goals faster.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <div className="grid gap-2 text-center">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Task Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize, assign, and track tasks with our intuitive Kanban boards and detailed task views.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Secure Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Invitation-only access ensures that only authorized personnel from approved domains can join your workspace.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <BarChart2 className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Project Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Gain insights into your team's productivity and project progress with our comprehensive dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Collaboration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                data-ai-hint="team collaboration"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                   <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How to Join</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Invitation-Only Access</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    clsPMT™ operates on a secure, invitation-only basis to protect your team's sensitive project data. Access is granted exclusively through administrator-sent invitations to approved company email domains.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                        <h3 className="font-semibold">Receive Your Invitation</h3>
                        <p className="text-muted-foreground text-sm">An administrator from your organization will send an invitation link to your corporate email address.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <KeyRound className="h-5 w-5 mt-1 text-primary" />
                    <div>
                        <h3 className="font-semibold">Create Your Account</h3>
                        <p className="text-muted-foreground text-sm">Click the unique link in your email. You'll be directed to a secure page to set your password and activate your account.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Workflow className="h-5 w-5 mt-1 text-primary" />
                     <div>
                        <h3 className="font-semibold">Start Collaborating</h3>
                        <p className="text-muted-foreground text-sm">Once your account is active, you can log in, view your projects, and start collaborating with your team.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Codelits Studio Pvt. Ltd. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-xs hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-xs hover:underline underline-offset-4">
            How It Works
          </Link>
        </nav>
      </footer>
    </div>
  );
}
