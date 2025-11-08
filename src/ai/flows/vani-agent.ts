
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
  let userQuery = input.textQuery;
  
  // If audio is provided, transcribe it first.
  if (input.audioQuery) {
    try {
      const { text } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [
          { media: { url: input.audioQuery } },
          { text: "Transcribe this audio. If it's not in English, provide the English transcription." },
        ],
        config: {
          temperature: 0.1,
        },
      });
      userQuery = text || "I couldn't understand the audio.";
    } catch (e) {
      console.error('Error during transcription:', e);
      userQuery = "I couldn't understand the audio.";
    }
  }
  
  // If the user's query is very short and no skills have been found yet, it might be a simple greeting.
  if (userQuery.trim().length < 15 && !input.conversationState?.skillsFound) {
      const greetingResponse = "Hello! I'm Vani. Please tell me about the work you do so I can help build your skill profile.";
      try {
          const { media: audioMedia } = await ai.generate({
            model: 'googleai/gemini-2.5-flash-preview-tts',
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } } },
            },
            prompt: greetingResponse,
          });
          return {
              responseText: greetingResponse,
              endConversation: false,
              audioDataUri: audioMedia?.url,
          };
      } catch (e) {
          console.error('Error during TTS for greeting:', e);
           // Fallback to text-only if TTS fails
          return {
            responseText: greetingResponse,
            endConversation: false,
          };
      }
  }
  
  // Update the input for the main flow with the transcribed text
  const flowInput = { ...input, textQuery: userQuery };
  return vaniAgentFlow(flowInput);
}


// --- Genkit Flow Definition ---

// Define a schema for the text-only part of the response
const VaniTextOutputSchema = VaniAgentOutputSchema.omit({ audioDataUri: true });

const vaniTextResponsePrompt = ai.definePrompt({
  name: 'vaniTextResponsePrompt',
  input: { schema: VaniAgentInputSchema.omit({ audioQuery: true }) }, // The prompt doesn't need the audio data
  output: { schema: VaniTextOutputSchema },
  prompt: `You are Vani, a friendly and encouraging AI voice assistant for the Skill Intel Engine in India. Your goal is to help citizens, especially those with low digital literacy, build their skill profile by talking to you.

- Language: Always respond in the language specified (e.g., '{{language}}').
- Simplicity: Use simple, clear, and encouraging words. Avoid jargon.
- Conversation Flow:
  1.  **Greeting & Initial Prompt**: If the conversation has just started, greet the user warmly and ask them to describe their work.
  2.  **Skill Extraction**: When the user describes their work (e.g., "I fix tractors," "I am a school teacher"), analyze their description to identify 3-5 concrete, real-world skills.
        - Example 1: User says "I am a teacher." You suggest: "Teaching," "Lesson Planning," "Student Assessment."
        - Example 2: User says "I work in a garage and fix cars." You suggest: "Engine Diagnostics," "Automobile Repair," "Customer Service."
  3.  **Confirmation**: After extracting skills, ask the user for confirmation in a simple way. For example: "That's great! Based on what you said, I've noted down these skills: [list skills]. Is that correct?" Set the 'updatedConversationState' to '{ "skillsPendingConfirmation": true }'.
  4.  **Handling Confirmation**: If the 'conversationState' shows 'skillsPendingConfirmation', the user's response is likely a "yes" or "no".
        - If "yes", respond with something like: "Excellent! Thanks for confirming. Is there any other work you do that you'd like to add?"
        - If "no", respond with: "My mistake. Could you please describe your work again for me?"
  5.  **Clarification**: If the user's description is unclear or too short, ask a simple follow-up question. For example: "That's interesting. Can you tell me a little more about what you do every day?"
  6.  **State Management**: Use the conversation state to remember what has been discussed. Don't greet the user again if a conversation is in progress.

Current State: {{conversationState}}
User's input: "{{textQuery}}"

Based on the user's input and the current state, formulate a simple, clear response. Extract skills if possible. Update the conversation state. Determine if the conversation should continue.

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
    let agentResponse: VaniAgentOutput;
    try {
        const { output } = await vaniTextResponsePrompt(input);
        if (!output) {
            throw new Error("Flow did not produce a text output.");
        }
        agentResponse = output;
    } catch (e) {
        console.error('Error generating text response:', e);
        agentResponse = {
            responseText: "I'm sorry, I'm having trouble connecting. Please try again later.",
            endConversation: true
        };
    }
    
    // 2. Synthesize the text response into audio.
    try {
        if (agentResponse.responseText) {
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
            
            if (audioMedia?.url) {
                agentResponse.audioDataUri = audioMedia.url;
            }
        }

    } catch(e) {
        console.error('Error generating TTS audio:', e);
        // If TTS fails, we can still proceed with the text response.
        // The audioDataUri will just be missing.
    }

    // 3. Return the combined output.
    return agentResponse;
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
    // This function is no longer needed but kept for reference if format changes.
    return Promise.resolve('');
}
