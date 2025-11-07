'use server';

/**
 * @fileOverview AI-driven policy recommendations based on skill gap analysis.
 *
 * - analyzeSkillGaps - Analyzes skill gaps and suggests policy recommendations.
 * - SkillGapInput - The input type for the analyzeSkillGaps function.
 * - SkillGapOutput - The return type for the analyzeSkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapInputSchema = z.object({
  sector: z.string().describe('The sector to analyze (e.g., technology, healthcare).'),
  region: z.string().describe('The region to analyze (e.g., California, Bavaria).'),
  proficiencyLevel: z
    .string()
    .describe('The proficiency level to analyze (e.g., entry-level, mid-level, expert).'),
  specificConsiderations: z
    .string()
    .optional()
    .describe('Any specific considerations to take into account.'),
});


const SkillGapOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the skill gap analysis.'),
  policyRecommendations: z.array(
    z.string().describe('Specific policy recommendations to address the skill gaps.')
  ),
});


export async function analyzeSkillGaps(input) {
  return analyzeSkillGapsFlow(input);
}

const skillGapPrompt = ai.definePrompt({
  name: 'skillGapPrompt',
  input: {schema: SkillGapInputSchema},
  output: {schema: SkillGapOutputSchema},
  prompt: `You are an AI-powered policy recommendation engine. Analyze skill gaps in the following context and provide policy recommendations.

Sector: {{{sector}}}
Region: {{{region}}}
Proficiency Level: {{{proficiencyLevel}}}
Specific Considerations: {{{specificConsiderations}}}

Based on this analysis, what policy recommendations can you suggest to address the skill gaps? Be specific, and provide actionable steps, such as funding new training centers, employer subsidies, or curriculum adjustments.

Format your response as a JSON array of strings.

Example:
{
  "analysisSummary": "Analysis of skill gaps in the technology sector in California at the mid-level proficiency indicates a shortage of skilled software engineers.",
  "policyRecommendations": [
    "Increase funding for software engineering training programs at community colleges in California.",
    "Offer tax credits to employers who hire and train mid-level software engineers.",
    "Develop a statewide curriculum for software engineering that aligns with industry needs.",
  ],
}
`,
});

const analyzeSkillGapsFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapsFlow',
    inputSchema: SkillGapInputSchema,
    outputSchema: SkillGapOutputSchema,
  },
  async input => {
    const {output} = await skillGapPrompt(input);
    return output;
  }
);
