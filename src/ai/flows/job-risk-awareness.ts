
'use server';
/**
 * @fileOverview An AI agent that identifies at-risk job sectors and provides mitigation strategies.
 *
 * - jobRiskAwareness - A function that handles the job risk analysis process.
 * - JobRiskAwarenessInput - The input type for the jobRiskAwareness function.
 * - JobRiskAwarenessOutput - The return type for the jobRiskAwareness function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const JobRiskAwarenessInputSchema = z.object({
  sector: z.string().describe('The economic sector to analyze (e.g., Manufacturing, Retail).'),
  timeHorizon: z.string().describe('The time horizon for the analysis (e.g., short-term, long-term).'),
});
export type JobRiskAwarenessInput = z.infer<typeof JobRiskAwarenessInputSchema>;

export const JobRiskAwarenessOutputSchema = z.object({
  riskSummary: z.string().describe('A brief summary of the risks facing the specified job sector.'),
  atRiskJobs: z.array(z.string()).describe('A list of specific job roles within the sector that are at high risk.'),
  mitigationStrategies: z.array(z.string()).describe('Actionable strategies for individuals and policymakers to mitigate the identified risks.'),
});
export type JobRiskAwarenessOutput = z.infer<typeof JobRiskAwarenessOutputSchema>;

export async function jobRiskAwareness(input: JobRiskAwarenessInput): Promise<JobRiskAwarenessOutput> {
  return jobRiskAwarenessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobRiskAwarenessPrompt',
  input: { schema: JobRiskAwarenessInputSchema },
  output: { schema: JobRiskAwarenessOutputSchema },
  prompt: `You are an expert labor market analyst. Your task is to identify job roles at risk within a specific economic sector and provide actionable mitigation strategies.

Analyze the following sector over the given time horizon:

Economic Sector: {{{sector}}}
Time Horizon: {{{timeHorizon}}}

Based on your analysis, provide the following:
1.  **Risk Summary**: A brief, concise summary of the key risks (e.g., automation, outsourcing, economic shifts) facing this sector.
2.  **At-Risk Job Roles**: A list of specific job roles that are most vulnerable to disruption.
3.  **Mitigation Strategies**: A list of actionable strategies for both individuals (e.g., upskilling, career pivots) and policymakers (e.g., training programs, economic diversification) to address these risks.

Output the data in the specified JSON format.
`,
});

const jobRiskAwarenessFlow = ai.defineFlow(
  {
    name: 'jobRiskAwarenessFlow',
    inputSchema: JobRiskAwarenessInputSchema,
    outputSchema: JobRiskAwarenessOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
