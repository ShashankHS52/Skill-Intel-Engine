'use server';
/**
 * @fileOverview An AI agent that analyzes upcoming government projects.
 *
 * - analyzeProject - A function that handles the project analysis process.
 * - ProjectAnalyzerInput - The input type for the analyzeProject function.
 * - ProjectAnalyzerOutput - The return type for the analyzeProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectAnalyzerInputSchema = z.object({
  projectName: z.string().describe('The name of the project to analyze.'),
  projectDescription: z.string().describe('A brief description of the project.'),
});


const ProjectAnalyzerOutputSchema = z.object({
  bestRegion: z.string().describe('The most suitable region in India to conduct the project.'),
  qualifiedEmployees: z.array(z.string()).describe('A list of skills and roles needed for the project.'),
  costEffectiveness: z.string().describe('An analysis of the cost-effectiveness of the project.'),
});


export async function analyzeProject(input) {
  return projectAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectAnalyzerPrompt',
  input: {schema: ProjectAnalyzerInputSchema},
  output: {schema: ProjectAnalyzerOutputSchema},
  prompt: `You are an expert project analyst for government initiatives in India. Based on the provided project name and description, provide a concise analysis covering the best region, required employee skills, and cost-effectiveness.

Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}

Analyze the project and provide the following:
1.  **Best Region**: Suggest the most suitable state or region in India and briefly explain why (e.g., resource availability, skilled labor, infrastructure).
2.  **Qualified Employees**: List the key roles and skills required to successfully execute this project.
3.  **Cost Effectiveness**: Provide a brief analysis of the potential cost-effectiveness, considering factors like local labor costs, resource availability, and potential economic impact.

Output the data in JSON format.
`,
});

const projectAnalyzerFlow = ai.defineFlow(
  {
    name: 'projectAnalyzerFlow',
    inputSchema: ProjectAnalyzerInputSchema,
    outputSchema: ProjectAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
