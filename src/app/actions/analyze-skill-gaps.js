'use server';

import { analyzeSkillGaps as analyzeSkillGapsFlow } from '@/ai/flows/skill-gap-analyzer';

export async function analyzeSkillGaps(input) {
  return await analyzeSkillGapsFlow(input);
}
