
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
              prebuiltVoiceConfig: { voiceName: 'en-US-Standard-F' }, // Changed to a female voice
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

    // 3. Return the combined output, which now matches the full VaniAgentOutputSchema.
    return {
      ...agentResponse,
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
