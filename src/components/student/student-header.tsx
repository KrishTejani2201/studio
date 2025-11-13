import type { Student } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Percent, CheckCircle } from 'lucide-react';

type StudentHeaderProps = {
  student: Student;
};

export function StudentHeader({ student }: StudentHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback className="text-2xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold font-headline">{student.name}</h1>
                <p className="text-muted-foreground">Student ID: {student.id}</p>
            </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 w-full md:w-auto md:ml-auto">
            <Card className="flex-1">
                <CardHeader className="pb-2 flex-row items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">Grade</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.grade}</div>
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardHeader className="pb-2 flex-row items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.attendance}%</div>
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardHeader className="pb-2 flex-row items-center gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{student.averageScore}</div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
