
'use server';
/**
 * @fileOverview An AI agent that predicts emerging job sectors and in-demand skills.
 *
 * - jobSectorPrediction - A function that handles the job sector prediction process.
 * - JobSectorPredictionInput - The input type for the jobSectorPrediction function.
 * - JobSectorPredictionOutput - The return type for the jobSectorPrediction function.
 */

import { ai } from '@/ai/genkit';
import {
    JobSectorPredictionInputSchema,
    JobSectorPredictionOutputSchema,
    type JobSectorPredictionInput,
    type JobSectorPredictionOutput
} from './job-sector-prediction-types';


export async function jobSectorPrediction(input: JobSectorPredictionInput): Promise<JobSectorPredictionOutput> {
  return jobSectorPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobSectorPredictionPrompt',
  input: { schema: JobSectorPredictionInputSchema },
  output: { schema: JobSectorPredictionOutputSchema },
  prompt: `You are an expert futurist and labor market analyst. Your task is to predict emerging job sectors and the skills required for them based on current technological, economic, and societal trends.

Analyze the following industry over the given time horizon:

Industry: {{{industry}}}
Time Horizon: {{{timeHorizon}}}

Based on your analysis, provide the following:
1.  **Emerging Job Sectors**: Identify and list new job sectors that are likely to see significant growth.
2.  **In-Demand Skills**: List the key technical and soft skills that will be crucial for success in these emerging sectors.
3.  **Preparedness Recommendations**: Provide a list of actionable recommendations for individuals, educational institutions, and governments to prepare the workforce for these future opportunities.

Output the data in the specified JSON format.
`,
});

const jobSectorPredictionFlow = ai.defineFlow(
  {
    name: 'jobSectorPredictionFlow',
    inputSchema: JobSectorPredictionInputSchema,
    outputSchema: JobSectorPredictionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
