'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useMemo } from 'react';

type RiskDistributionChartProps = {
  students: Student[];
};

export function RiskDistributionChart({ students }: RiskDistributionChartProps) {
  const riskData = useMemo(() => {
    const data = [
        { name: 'Low Risk', count: 0, fill: 'var(--chart-1)'},
        { name: 'Medium Risk', count: 0, fill: 'var(--chart-2)' },
        { name: 'High Risk', count: 0, fill: 'hsl(var(--destructive))' },
    ];

    students.forEach((student) => {
        if (student.riskPrediction.level === 'Low') {
            data[0].count++;
        } else if (student.riskPrediction.level === 'Medium') {
            data[1].count++;
        } else {
            data[2].count++;
        }
    });
    return data;
  }, [students]);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Student Risk Distribution</CardTitle>
            <CardDescription>Number of students in each risk category.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskData}>
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                allowDecimals={false}
                />
                <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
