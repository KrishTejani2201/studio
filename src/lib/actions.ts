'use server';

import { generateParentFeedback } from '@/ai/flows/generate-parent-feedback';
import type { GenerateParentFeedbackInput } from '@/ai/flows/generate-parent-feedback';
import { suggestLearningResources } from '@/ai/flows/suggest-learning-resources';
import type { SuggestLearningResourcesInput } from '@/ai/flows/suggest-learning-resources';
import { predictStudentPerformance } from '@/ai/flows/predict-student-performance';
import type { PredictStudentPerformanceInput } from '@/ai/flows/predict-student-performance';

export async function generateParentFeedbackAction(
  input: GenerateParentFeedbackInput
) {
  try {
    const result = await generateParentFeedback(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate feedback.' };
  }
}

export async function suggestLearningResourcesAction(
  input: SuggestLearningResourcesInput
) {
  try {
    const result = await suggestLearningResources(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to suggest resources.' };
  }
}

export async function predictStudentPerformanceAction(
  input: PredictStudentPerformanceInput
) {
  try {
    const result = await predictStudentPerformance(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to predict performance.' };
  }
}
