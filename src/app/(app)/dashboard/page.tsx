'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { StudentsTable } from '@/components/dashboard/students-table';
import { RiskDistributionChart } from '@/components/dashboard/risk-distribution-chart';
import { useStudents } from '@/contexts/StudentContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { students, isLoading } = useStudents();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="font-headline text-3xl font-bold">Teacher Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[400px]" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Skeleton className="h-[350px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Teacher Dashboard</h1>
      <StatsCards students={students} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StudentsTable students={students} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <RiskDistributionChart students={students} />
        </div>
      </div>
    </div>
  );
}
