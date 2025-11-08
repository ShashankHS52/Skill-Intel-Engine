import { z } from 'genkit';

export const VaniAgentInputSchema = z.object({
  textQuery: z.string().describe("The transcribed text from the user's speech."),
  conversationState: z.any().optional().describe('The current state of the conversation to maintain context.'),
  language: z.string().default('en-IN').describe('The BCP-47 language code for the conversation (e.g., hi-IN, en-IN).'),
});
export type VaniAgentInput = z.infer<typeof VaniAgentInputSchema>;

export const VaniAgentOutputSchema = z.object({
  responseText: z.string().describe('The text response to be spoken to the user.'),
  suggestedSkills: z.array(z.string()).optional().describe('A list of standardized skills extracted from the user\'s query.'),
  endConversation: z.boolean().default(false).describe('Whether the conversation should end after this turn.'),
  updatedConversationState: z.any().optional().describe('The new state of the conversation.'),
  audioDataUri: z.string().optional().describe("The synthesized audio response as a data URI."),
});
export type VaniAgentOutput = z.infer<typeof VaniAgentOutputSchema>;
