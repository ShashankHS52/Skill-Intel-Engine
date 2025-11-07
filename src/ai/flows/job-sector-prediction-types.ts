
import { z } from 'genkit';

export const JobSectorPredictionInputSchema = z.object({
  industry: z.string().describe("The industry to analyze. Can be a specific industry or 'All' for a general analysis."),
  timeHorizon: z.string().describe('The time horizon for the prediction (e.g., short-term, long-term).'),
});
export type JobSectorPredictionInput = z.infer<typeof JobSectorPredictionInputSchema>;

export const JobSectorPredictionOutputSchema = z.object({
  emergingSectors: z.array(z.string()).describe('A list of new and emerging job sectors with high growth potential.'),
  inDemandSkills: z.array(z.string()).describe('A list of specific skills that will be in high demand within the predicted sectors.'),
  preparednessRecommendations: z.array(z.string()).describe('Actionable recommendations for the workforce to prepare for these future roles.'),
});
export type JobSectorPredictionOutput = z.infer<typeof JobSectorPredictionOutputSchema>;
