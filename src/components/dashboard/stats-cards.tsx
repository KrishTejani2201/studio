import { Users, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Student } from '@/lib/types';

type StatsCardsProps = {
  students: Student[];
};

export function StatsCards({ students }: StatsCardsProps) {
  const totalStudents = students.length;
  const highRiskStudents = students.filter(
    (s) => s.riskPrediction.level === 'High'
  ).length;
  const averageAttendance =
    students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents;
  const averageScore =
    students.reduce((acc, s) => acc + s.averageScore, 0) / totalStudents;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Risk Students</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highRiskStudents}</div>
          <p className="text-xs text-muted-foreground">
            {highRiskStudents > 0 ? `${((highRiskStudents / totalStudents) * 100).toFixed(0)}% of class` : 'None'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageAttendance.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">+1.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">-0.5 points from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
