
'use server';
/**
 * @fileOverview An AI agent that identifies at-risk job sectors and provides mitigation strategies.
 *
 * - jobRiskAwareness - A function that handles the job risk analysis process.
 * - JobRiskAwarenessInput - The input type for the jobRiskAwareness function.
 * - JobRiskAwarenessOutput - The return type for the jobRiskAwareness function.
 */

import { ai } from '@/ai/genkit';
import {
  JobRiskAwarenessInputSchema,
  JobRiskAwarenessOutputSchema,
  type JobRiskAwarenessInput,
  type JobRiskAwarenessOutput,
} from './job-risk-awareness-types';

export async function jobRiskAwareness(input: JobRiskAwarenessInput): Promise<JobRiskAwarenessOutput> {
  try {
    return await jobRiskAwarenessFlow(input);
  } catch (error) {
    console.error('Error in job risk awareness flow:', error);
    // Return a fallback response if AI fails
    return {
      riskSummary: `Analysis for ${input.sector} sector over ${input.timeHorizon.toLowerCase()} period shows potential risks from automation and economic shifts. However, detailed analysis could not be completed at this time.`,
      atRiskJobs: [
        'Entry-level positions',
        'Routine manual tasks',
        'Data entry roles'
      ],
      mitigationStrategies: [
        'Invest in continuous learning and upskilling programs',
        'Focus on developing human-centric skills like creativity and emotional intelligence',
        'Consider career pivoting to emerging technology roles',
        'Engage in professional networking and community building'
      ]
    };
  }
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
