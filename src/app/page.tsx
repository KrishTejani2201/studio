
import { Button } from '@/components/ui/button';
import { BookOpenCheck, BarChart, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span>EduInsights Pro</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:px-6 md:py-32">
          <div className="mb-4 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Unlock AI-Powered Educational Analytics
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Student Data into Actionable Insights
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            EduInsights Pro leverages artificial intelligence to help educators identify at-risk students, personalize learning, and improve outcomes.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">View Demo Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="w-full bg-muted/40 py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose EduInsights Pro?</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Our platform is designed to be intuitive, powerful, and seamlessly integrate into your existing workflow.
                    </p>
                </div>
                <ul className="grid gap-6">
                    <li>
                        <div className="grid gap-1">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <Zap className="h-5 w-5 text-primary" />
                                AI-Powered Risk Prediction
                            </h3>
                            <p className="text-muted-foreground">
                                Identify students who are at risk of falling behind before it's too late with our predictive analytics model.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="grid gap-1">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <BarChart className="h-5 w-5 text-primary" />
                                Comprehensive Dashboards
                            </h3>
                            <p className="text-muted-foreground">
                                Visualize student performance, attendance, and engagement data in one centralized, easy-to-understand view.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="grid gap-1">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <Users className="h-5 w-5 text-primary" />
                                Personalized Feedback & Resources
                            </h3>
                            <p className="text-muted-foreground">
                                Generate AI-driven feedback for parents and get recommendations for tailored learning resources.
                            </p>
                        </div>
                    </li>
                </ul>
              </div>
              <img
                src="https://picsum.photos/seed/dashboard/600/500"
                width="600"
                height="500"
                alt="Feature"
                data-ai-hint="dashboard analytics"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">&copy; 2024 EduInsights Pro. All rights reserved.</p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
