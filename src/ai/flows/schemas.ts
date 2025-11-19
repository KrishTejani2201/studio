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