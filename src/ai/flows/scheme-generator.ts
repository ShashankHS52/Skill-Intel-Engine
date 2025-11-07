'use server';
/**
 * @fileOverview An AI agent that generates new government schemes.
 *
 * - generateScheme - A function that handles the scheme generation process.
 * - SchemeGeneratorInput - The input type for the generateScheme function.
 * - SchemeGeneratorOutput - The return type for the generateScheme function.
 */

import { ai } from '@/ai/genkit';
import {
  SchemeGeneratorInputSchema,
  type SchemeGeneratorInput,
  SchemeGeneratorOutputSchema,
  type SchemeGeneratorOutput
} from './scheme-generator-types';

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
