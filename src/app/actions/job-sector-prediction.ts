
'use server';

import { jobSectorPrediction as jobSectorPredictionFlow } from '@/ai/flows/job-sector-prediction';
import type { JobSectorPredictionInput, JobSectorPredictionOutput } from '@/ai/flows/job-sector-prediction-types';

export async function jobSectorPrediction(input: JobSectorPredictionInput): Promise<JobSectorPredictionOutput> {
  return await jobSectorPredictionFlow(input);
}
export type { JobSectorPredictionOutput };
