'use server';

/**
 * @fileOverview An AI agent that identifies sectors and skills at the highest risk of automation.
 *
 * - automationRiskAlert - A function that handles the automation risk analysis process.
 * - AutomationRiskAlertInput - The input type for the automationRiskAlert function.
 * - AutomationRiskAlertOutput - The return type for the automationRiskAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomationRiskAlertInputSchema = z.object({
  economicSector: z.string().describe('The specific economic sector to analyze.'),
  regionalFactors: z.string().optional().describe('Optional regional factors to consider.'),
  timeHorizon: z.string().describe('The time horizon for the analysis (e.g., short-term, long-term).'),
});
export type AutomationRiskAlertInput = z.infer<typeof AutomationRiskAlertInputSchema>;

const AutomationRiskAlertOutputSchema = z.object({
  sectorsAtRisk: z.array(z.string()).describe('Sectors identified as being at high risk of automation.'),
  skillsAtRisk: z.array(z.string()).describe('Skills identified as being at high risk of automation.'),
  affectedPopulationPercentage: z.number().describe('The estimated percentage of the population affected by automation in the specified sectors.'),
  mitigationStrategies: z.array(z.string()).describe('Recommended strategies to mitigate the risks of automation.'),
});
export type AutomationRiskAlertOutput = z.infer<typeof AutomationRiskAlertOutputSchema>;

export async function automationRiskAlert(input: AutomationRiskAlertInput): Promise<AutomationRiskAlertOutput> {
  return automationRiskAlertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automationRiskAlertPrompt',
  input: {schema: AutomationRiskAlertInputSchema},
  output: {schema: AutomationRiskAlertOutputSchema},
  prompt: `You are an AI expert in labor economics, specializing in predicting the impact of automation on various economic sectors. Based on the provided economic sector, regional factors, and time horizon, identify sectors and skills at the highest risk of automation, including the percentage of the affected population. Also, suggest strategies to mitigate these risks.

Economic Sector: {{{economicSector}}}
Regional Factors: {{{regionalFactors}}}
Time Horizon: {{{timeHorizon}}}

Consider factors like current technological trends, adoption rates of automation technologies, and the nature of tasks performed in the sector.

Output the data in JSON format.
`,
});

const automationRiskAlertFlow = ai.defineFlow(
  {
    name: 'automationRiskAlertFlow',
    inputSchema: AutomationRiskAlertInputSchema,
    outputSchema: AutomationRiskAlertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
