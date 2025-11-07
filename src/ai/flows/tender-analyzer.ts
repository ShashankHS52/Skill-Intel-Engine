'use server';
/**
 * @fileOverview An AI agent that analyzes government tenders to match local unemployed individuals.
 *
 * - analyzeTender - A function that handles the tender analysis process.
 * - TenderAnalyzerInput - The input type for the analyzeTender function.
 * - TenderAnalyzerOutput - The return type for the analyzeTender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TenderAnalyzerInputSchema = z.object({
  tenderField: z.string().describe('The field or industry of the tender (e.g., Construction, IT).'),
  location: z.string().describe('The geographical location of the tender (e.g., Uttar Pradesh).'),
});
export type TenderAnalyzerInput = z.infer<typeof TenderAnalyzerInputSchema>;

const TenderAnalyzerOutputSchema = z.object({
  targetIndustriesAndRoles: z.array(z.string()).describe('A list of specific industries and job roles within the tender\'s field.'),
  potentialLocalWorkforce: z.array(z.string()).describe('Types of locally unemployed or underemployed individuals who could fill these roles.'),
  jobMatchingStrategy: z.string().describe('A concise strategy on how to connect the local workforce with the tender opportunities, including potential training or certification programs.'),
});
export type TenderAnalyzerOutput = z.infer<typeof TenderAnalyzerOutputSchema>;

export async function analyzeTender(input: TenderAnalyzerInput): Promise<TenderAnalyzerOutput> {
  return tenderAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tenderAnalyzerPrompt',
  input: {schema: TenderAnalyzerInputSchema},
  output: {schema: TenderAnalyzerOutputSchema},
  prompt: `You are an expert employment analyst for government tenders in India. Your goal is to provide a strategy for employing local unemployed individuals based on a specific tender.

Tender Field: {{{tenderField}}}
Location: {{{location}}}

Analyze the tender and provide the following:
1.  **Target Industries and Roles**: Identify specific job roles required for a tender in this field (e.g., for Construction, list roles like Mason, Electrician, Site Supervisor).
2.  **Potential Local Workforce**: Describe the likely profile of the local unemployed population in the specified location that could be suitable for these roles (e.g., unskilled laborers, ITI graduates, etc.).
3.  **Job Matching Strategy**: Outline a brief, actionable strategy to connect this workforce to the jobs. Mention any necessary skill gap training or local outreach programs.

Output the data in JSON format.
`,
});

const tenderAnalyzerFlow = ai.defineFlow(
  {
    name: 'tenderAnalyzerFlow',
    inputSchema: TenderAnalyzerInputSchema,
    outputSchema: TenderAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
