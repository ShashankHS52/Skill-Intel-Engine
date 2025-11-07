
'use server';

import { jobSectorPrediction as jobSectorPredictionFlow, type JobSectorPredictionInput, type JobSectorPredictionOutput } from '@/ai/flows/job-sector-prediction';

export async function jobSectorPrediction(input: JobSectorPredictionInput): Promise<JobSectorPredictionOutput> {
  return await jobSectorPredictionFlow(input);
}
export type { JobSectorPredictionOutput };
