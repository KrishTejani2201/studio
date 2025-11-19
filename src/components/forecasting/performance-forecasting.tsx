'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Loader2, Sparkles } from 'lucide-react';

import { predictStudentPerformanceAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PredictStudentPerformanceOutput } from '@/ai/flows/predict-student-performance';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type ForecastFormInputs = {
  currentGrade: number;
  attendancePercentage: number;
  homeworkCompletionRate: number;
  classParticipation: 'High' | 'Medium' | 'Low';
  recentTestScore: number;
};

const riskLevelVariant = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

export function PerformanceForecasting() {
  const [prediction, setPrediction] = useState<PredictStudentPerformanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<ForecastFormInputs>();

  const onSubmit: SubmitHandler<ForecastFormInputs> = async (data) => {
    setIsLoading(true);
    setPrediction(null);

    const result = await predictStudentPerformanceAction(data);

    if (result.success && result.data) {
      setPrediction(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not generate prediction.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Forecast Student Performance</CardTitle>
          <CardDescription>
            Enter a student's data points to get an AI-powered performance forecast.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentGrade">Current Grade (1-100)</Label>
                <Input
                  id="currentGrade"
                  type="number"
                  {...register('currentGrade', { required: true, min: 0, max: 100, valueAsNumber: true })}
                />
                {errors.currentGrade && <p className="text-destructive text-xs">Please enter a grade between 0 and 100.</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendancePercentage">Attendance (%)</Label>
                <Input
                  id="attendancePercentage"
                  type="number"
                  {...register('attendancePercentage', { required: true, min: 0, max: 100, valueAsNumber: true })}
                />
                {errors.attendancePercentage && <p className="text-destructive text-xs">Please enter a percentage between 0 and 100.</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeworkCompletionRate">Homework Completion (%)</Label>
                <Input
                  id="homeworkCompletionRate"
                  type="number"
                  {...register('homeworkCompletionRate', { required: true, min: 0, max: 100, valueAsNumber: true })}
                />
                {errors.homeworkCompletionRate && <p className="text-destructive text-xs">Please enter a percentage between 0 and 100.</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="recentTestScore">Recent Test Score (1-100)</Label>
                <Input
                  id="recentTestScore"
                  type="number"
                  {...register('recentTestScore', { required: true, min: 0, max: 100, valueAsNumber: true })}
                />
                {errors.recentTestScore && <p className="text-destructive text-xs">Please enter a score between 0 and 100.</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class-participation">Class Participation</Label>
              <Controller
                name="classParticipation"
                control={control}
                rules={{ required: 'Please select a participation level.' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="class-participation">
                      <SelectValue placeholder="Select participation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.classParticipation && <p className="text-destructive text-xs">{errors.classParticipation.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Predict Performance
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Prediction Result</CardTitle>
          <CardDescription>The AI's forecast based on the data provided.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-muted-foreground">Analyzing data...</p>
            </div>
          )}
          {!isLoading && !prediction && (
            <div className="text-center text-muted-foreground">
              <p>Your prediction will appear here.</p>
            </div>
          )}
          {prediction && (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div
                className={cn(
                  'flex h-32 w-32 items-center justify-center rounded-full border-8',
                  {
                    'border-primary': prediction.riskLevel === 'Low',
                    'border-accent': prediction.riskLevel === 'Medium',
                    'border-destructive': prediction.riskLevel === 'High',
                  }
                )}
              >
                <span className="text-4xl font-bold">
                  {(prediction.confidenceScore * 100).toFixed(0)}%
                </span>
              </div>
              <Badge variant={riskLevelVariant[prediction.riskLevel]} className="text-lg px-4 py-1">
                {prediction.riskLevel} Risk
              </Badge>
              <p className="text-muted-foreground text-sm max-w-sm mt-2">
                {prediction.predictionReasoning}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
