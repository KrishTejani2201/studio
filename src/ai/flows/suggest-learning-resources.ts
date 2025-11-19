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
  topic: z.string().describe('The academic topic for which learning resources are needed (e.g., "Algebraic Equations", "The Water Cycle").'),
  gradeLevel: z.string().describe('The student\'s grade level (e.g., "5", "10").'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The desired difficulty level of the resources.'),
});
export type SuggestLearningResourcesInput = z.infer<
  typeof SuggestLearningResourcesInputSchema
>;

const SuggestLearningResourcesOutputSchema = z.object({
  resourceRecommendations: z
    .array(z.string())
    .describe('A list of 3-5 recommended learning resource titles. These can be names of videos, articles, or interactive exercises.'),
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
  prompt: `You are an expert AI curriculum developer. Your task is to recommend relevant and effective learning resources.

  Based on the following criteria, please generate a list of 3-5 resource titles:
  - Topic: {{topic}}
  - Grade Level: {{gradeLevel}}
  - Difficulty: {{difficulty}}

  Suggest a mix of resource types if possible (e.g., a video title, an article title, an online quiz name).`,
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
