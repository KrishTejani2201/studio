import { Users, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Student } from '@/lib/types';
import { useMemo } from 'react';

type StatsCardsProps = {
  students: Student[];
};

export function StatsCards({ students }: StatsCardsProps) {
  const { totalStudents, highRiskStudents, averageAttendance, averageScore } = useMemo(() => {
    const totalStudents = students.length;
    if (totalStudents === 0) {
      return { totalStudents: 0, highRiskStudents: 0, averageAttendance: 0, averageScore: 0 };
    }
    const highRiskStudents = students.filter(
      (s) => s.riskPrediction.level === 'High'
    ).length;
    const averageAttendance =
      students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents;
    const averageScore =
      students.reduce((acc, s) => acc + s.averageScore, 0) / totalStudents;
    
    return { totalStudents, highRiskStudents, averageAttendance, averageScore };
  }, [students]);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">Currently in roster</p>
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
            {totalStudents > 0 ? `${((highRiskStudents / totalStudents) * 100).toFixed(0)}% of class` : 'N/A'}
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
          <p className="text-xs text-muted-foreground">Class average</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Class average</p>
        </CardContent>
      </Card>
    </div>
  );
}
