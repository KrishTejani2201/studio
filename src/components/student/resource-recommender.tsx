'use client';

import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { suggestLearningResourcesAction } from '@/lib/actions';
import type { Student } from '@/lib/types';
import type { LearningResource } from '@/ai/flows/suggest-learning-resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

type ResourceFormInputs = {
  topic: string;
};

type ResourceRecommenderProps = {
  student: Student;
};

export function ResourceRecommender({ student }: ResourceRecommenderProps) {
  const [recommendations, setRecommendations] = useState<LearningResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit } = useForm<ResourceFormInputs>();

  const onSubmit: SubmitHandler<ResourceFormInputs> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);

    const input = {
      topic: data.topic,
      gradeLevel: student.grade.toString(),
      difficulty: 'Intermediate', // Placeholder
    };

    const result = await suggestLearningResourcesAction(input);

    if (result.success && result.data?.resourceRecommendations) {
      setRecommendations(result.data.resourceRecommendations);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not find resources.',
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Resource Recommender</CardTitle>
        <CardDescription>
          Find relevant learning materials for this student.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Fractions, Photosynthesis"
              {...register('topic', { required: true })}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Find Resources
          </Button>
        </form>

        {(isLoading || recommendations.length > 0) && (
          <div className="space-y-2 pt-4">
            <h4 className="font-medium">Recommended Resources:</h4>
            {isLoading ? (
                <div className="space-y-3">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                   ))}
                </div>
            ) : (
                <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex-1 pr-4">
                            <p className="font-medium">{rec.title}</p>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                            <Link href={rec.url} target="_blank" rel="noopener noreferrer">View</Link>
                        </Button>
                    </li>
                ))}
                </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
