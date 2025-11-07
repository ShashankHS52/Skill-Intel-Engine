'use server';
/**
 * @fileOverview An AI agent that generates new government schemes by analyzing existing projects and tenders.
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
  prompt: `You are an expert policy maker and government advisor in India. Your task is to analyze current government projects and tenders to identify future skill demands and propose new, innovative upskilling schemes.

Analyze the following lists of current projects and tenders:

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

Based on your analysis of these projects and tenders, perform the following steps:
1.  **Predict Future Skills**: Identify a list of new or emerging skills that will be in high demand to support these initiatives.
2.  **Identify Gaps**: Determine the gap between the current workforce's skills and the predicted future needs.
3.  **Generate Schemes**: Propose a list of 1 to 5 distinct upskilling schemes to address these gaps.

For each suggested scheme, provide the following details:
- **Scheme Name**: A creative, sweet, and short name for the scheme.
- **Scheme Description**: A sweet and short description of the scheme, its purpose, and how it will work.
- **Objectives**: A list of key objectives for the new scheme.
- **Predicted Skill Gaps**: The specific future skills this scheme will address.
- **Upskilling Strategy**: A concise strategy for how the scheme will train and upskill the workforce.
- **Target Beneficiaries**: A description of the primary target audience (e.g., ITI graduates, rural youth, etc.).

Output the data in the specified JSON format.
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
