'use client';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { RiskPrediction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type RiskAnalysisProps = {
  prediction: RiskPrediction;
};

const riskLevelVariant = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

export function RiskAnalysis({ prediction }: RiskAnalysisProps) {
  const chartData = prediction.contributingFactors
    .map((factor) => ({
      name: factor.feature,
      value: factor.impact,
      fill: factor.impact > 0 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
    }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Risk of Failure</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
          <div
            className={cn(
              'flex h-32 w-32 items-center justify-center rounded-full border-8',
              {
                'border-primary': prediction.level === 'Low',
                'border-accent': prediction.level === 'Medium',
                'border-destructive': prediction.level === 'High',
              }
            )}
          >
            <span className="text-4xl font-bold">
              {(prediction.probability * 100).toFixed(0)}%
            </span>
          </div>
          <Badge variant={riskLevelVariant[prediction.level]} className="text-lg px-4 py-1">
            {prediction.level} Risk
          </Badge>
          <p className="text-muted-foreground text-sm">
            Based on current academic and behavioral data.
          </p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Contributing Factors</CardTitle>
          <CardDescription>
            Features with the highest impact on risk prediction (SHAP values).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
               <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value: number) => [value.toFixed(2), "Impact"]}
                />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
