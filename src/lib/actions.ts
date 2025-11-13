"use server";

import { generateParentFeedback } from "@/ai/flows/generate-parent-feedback";
import type { GenerateParentFeedbackInput } from "@/ai/flows/generate-parent-feedback";
import { suggestLearningResources } from "@/ai/flows/suggest-learning-resources";
import type { SuggestLearningResourcesInput } from "@/ai/flows/suggest-learning-resources";

export async function generateParentFeedbackAction(
  input: GenerateParentFeedbackInput
) {
  try {
    const result = await generateParentFeedback(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate feedback." };
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
    return { success: false, error: "Failed to suggest resources." };
  }
}
