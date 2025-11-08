
'use server';

import { vaniAgent as vaniAgentFlow } from '@/ai/flows/vani-agent';
import type { VaniAgentInput, VaniAgentOutput } from '@/ai/flows/vani-agent-types';


export async function vaniAgent(input: VaniAgentInput): Promise<VaniAgentOutput> {
  return await vaniAgentFlow(input);
}
export type { VaniAgentInput, VaniAgentOutput };
