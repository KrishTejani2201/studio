import { students } from '@/lib/data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { StudentsTable } from '@/components/dashboard/students-table';
import { RiskDistributionChart } from '@/components/dashboard/risk-distribution-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards students={students} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StudentsTable students={students} />
        </div>
        <div className="lg:col-span-1">
          <RiskDistributionChart students={students} />
        </div>
      </div>
    </div>
  );
}
