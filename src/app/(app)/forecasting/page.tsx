import { PerformanceForecasting } from '@/components/forecasting/performance-forecasting';

export default function ForecastingPage() {
  return (
    <div className="space-y-6">
       <h1 className="font-headline text-3xl font-bold">Performance Forecasting</h1>
      <PerformanceForecasting />
    </div>
  );
}
