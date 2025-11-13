import { students } from '@/lib/data';
import { StudentsTable } from '@/components/dashboard/students-table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">All Students</CardTitle>
            <CardDescription>View and manage all students in your records.</CardDescription>
        </CardHeader>
        <CardContent>
            <StudentsTable students={students} />
        </CardContent>
      </Card>
    </div>
  );
}
