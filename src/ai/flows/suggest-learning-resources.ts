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

const ResourceSchema = z.object({
  title: z.string().describe('The title of the learning resource.'),
  description: z.string().describe('A brief, one-sentence description of the resource.'),
  url: z.string().url().describe('A direct, publicly accessible URL to the resource.'),
});

const SuggestLearningResourcesOutputSchema = z.object({
  resourceRecommendations: z
    .array(ResourceSchema)
    .describe('A list of 3-5 recommended learning resources.'),
});
export type SuggestLearningResourcesOutput = z.infer<
  typeof SuggestLearningResourcesOutputSchema
>;
// To be used in the component
export type LearningResource = z.infer<typeof ResourceSchema>;


export async function suggestLearningResources(
  input: SuggestLearningResourcesInput
): Promise<SuggestLearningResourcesOutput> {
  return suggestLearningResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningResourcesPrompt',
  input: {schema: SuggestLearningResourcesInputSchema},
  output: {schema: SuggestLearningResourcesOutputSchema},
  prompt: `You are an expert AI curriculum developer. Your task is to recommend relevant and effective learning resources with valid, publicly accessible URLs.

  Based on the following criteria, please generate a list of 3-5 resources. For each resource, provide a title, a short description, and a direct URL.
  - Topic: {{topic}}
  - Grade Level: {{gradeLevel}}
  - Difficulty: {{difficulty}}

  Suggest a mix of resource types if possible (e.g., a video, an article, an online quiz). Prioritize well-known sources like Khan Academy, YouTube, educational blogs, etc.`,
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
