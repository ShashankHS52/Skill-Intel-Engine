'use server';

import { analyzeProject as analyzeProjectFlow } from '@/ai/flows/project-analyzer';

export async function analyzeProject(input) {
  return await analyzeProjectFlow(input);
}
