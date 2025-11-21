'use client';

import { StudentsTable } from '@/components/dashboard/students-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useStudents } from '@/contexts/StudentContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentsPage() {
  const { students, isLoading } = useStudents();

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">All Students</CardTitle>
            <CardDescription>View and manage all students in your records.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
              <Skeleton className="h-[400px]" />
            ) : (
              <StudentsTable students={students} />
            )}
        </CardContent>
      </Card>
    </div>
  );
}
