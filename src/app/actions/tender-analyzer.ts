'use server';

import { analyzeTender as analyzeTenderFlow, type TenderAnalyzerInput } from '@/ai/flows/tender-analyzer';

export async function analyzeTender(input: TenderAnalyzerInput) {
  return await analyzeTenderFlow(input);
}
