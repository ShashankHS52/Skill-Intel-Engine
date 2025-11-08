
'use server';

/**
 * @fileOverview The "Vani AI" voice assistant agent for citizen users.
 * NOTE: This code is optimized for Kannada (kn) and English (en) multilingual support.
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

// --- Utility Functions ---

/**
 * Utility to select a high-quality Indian female voice based on the required language.
 * @param language - The two-letter language code ('kn' or 'en').
 * @returns The appropriate Google TTS voice name.
 */
function getIndianFemaleVoice(language: string): string {
    switch (language.toLowerCase()) {
        case 'kn':
            // High-fidelity Kannada Female voice
            return 'kn-IN-Wavenet-A'; 
        case 'en':
        default:
            // High-fidelity Indian English Female voice (default fallback)
            return 'en-IN-Wavenet-A'; 
    }
}

/**
 * Converts raw PCM audio data buffer to a base64 encoded WAV format.
 * NOTE: This relies on the "wav" library and the assumption that the 
 * TTS model output is raw PCM (Linear16).
 */
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

    - Language: Always respond in the language specified (e.g., '{{{language}}}'). Use **Kannada** if the language code is 'kn', and **Indian English** if the code is 'en'.
    - Simplicity: Use simple, clear, and encouraging words.
    - Context: You will be given the current conversation state as a JSON object. Use it to guide the conversation.
    - Task: Your main goal is to extract skills from the user's description of their work.

    Conversation State (JSON):
    {{#if conversationState}}
    {{{JSON.stringify conversationState}}}
    {{else}}
    {}
    {{/if}}

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
        const { output: agentResponse } = await vaniTextResponsePrompt({
            ...input,
            language: input.language, 
            conversationState: input.conversationState || {},
        });
        if (!agentResponse) {
            throw new Error('Vani agent failed to generate a text response.');
        }

        // 2. Synthesize the text response into audio.
        const voiceName = getIndianFemaleVoice(input.language);

        const { media: audioMedia } = await ai.generate({
            model: 'googleai/gemini-2.5-flash-preview-tts',
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voiceName },
                    },
                },
            },
            prompt: agentResponse.responseText,
        });

        if (!audioMedia?.url) {
            throw new Error('TTS model failed to return audio.');
        }

        // 3. Process the audio URI and convert to WAV format.
        const dataUriPrefix = 'data:audio/l16;base64,'; 
        if (!audioMedia.url.startsWith(dataUriPrefix)) {
             console.error('TTS URL prefix mismatch:', audioMedia.url.substring(0, 30));
             throw new Error('TTS returned an unexpected audio format/URI type.');
        }

        const base64Data = audioMedia.url.substring(dataUriPrefix.length);
        const pcmData = Buffer.from(base64Data, 'base64');
        const wavBase64 = await toWav(pcmData);

        // 4. Return the combined output.
        return {
            ...agentResponse,
            audioDataUri: `data:audio/wav;base64,${wavBase64}`,
        };
    }
);


// --- Main Agent Function ---

export async function vaniAgent(input: VaniAgentInput): Promise<VaniAgentOutput> {
    return vaniAgentFlow(input);
}
