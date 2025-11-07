'use server';

/**
 * @fileOverview This file contains the Genkit flow for simulating the impact of economic changes on skill demands.
 *
 * - `simulateEconomicImpact`: Simulates the impact of economic changes on skill demand.
 * - `ScenarioTestingInput`: The input type for the simulateEconomicImpact function.
 * - `ScenarioTestingOutput`: The return type for the simulateEconomicImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScenarioTestingInputSchema = z.object({
  factoryLocation: z.string().describe('The location of the new factory.'),
  laborTypesRequired: z.string().describe('The types of labor required by the factory.'),
  additionalContext: z.string().optional().describe('Any additional context or considerations.'),
});



const ScenarioTestingOutputSchema = z.object({
  projectedSkillDemandChanges: z.string().describe('The projected changes in skill demand as a result of the economic change.'),
  policyRecommendations: z.string().describe('Policy recommendations for addressing the projected skill demand changes.'),
});




export async function simulateEconomicImpact(input) {
  return scenarioTestingFlow(input);
}

const scenarioTestingPrompt = ai.definePrompt({
  name: 'scenarioTestingPrompt',
  input: {schema: ScenarioTestingInputSchema},
  output: {schema: ScenarioTestingOutputSchema},
  prompt: `You are an expert economic policy advisor. Given the following information about a new economic development, project the impact on skill demand and provide policy recommendations.

Factory Location: {{{factoryLocation}}}
Labor Types Required: {{{laborTypesRequired}}}
Additional Context: {{{additionalContext}}}

Projected Skill Demand Changes:
Policy Recommendations: `,
});

const scenarioTestingFlow = ai.defineFlow(
  {
    name: 'scenarioTestingFlow',
    inputSchema: ScenarioTestingInputSchema,
    outputSchema: ScenarioTestingOutputSchema,
  },
  async input => {
    const {output} = await scenarioTestingPrompt(input);
    return output;
  }
);
