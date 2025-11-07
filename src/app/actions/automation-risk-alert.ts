'use server';

import { automationRiskAlert as automationRiskAlertFlow, type AutomationRiskAlertInput } from '@/ai/flows/automation-risk-alert';

export async function automationRiskAlert(input: AutomationRiskAlertInput) {
  return await automationRiskAlertFlow(input);
}
