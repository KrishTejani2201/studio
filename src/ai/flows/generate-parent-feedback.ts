'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized parent feedback based on student performance data.
 *
 * The flow takes student data as input and uses an LLM to generate feedback. The feedback is tailored to the student's specific needs and achievements.
 *
 * @param {GenerateParentFeedbackInput} input - The input data for generating parent feedback.
 * @returns {Promise<GenerateParentFeedbackOutput>} - A promise that resolves with the generated parent feedback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateParentFeedbackInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  subject: z.string().describe('The subject for which feedback is being generated.'),
  performanceSummary: z
    .string()
    .describe('A summary of the student’s performance in the subject.'),
  strengths: z.string().describe('Specific strengths the student has demonstrated.'),
  areasForImprovement: z
    .string()
    .describe('Areas where the student could improve.'),
  teacherName: z.string().describe('The name of the teacher providing feedback.'),
  tone: z
    .enum(['positive', 'neutral', 'constructive'])
    .describe('The desired tone of the feedback.'),
});

export type GenerateParentFeedbackInput = z.infer<
  typeof GenerateParentFeedbackInputSchema
>;

const GenerateParentFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The generated parent feedback text.'),
});

export type GenerateParentFeedbackOutput = z.infer<
  typeof GenerateParentFeedbackOutputSchema
>;

export async function generateParentFeedback(
  input: GenerateParentFeedbackInput
): Promise<GenerateParentFeedbackOutput> {
  return generateParentFeedbackFlow(input);
}

const generateParentFeedbackPrompt = ai.definePrompt({
  name: 'generateParentFeedbackPrompt',
  input: {schema: GenerateParentFeedbackInputSchema},
  output: {schema: GenerateParentFeedbackOutputSchema},
  prompt: `You are an experienced teacher named {{teacherName}}. Your task is to write a personalized feedback message for a parent about their child, {{studentName}}. The feedback should be for the subject: {{subject}}.

Use a {{tone}} tone for the message.

Incorporate the following details into the feedback:
- Performance Summary: {{performanceSummary}}
- Key Strengths: {{strengths}}
- Areas for Improvement: {{areasForImprovement}}

Write a clear, concise, and helpful message. Address the parent directly.`,
});

const generateParentFeedbackFlow = ai.defineFlow(
  {
    name: 'generateParentFeedbackFlow',
    inputSchema: GenerateParentFeedbackInputSchema,
    outputSchema: GenerateParentFeedbackOutputSchema,
  },
  async input => {
    const {output} = await generateParentFeedbackPrompt(input);
    return output!;
  }
);
