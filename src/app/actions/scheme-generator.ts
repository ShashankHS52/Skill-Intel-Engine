'use server';

import { generateScheme as generateSchemeFlow } from '@/ai/flows/scheme-generator';
import type { SchemeGeneratorInput } from '@/ai/flows/scheme-generator-types';

export async function generateScheme(input: SchemeGeneratorInput) {
  return await generateSchemeFlow(input);
}
