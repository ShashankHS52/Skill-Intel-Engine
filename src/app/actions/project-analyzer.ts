'use server';

import { analyzeProject as analyzeProjectFlow, type ProjectAnalyzerInput } from '@/ai/flows/project-analyzer';

export async function analyzeProject(input: ProjectAnalyzerInput) {
  return await analyzeProjectFlow(input);
}
