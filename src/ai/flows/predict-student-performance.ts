'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting student academic performance and risk level.
 * It takes various student metrics as input and returns a risk assessment.
 */

import { ai } from '@/ai/genkit';
import { 
  PredictStudentPerformanceInputSchema,
  PredictStudentPerformanceOutputSchema,
  type PredictStudentPerformanceInput,
  type PredictStudentPerformanceOutput
} from './schemas';

export type { PredictStudentPerformanceInput, PredictStudentPerformanceOutput };

export async function predictStudentPerformance(input: PredictStudentPerformanceInput): Promise<PredictStudentPerformanceOutput> {
  return predictStudentPerformanceFlow(input);
}

const predictPerformancePrompt = ai.definePrompt({
  name: 'predictStudentPerformancePrompt',
  input: { schema: PredictStudentPerformanceInputSchema },
  output: { schema: PredictStudentPerformanceOutputSchema },
  prompt: `You are an expert AI educational analyst. Your task is to predict a student's academic risk level (Low, Medium, or High) based on the following data.

Student Data:
- Current Overall Grade: {{currentGrade}}%
- Attendance: {{attendancePercentage}}%
- Homework Completion Rate: {{homeworkCompletionRate}}%
- Class Participation: {{classParticipation}}
- Most Recent Test Score: {{recentTestScore}}%

Analyze these factors to determine the student's risk of academic failure.

Provide a 'riskLevel', a 'confidenceScore' representing the probability of failure (where a higher score indicates higher risk), and a brief 'predictionReasoning' explaining your conclusion.`,
});

const predictStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'predictStudentPerformanceFlow',
    inputSchema: PredictStudentPerformanceInputSchema,
    outputSchema: PredictStudentPerformanceOutputSchema,
  },
  async (input) => {
    const { output } = await predictPerformancePrompt(input);
    return output!;
  }
);
