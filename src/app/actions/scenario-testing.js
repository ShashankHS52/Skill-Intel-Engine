'use server';

import { simulateEconomicImpact as simulateEconomicImpactFlow } from '@/ai/flows/scenario-testing';

export async function simulateEconomicImpact(input) {
  return await simulateEconomicImpactFlow(input);
}
