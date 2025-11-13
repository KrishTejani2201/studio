'use client';

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { generateParentFeedbackAction } from '@/lib/actions';
import type { Student } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type FeedbackFormInputs = {
  tone: 'positive' | 'neutral' | 'constructive';
  strengths: string;
  areasForImprovement: string;
};

type FeedbackGeneratorProps = {
  student: Student;
};

export function FeedbackGenerator({ student }: FeedbackGeneratorProps) {
  const [generatedFeedback, setGeneratedFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, watch, setValue } = useForm<FeedbackFormInputs>({
    defaultValues: {
      tone: 'constructive',
      strengths: 'Shows potential in creative tasks.',
      areasForImprovement: 'Needs to focus on assignment submission deadlines.',
    },
  });
  const selectedTone = watch('tone');

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    setIsLoading(true);
    setGeneratedFeedback('');

    const input = {
      studentName: student.name,
      subject: 'Overall Performance',
      performanceSummary: `Average score of ${student.averageScore} and attendance of ${student.attendance}%.`,
      strengths: data.strengths,
      areasForImprovement: data.areasForImprovement,
      teacherName: 'Ms. Davison', // Placeholder
      tone: data.tone,
    };

    const result = await generateParentFeedbackAction(input);

    if (result.success && result.data?.feedback) {
      setGeneratedFeedback(result.data.feedback);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not generate feedback.',
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Parent Feedback Generator</CardTitle>
        <CardDescription>
          Generate a starting point for parent communication based on student data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Textarea
                    id="strengths"
                    {...register('strengths')}
                    placeholder="e.g., Excellent participation in class discussions."
                    rows={3}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
                <Textarea
                    id="areasForImprovement"
                    {...register('areasForImprovement')}
                    placeholder="e.g., Submitting homework on time."
                    rows={3}
                />
            </div>
          </div>

          <div>
            <Label htmlFor="tone-select">Select Feedback Tone</Label>
            <Select
              onValueChange={(value: 'positive' | 'neutral' | 'constructive') => setValue('tone', value)}
              defaultValue={selectedTone}
            >
              <SelectTrigger id="tone-select" className="w-full md:w-[180px]">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="constructive">Constructive</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Feedback
          </Button>
        </form>

        {(isLoading || generatedFeedback) && (
          <div className="space-y-2 pt-4">
            <Label htmlFor="feedback-output">Generated Feedback (Editable)</Label>
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-4 w-4/6 animate-pulse rounded-md bg-muted"></div>
                </div>
            ) : (
                <Textarea
                    id="feedback-output"
                    value={generatedFeedback}
                    onChange={(e) => setGeneratedFeedback(e.target.value)}
                    rows={8}
                    className="bg-background"
                />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
