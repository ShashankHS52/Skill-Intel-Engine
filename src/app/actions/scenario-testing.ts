'use server';

import { simulateEconomicImpact as simulateEconomicImpactFlow, type ScenarioTestingInput } from '@/ai/flows/scenario-testing';

export async function simulateEconomicImpact(input: ScenarioTestingInput) {
  return await simulateEconomicImpactFlow(input);
}
