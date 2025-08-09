"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Shapes, CheckCircle, Users, BarChart2, KeyRound, Mail, Workflow } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  // GSAP context for cleanup
  const ctx = gsap.context(() => {
    // Hero animation on load
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 2,
      ease: "power3.out",
      stagger: 0.3,
    });

    // Features animation on scroll
    if (featuresRef.current) {
      gsap.from(featuresRef.current.querySelectorAll('.feature-card'), {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // How it works animation
    if (howItWorksRef.current) {
      gsap.from(howItWorksRef.current.querySelectorAll('.how-item'), {
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      });
    }
  });

  return () => {
    ctx.revert(); // kill all animations created in this context
    ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // remove all scroll triggers
  };
}, []);


  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-foreground">
      <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-[1500px] mx-auto px-4 lg:px-6 h-24 flex items-center">
          <Link href="/welcome" className="flex items-center justify-center gap-2">
            <Shapes className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">clsPMT™</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/user/login" className="text-sm font-medium hover:underline underline-offset-4">
              User Login
            </Link>
            <Link href="/admin/login" className="text-sm font-medium hover:underline underline-offset-4">
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="w-full flex justify-center mt-12 mb-12 m-0 p-0">
        <Image
          src="/images/topp.png"
          alt="Small Banner"
          width={250}
          height={50}
          className="object-contain block m-0 p-0"
        />
      </div>

      <main className="flex-1">
        <section className="w-full py-2 md:py-2 lg:py-2" ref={heroRef}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="relative text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow <br /> with{' '}
                    <span className="bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
                      clsPMT™
                    </span>
                  </h1>

                  <p className="max-w-[700px] text-muted-foreground mt-2 md:text-xl mx-auto">
                    The ultimate project management tool designed for elite teams. Manage tasks, projects, and collaboration seamlessly in one powerful, secure platform.
                  </p>
                </div>

                <div className="w-full max-w-6xl mx-auto pt-6">
                  {/* Dark box wrapper */}
                  <div className="bg-[#121212] mb-24 border border-[#262626] rounded-xl px-4">
                    <Image
                      src="/images/homeee.png"
                      width="1200"
                      height="600"
                      alt="Hero Image"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-contain"
                      data-ai-hint="dashboard analytics"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20" ref={featuresRef}>
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
              <div className="grid gap-2 text-center feature-card">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Task Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize, assign, and track tasks with our intuitive Kanban boards and detailed task views.
                </p>
              </div>
              <div className="grid gap-2 text-center feature-card">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Secure Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Invitation-only access ensures that only authorized personnel from approved domains can join your workspace.
                </p>
              </div>
              <div className="grid gap-2 text-center feature-card">
                <BarChart2 className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Project Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Gain insights into your team's productivity and project progress with our comprehensive dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32" ref={howItWorksRef}>
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/images/invite.svg"
                width="600"
                height="400"
                alt="Collaboration"
                className="mx-auto bg-white aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full how-item"
                data-ai-hint="team collaboration"
              />
              <div className="flex flex-col justify-center space-y-4 how-item">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How to Join</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Invitation-Only Access</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    clsPMT™ operates on a secure, invitation-only basis to protect your team's sensitive project data. Access is granted exclusively through administrator-sent invitations to approved company email domains.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-3 how-item">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold">Receive Your Invitation</h3>
                      <p className="text-muted-foreground text-sm">An administrator from your organization will send an invitation link to your corporate email address.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 how-item">
                    <KeyRound className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-semibold">Create Your Account</h3>
                      <p className="text-muted-foreground text-sm">Click the unique link in your email. You'll be directed to a secure page to set your password and activate your account.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 how-item">
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
