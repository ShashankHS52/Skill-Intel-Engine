'use server';

import { analyzeSkillGaps as analyzeSkillGapsFlow, type SkillGapInput } from '@/ai/flows/skill-gap-analyzer';

export async function analyzeSkillGaps(input: SkillGapInput) {
  return await analyzeSkillGapsFlow(input);
}
