
'use server';

import { jobRiskAwareness as jobRiskAwarenessFlow } from '@/ai/flows/job-risk-awareness';
import type { JobRiskAwarenessInput, JobRiskAwarenessOutput } from '@/ai/flows/job-risk-awareness-types';

export async function jobRiskAwareness(input: JobRiskAwarenessInput): Promise<JobRiskAwarenessOutput> {
  return await jobRiskAwarenessFlow(input);
}
export type { JobRiskAwarenessOutput };
