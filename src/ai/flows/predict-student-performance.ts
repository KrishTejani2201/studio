'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting student academic performance and risk level.
 * It takes various student metrics as input and returns a risk assessment.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const PredictStudentPerformanceInputSchema = z.object({
  currentGrade: z.number().describe('The student\'s current overall grade percentage (0-100).'),
  attendancePercentage: z.number().describe('The student\'s attendance rate as a percentage (0-100).'),
  homeworkCompletionRate: z.number().describe('The rate at which the student completes homework, as a percentage (0-100).'),
  classParticipation: z.enum(['High', 'Medium', 'Low']).describe('The observed level of class participation.'),
  recentTestScore: z.number().describe('The score on the most recent test or major assessment (0-100).'),
});
export type PredictStudentPerformanceInput = z.infer<typeof PredictStudentPerformanceInputSchema>;

export const PredictStudentPerformanceOutputSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The predicted academic risk level for the student.'),
  confidenceScore: z.number().min(0).max(1).describe('A confidence score (0.0 to 1.0) for the prediction, where a higher score indicates a higher risk probability.'),
  predictionReasoning: z.string().describe('A brief, one-sentence explanation for the prediction, highlighting the most influential factors.'),
});
export type PredictStudentPerformanceOutput = z.infer<typeof PredictStudentPerformanceOutputSchema>;

export async function predictStudentPerformance(input: PredictStudentPerformanceInput): Promise<PredictStudentPerformanceOutput> {
  return predictStudentPerformanceFlow(input);
}

const predictPerformancePrompt = ai.definePrompt({
  name: 'predictStudentPerformancePrompt',
  input: { schema: PredictStudentPerformanceInputSchema },
  output: { schema: PredictStudentPerformanceOutputSchema },
  prompt: `You are an expert AI educational analyst. Your task is to predict a student's academic risk level based on the following data.

Student Data:
- Current Overall Grade: {{currentGrade}}%
- Attendance: {{attendancePercentage}}%
- Homework Completion Rate: {{homeworkCompletionRate}}%
- Class Participation: {{classParticipation}}
- Most Recent Test Score: {{recentTestScore}}%

Analyze these factors to determine if the student is at Low, Medium, or High risk of academic failure.

- **High Risk:** Typically associated with very low scores (below 65), poor attendance (below 80%), and low homework completion.
- **Medium Risk:** May have inconsistent scores, attendance around 80-90%, or dropping performance.
- **Low Risk:** Consistently high scores (above 85%), excellent attendance, and high engagement.

Provide a \`riskLevel\`, a \`confidenceScore\` representing the probability of failure (e.g., High risk with 75% attendance might be a 0.65 score), and a brief \`predictionReasoning\`.`,
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
