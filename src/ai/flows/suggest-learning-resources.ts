'use server';

/**
 * @fileOverview A learning resource recommendation AI agent.
 *
 * - suggestLearningResources - A function that suggests learning resources based on semantic similarity.
 * - SuggestLearningResourcesInput - The input type for the suggestLearningResources function.
 * - SuggestLearningResourcesOutput - The return type for the suggestLearningResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningResourcesInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  topic: z.string().describe('The topic for which learning resources are needed.'),
  gradeLevel: z.string().describe('The grade level of the student.'),
  difficulty: z.string().describe('The difficulty level of the resources.'),
});
export type SuggestLearningResourcesInput = z.infer<
  typeof SuggestLearningResourcesInputSchema
>;

const SuggestLearningResourcesOutputSchema = z.object({
  resourceRecommendations: z
    .array(z.string())
    .describe('A list of recommended learning resources.'),
});
export type SuggestLearningResourcesOutput = z.infer<
  typeof SuggestLearningResourcesOutputSchema
>;

export async function suggestLearningResources(
  input: SuggestLearningResourcesInput
): Promise<SuggestLearningResourcesOutput> {
  return suggestLearningResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningResourcesPrompt',
  input: {schema: SuggestLearningResourcesInputSchema},
  output: {schema: SuggestLearningResourcesOutputSchema},
  prompt: `You are an AI learning resource recommender.

  Based on the student's ID: {{{studentId}}}, the topic: {{{topic}}}, the grade level: {{{gradeLevel}}}, and the difficulty: {{{difficulty}}}, recommend a list of relevant learning resources.
  Return a list of resource names that are appropriate for the provided input.
  `, // Ensure proper Handlebars syntax
});

const suggestLearningResourcesFlow = ai.defineFlow(
  {
    name: 'suggestLearningResourcesFlow',
    inputSchema: SuggestLearningResourcesInputSchema,
    outputSchema: SuggestLearningResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
