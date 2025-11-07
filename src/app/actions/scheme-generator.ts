'use server';

import { generateScheme as generateSchemeFlow, type SchemeGeneratorInput } from '@/ai/flows/scheme-generator';

export async function generateScheme(input: SchemeGeneratorInput) {
  return await generateSchemeFlow(input);
}
