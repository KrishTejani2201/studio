'use client';

import { useState } from 'react';
import { BookOpenCheck, ArrowRight, User, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function TeacherLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTeacherLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleTeacherLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@school.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Log In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="link" size="sm" className="text-muted-foreground">
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const handleStudentLogin = () => {
    router.push('/student-dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpenCheck className="h-8 w-8" />
          </Link>
          <h1 className="font-headline text-4xl font-bold text-foreground">
            EduInsights Pro
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-powered analytics for modern educators.
          </p>
        </div>
        <Tabs defaultValue="teacher" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teacher">
              <User className="mr-2 h-4 w-4" />
              Teacher
            </TabsTrigger>
            <TabsTrigger value="student">
              <GraduationCap className="mr-2 h-4 w-4" />
              Student / Parent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teacher">
            <TeacherLoginForm />
          </TabsContent>
          <TabsContent value="student">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Student & Parent Portal</CardTitle>
                    <CardDescription>
                    View your progress, feedback, and learning resources.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-center text-muted-foreground">
                        This is a guest view for demonstration purposes. In a real application, you would log in with your student credentials.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleStudentLogin} className="w-full">
                        Sign in as Guest Student
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
