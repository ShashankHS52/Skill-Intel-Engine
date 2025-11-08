
'use server';

import { extractSkills as extractSkillsFlow } from '@/ai/flows/skill-extractor';
import type { SkillExtractorInput, SkillExtractorOutput } from '@/ai/flows/skill-extractor-types';

export async function extractSkills(input: SkillExtractorInput): Promise<SkillExtractorOutput> {
  return await extractSkillsFlow(input);
}
export type { SkillExtractorOutput };
