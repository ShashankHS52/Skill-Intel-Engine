'use server';
/**
 * @fileOverview An AI agent that generates new government schemes.
 *
 * - generateScheme - A function that handles the scheme generation process.
 * - SchemeGeneratorInput - The input type for the generateScheme function.
 * - SchemeGeneratorOutput - The return type for the generateScheme function.
 */

import { ai } from '@/ai/genkit';
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

export async function generateScheme(input: SchemeGeneratorInput): Promise<SchemeGeneratorOutput> {
  return schemeGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'schemeGeneratorPrompt',
  input: { schema: SchemeGeneratorInputSchema },
  output: { schema: SchemeGeneratorOutputSchema },
  prompt: `You are an expert policy maker and government advisor in India. Your task is to generate a new, innovative government scheme for a specific field, taking into account the context of existing projects and tenders.

Field for New Scheme: {{{field}}}

Analyze the following lists of current projects and tenders to identify gaps, opportunities, and synergies.

Existing Projects:
{{#each projects}}
- Name: {{name}}
  Description: {{description}}
{{/each}}

Existing Tenders:
{{#each tenders}}
- Name: {{name}}
  Description: {{description}}
{{/each}}

Based on this context, create a new scheme with the following components:
1.  **Scheme Name**: A creative and fitting name for the new scheme.
2.  **Scheme Description**: A detailed description of the scheme, its purpose, and how it will work.
3.  **Objectives**: A list of key, measurable objectives for the scheme.
4.  **Target Beneficiaries**: A description of the primary target audience or beneficiaries of this scheme.

Output the data in JSON format.
`,
});

const schemeGeneratorFlow = ai.defineFlow(
  {
    name: 'schemeGeneratorFlow',
    inputSchema: SchemeGeneratorInputSchema,
    outputSchema: SchemeGeneratorOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
