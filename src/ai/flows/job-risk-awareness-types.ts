
import { z } from 'genkit';

export const JobRiskAwarenessInputSchema = z.object({
  sector: z.string().describe('The economic sector to analyze (e.g., Manufacturing, Retail).'),
  timeHorizon: z.string().describe('The time horizon for the analysis (e.g., short-term, long-term).'),
});
export type JobRiskAwarenessInput = z.infer<typeof JobRiskAwarenessInputSchema>;

export const JobRiskAwarenessOutputSchema = z.object({
  riskSummary: z.string().describe('A brief summary of the risks facing the specified job sector.'),
  atRiskJobs: z.array(z.string()).describe('A list of specific job roles within the sector that are at high risk.'),
  mitigationStrategies: z.array(z.string()).describe('Actionable strategies for individuals and policymakers to mitigate the identified risks.'),
});
export type JobRiskAwarenessOutput = z.infer<typeof JobRiskAwarenessOutputSchema>;
