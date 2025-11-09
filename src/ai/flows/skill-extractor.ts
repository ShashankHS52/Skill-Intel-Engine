
'use server';
/**
 * @fileOverview An AI agent that extracts standardized skills from a free-text job description.
 *
 * - extractSkills - A function that handles the skill extraction process.
 * - SkillExtractorInput - The input type for the extractSkills function.
 * - SkillExtractorOutput - The return type for the extractSkills function.
 */

import { ai } from '@/ai/genkit';
import {
  SkillExtractorInputSchema,
  SkillExtractorOutputSchema,
  type SkillExtractorInput,
  type SkillExtractorOutput
} from './skill-extractor-types';

export async function extractSkills(input: SkillExtractorInput): Promise<SkillExtractorOutput> {
  return skillExtractorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillExtractorPrompt',
  input: { schema: SkillExtractorInputSchema },
  output: { schema: SkillExtractorOutputSchema },
  prompt: `You are an expert in job analysis and skill taxonomy, specifically for the Indian workforce. Your task is to analyze a free-text job description and map it to a list of standardized, concrete skills.

Analyze the following job description:

"{{{jobDescription}}}"

Based on the description, identify a list of 5-10 specific, standardized skills. These skills should be relevant to the Indian National Occupational Standards (NOS) or Qualification Packs (QP) if possible. Avoid vague terms.

For example, if the user says "I fix tractors," you should suggest skills like "Diesel Engine Troubleshooting," "Hydraulic System Repair," and "Agricultural Equipment Maintenance." If they say "I sew clothes for weddings," suggest "Bespoke Garment Drafting," "Bridal Wear Stitching," and "Fabric Embellishment."

Output the data in the specified JSON format.
`,
});

const skillExtractorFlow = ai.defineFlow(
  {
    name: 'skillExtractorFlow',
    inputSchema: SkillExtractorInputSchema,
    outputSchema: SkillExtractorOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
