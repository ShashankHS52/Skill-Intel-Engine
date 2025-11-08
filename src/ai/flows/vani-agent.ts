
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
import {
  VaniAgentInputSchema,
  VaniAgentOutputSchema,
  type VaniAgentInput,
  type VaniAgentOutput,
} from './vani-agent-types';

// --- Main Agent Function ---

export async function vaniAgent(input: VaniAgentInput): Promise<VaniAgentOutput> {
  return vaniAgentFlow(input);
}


// --- Genkit Flow Definition ---

// Define a schema for the text-only part of the response
const VaniTextOutputSchema = VaniAgentOutputSchema.omit({ audioDataUri: true });

const vaniTextResponsePrompt = ai.definePrompt({
  name: 'vaniTextResponsePrompt',
  input: { schema: VaniAgentInputSchema },
  output: { schema: VaniTextOutputSchema },
  prompt: `You are Vani, a friendly and patient AI voice assistant for the Skill Intel Engine. Your purpose is to help Indian citizens, especially those with low digital literacy, build their skill profile using their voice.

  - Language: Always respond in the language specified (e.g., '{{language}}').
  - Simplicity: Use simple, clear, and encouraging words.
  - Context: You will be given the current conversation state. Use it to guide the conversation.
  - Task: Your main goal is to extract skills from the user's description of their work.

  Current State: {{conversationState}}
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
    const { output: agentResponse } = await vaniTextResponsePrompt(input);
    if (!agentResponse) {
      throw new Error('Vani agent failed to generate a text response.');
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

    // 3. Return the combined output. The media.url is already a data URI in the correct format.
    return {
      ...agentResponse,
      audioDataUri: audioMedia.url,
    };
  }
);
