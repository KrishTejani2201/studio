import { Lightbulb } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PerformanceForecasting() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-accent" />
          <CardTitle>How Forecasting Works</CardTitle>
        </div>
        <CardDescription>
          An explanation of the student risk prediction model.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          Our AI-powered forecasting module analyzes various data points to
          predict the probability of a student facing academic challenges.
        </p>
        <p>
          It uses a machine learning model trained on historical student data,
          including attendance records, assignment scores, and past academic
          performance. The "Top Contributing Factors" shown for each student
          are the key indicators the model used to make its prediction, giving
          you actionable insights into where to focus your support.
        </p>
      </CardContent>
    </Card>
  );
}
