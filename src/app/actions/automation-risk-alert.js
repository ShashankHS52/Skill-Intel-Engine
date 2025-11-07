'use server';

import { automationRiskAlert as automationRiskAlertFlow } from '@/ai/flows/automation-risk-alert';

export async function automationRiskAlert(input) {
  return await automationRiskAlertFlow(input);
}
