/**
 * @fileOverview Defines the types and schemas for the scheme generator AI agent.
 */
import { z } from 'genkit';

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const TenderSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const SchemeGeneratorInputSchema = z.object({
  projects: z.array(ProjectSchema).describe('A list of current and upcoming projects.'),
  tenders: z.array(TenderSchema).describe('A list of current and upcoming tenders.'),
});
export type SchemeGeneratorInput = z.infer<typeof SchemeGeneratorInputSchema>;

const SuggestedSchemeSchema = z.object({
  schemeName: z.string().describe('A creative and fitting name for the new scheme.'),
  schemeDescription: z.string().describe('A detailed description of the scheme, its purpose, and how it will work.'),
  predictedSkillGaps: z.array(z.string()).describe('A list of future skills that will be in high demand based on the projects and tenders.'),
  upskillingStrategy: z.string().describe('A strategy for upskilling the workforce to meet the predicted new skill demands.'),
  targetBeneficiaries: z.string().describe('A description of the primary target audience or beneficiaries of this scheme.'),
});

export const SchemeGeneratorOutputSchema = z.object({
  suggestedSchemes: z.array(SuggestedSchemeSchema).describe('A list of suggested new schemes based on the analysis.'),
});
export type SchemeGeneratorOutput = z.infer<typeof SchemeGeneratorOutputSchema>;
