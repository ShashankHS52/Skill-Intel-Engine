
'use server';

import { jobRiskAwareness as jobRiskAwarenessFlow, type JobRiskAwarenessInput, type JobRiskAwarenessOutput } from '@/ai/flows/job-risk-awareness';

export async function jobRiskAwareness(input: JobRiskAwarenessInput): Promise<JobRiskAwarenessOutput> {
  return await jobRiskAwarenessFlow(input);
}
export type { JobRiskAwarenessOutput };
