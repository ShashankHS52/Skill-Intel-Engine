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
  field: z.string().describe('The field or industry for the new scheme (e.g., Renewable Energy, Rural Healthcare).'),
  projects: z.array(ProjectSchema).describe('A list of current and upcoming projects in related fields.'),
  tenders: z.array(TenderSchema).describe('A list of current and upcoming tenders in related fields.'),
});
export type SchemeGeneratorInput = z.infer<typeof SchemeGeneratorInputSchema>;

export const SchemeGeneratorOutputSchema = z.object({
  schemeName: z.string().describe('A creative and fitting name for the new scheme.'),
  schemeDescription: z.string().describe('A detailed description of the scheme, its purpose, and how it will work.'),
  objectives: z.array(z.string()).describe('A list of key objectives for the scheme.'),
  targetBeneficiaries: z.string().describe('A description of the primary target audience or beneficiaries of this scheme.'),
});
export type SchemeGeneratorOutput = z.infer<typeof SchemeGeneratorOutputSchema>;
