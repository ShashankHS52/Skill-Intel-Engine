'use server';

import { vaniAgent as vaniAgentFlow, type VaniAgentInput, type VaniAgentOutput } from '@/ai/flows/vani-agent';

export async function vaniAgent(input: VaniAgentInput): Promise<VaniAgentOutput> {
  return await vaniAgentFlow(input);
}
export type { VaniAgentInput, VaniAgentOutput };
