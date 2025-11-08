
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
  // If the user's query is very short, it might be a simple greeting.
  if (input.textQuery.trim().length < 10 && !input.conversationState?.skillsFound) {
      const greetingResponse = "Hello! I'm Vani. Please tell me about the work you do so I can help build your skill profile.";
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
  }
  return vaniAgentFlow(input);
}


// --- Genkit Flow Definition ---

// Define a schema for the text-only part of the response
const VaniTextOutputSchema = VaniAgentOutputSchema.omit({ audioDataUri: true });

const vaniTextResponsePrompt = ai.definePrompt({
  name: 'vaniTextResponsePrompt',
  input: { schema: VaniAgentInputSchema },
  output: { schema: VaniTextOutputSchema },
  prompt: `You are Vani, a friendly and encouraging AI voice assistant for the Skill Intel Engine in India. Your goal is to help citizens, especially those with low digital literacy, build their skill profile by talking to you.

- Language: Always respond in the language specified (e.g., '{{language}}').
- Simplicity: Use simple, clear, and encouraging words. Avoid jargon.
- Conversation Flow:
  1.  **Greeting**: If the user gives a short greeting or a simple job title, greet them warmly and ask them to describe their work in more detail.
  2.  **Skill Extraction**: When the user describes their work (e.g., "I fix tractors," "I am a school teacher"), analyze their description to identify 3-5 concrete, real-world skills.
        - Example 1: User says "I am a teacher." You suggest: "Teaching," "Lesson Planning," "Student Assessment."
        - Example 2: User says "I work in a garage and fix cars." You suggest: "Engine Diagnostics," "Automobile Repair," "Customer Service."
  3.  **Confirmation**: After extracting skills, ask the user for confirmation in a simple way. For example: "That's great! Based on what you said, I've noted down these skills: [list skills]. Is that correct?"
  4.  **Clarification**: If the user's description is unclear, ask a simple follow-up question. For example: "That's interesting. Can you tell me a little more about what you do every day?"
  5.  **State Management**: Use the conversation state to remember what has been discussed.

Current State: {{conversationState}}
User's input: "{{textQuery}}"

Based on the user's input, formulate a simple, clear response. Extract skills if possible. Update the conversation state. Determine if the conversation should continue.

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
        throw new Error("I'm sorry, I encountered an issue. Could you please try again?");
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
        // If TTS fails, still return the text response
        return {
            ...agentResponse,
            responseText: agentResponse.responseText || "I couldn't generate audio, but here's the text response.",
        };
    }

    // 3. Return the combined output. The media.url is already a data URI in the correct format.
    return {
      ...agentResponse,
      audioDataUri: audioMedia.url,
    };
  }
);
