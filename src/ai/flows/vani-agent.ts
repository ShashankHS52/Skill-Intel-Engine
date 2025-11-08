'use server';
/**
 * @fileOverview The "Vani AI" voice assistant agent for citizen users.
 *
 * - vaniAgent - A function that handles the main conversational logic.
 * - VaniAgentInput - The input type for the vaniAgent function.
 * - VaniAgentOutput - The return type for the vaniAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// --- Input and Output Schemas ---

export const VaniAgentInputSchema = z.object({
  textQuery: z.string().describe('The transcribed text from the user\'s speech.'),
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

// --- Main Agent Function ---

export async function vaniAgent(input: VaniAgentInput): Promise<VaniAgentOutput> {
  return vaniAgentFlow(input);
}

// --- Helper Functions ---

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
    writer.write(pcmData);
    writer.end();
  });
}

// --- Genkit Flow Definition ---

const prompt = ai.definePrompt({
  name: 'vaniAgentPrompt',
  input: { schema: VaniAgentInputSchema },
  output: { schema: VaniAgentOutputSchema },
  prompt: `You are Vani, a friendly and patient AI voice assistant for the Skill Intel Engine. Your purpose is to help Indian citizens, especially those with low digital literacy, build their skill profile using their voice.

  - Language: Always respond in the language specified (e.g., '{{language}}').
  - Simplicity: Use simple, clear, and encouraging words.
  - Context: You will be given the current conversation state. Use it to guide the conversation.
  - Task: Your main goal is to extract skills from the user's description of their work.

  Current State: {{jsonStringify conversationState}}
  User's input: "{{textQuery}}"

  Based on the user's input:
  1. If the user is just starting, greet them and ask what work they do.
  2. If the user describes their work, analyze the text to identify 3-5 concrete skills. For example, if they say "I fix tractors," suggest skills like "Diesel Engine Repair."
  3. Formulate a simple, clear response to be read back to the user. Confirm the extracted skills if any.
  4. Determine if the conversation should end or continue.
  
  Output the result in the specified JSON format.
`,
});

const vaniAgentFlow = ai.defineFlow(
  {
    name: 'vaniAgentFlow',
    inputSchema: VaniAgentInputSchema,
    outputSchema: VaniAgentOutputSchema,
  },
  async (input) => {
    // 1. Get the text response from the main LLM.
    const { output: agentResponse } = await prompt(input);
    if (!agentResponse) {
      throw new Error('Vani agent failed to generate a response.');
    }

    // 2. Synthesize the text response into audio.
    const { media: audioMedia } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' }, // Default voice
            },
          },
        },
        prompt: agentResponse.responseText,
    });
      
    if (!audioMedia?.url) {
        throw new Error('TTS model failed to return audio.');
    }

    const pcmData = Buffer.from(audioMedia.url.substring(audioMedia.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(pcmData);

    // 3. Return the combined output.
    return {
      ...agentResponse,
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
