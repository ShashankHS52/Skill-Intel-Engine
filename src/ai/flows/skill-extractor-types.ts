
import { z } from 'genkit';

export const SkillExtractorInputSchema = z.object({
  jobDescription: z.string().describe('A free-text description of a user\'s job or tasks.'),
});
export type SkillExtractorInput = z.infer<typeof SkillExtractorInputSchema>;

export const SkillExtractorOutputSchema = z.object({
  suggestedSkills: z.array(z.string()).describe('A list of standardized skills extracted from the job description.'),
});
export type SkillExtractorOutput = z.infer<typeof SkillExtractorOutputSchema>;
