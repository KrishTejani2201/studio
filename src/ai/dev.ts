import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-learning-resources.ts';
import '@/ai/flows/generate-parent-feedback.ts';
import '@/ai/flows/predict-student-performance.ts';
