import { KPIData } from '@/lib/kpi-types';

// State-wise workforce data for India
export interface StateData {
  id: string;
  name: string;
  unemployment: number;
  employmentRate: number;
  skillDensity: number;
  workingPopulation: number; // in millions
  skillGap: 'low' | 'medium' | 'high';
  digitalSkills: number;
  certifiedWorkforce: number;
}

export const stateWiseData: Record<string, StateData> = {
  'in-an': {
    id: 'in-an',
    name: 'Andaman and Nicobar Islands',
    unemployment: 3.2,
    employmentRate: 89.5,
    skillDensity: 2.8,
    workingPopulation: 0.25,
    skillGap: 'medium',
    digitalSkills: 45.2,
    certifiedWorkforce: 15.8
  },
  'in-ap': {
    id: 'in-ap',
    name: 'Andhra Pradesh',
    unemployment: 4.8,
    employmentRate: 86.2,
    skillDensity: 3.4,
    workingPopulation: 32.5,
    skillGap: 'medium',
    digitalSkills: 52.1,
    certifiedWorkforce: 28.3
  },
  'in-ar': {
    id: 'in-ar',
    name: 'Arunachal Pradesh',
    unemployment: 2.1,
    employmentRate: 92.3,
    skillDensity: 2.2,
    workingPopulation: 0.8,
    skillGap: 'high',
    digitalSkills: 38.7,
    certifiedWorkforce: 12.4
  },
  'in-as': {
    id: 'in-as',
    name: 'Assam',
    unemployment: 7.9,
    employmentRate: 83.1,
    skillDensity: 2.6,
    workingPopulation: 20.1,
    skillGap: 'high',
    digitalSkills: 41.3,
    certifiedWorkforce: 18.9
  },
  'in-br': {
    id: 'in-br',
    name: 'Bihar',
    unemployment: 8.2,
    employmentRate: 81.8,
    skillDensity: 2.1,
    workingPopulation: 68.4,
    skillGap: 'high',
    digitalSkills: 32.6,
    certifiedWorkforce: 14.7
  },
  'in-ch': {
    id: 'in-ch',
    name: 'Chandigarh',
    unemployment: 3.5,
    employmentRate: 91.2,
    skillDensity: 4.8,
    workingPopulation: 0.7,
    skillGap: 'low',
    digitalSkills: 78.4,
    certifiedWorkforce: 65.2
  },
  'in-ct': {
    id: 'in-ct',
    name: 'Chhattisgarh',
    unemployment: 6.1,
    employmentRate: 84.9,
    skillDensity: 2.8,
    workingPopulation: 16.2,
    skillGap: 'medium',
    digitalSkills: 39.8,
    certifiedWorkforce: 22.1
  },
  'in-dd': {
    id: 'in-dd',
    name: 'Daman and Diu',
    unemployment: 2.8,
    employmentRate: 90.1,
    skillDensity: 3.6,
    workingPopulation: 0.15,
    skillGap: 'low',
    digitalSkills: 58.3,
    certifiedWorkforce: 42.7
  },
  'in-dl': {
    id: 'in-dl',
    name: 'Delhi',
    unemployment: 4.2,
    employmentRate: 88.7,
    skillDensity: 4.2,
    workingPopulation: 12.8,
    skillGap: 'low',
    digitalSkills: 72.1,
    certifiedWorkforce: 58.9
  },
  'in-ga': {
    id: 'in-ga',
    name: 'Goa',
    unemployment: 3.1,
    employmentRate: 91.8,
    skillDensity: 4.1,
    workingPopulation: 0.9,
    skillGap: 'low',
    digitalSkills: 68.4,
    certifiedWorkforce: 52.3
  },
  'in-gj': {
    id: 'in-gj',
    name: 'Gujarat',
    unemployment: 3.8,
    employmentRate: 89.4,
    skillDensity: 3.8,
    workingPopulation: 38.7,
    skillGap: 'low',
    digitalSkills: 61.2,
    certifiedWorkforce: 45.8
  },
  'in-hr': {
    id: 'in-hr',
    name: 'Haryana',
    unemployment: 5.2,
    employmentRate: 87.3,
    skillDensity: 3.9,
    workingPopulation: 16.8,
    skillGap: 'medium',
    digitalSkills: 64.7,
    certifiedWorkforce: 48.2
  },
  'in-hp': {
    id: 'in-hp',
    name: 'Himachal Pradesh',
    unemployment: 2.9,
    employmentRate: 90.8,
    skillDensity: 3.2,
    workingPopulation: 4.2,
    skillGap: 'medium',
    digitalSkills: 55.8,
    certifiedWorkforce: 38.4
  },
  'in-jk': {
    id: 'in-jk',
    name: 'Jammu and Kashmir',
    unemployment: 6.8,
    employmentRate: 84.2,
    skillDensity: 2.9,
    workingPopulation: 7.8,
    skillGap: 'high',
    digitalSkills: 47.3,
    certifiedWorkforce: 29.6
  },
  'in-jh': {
    id: 'in-jh',
    name: 'Jharkhand',
    unemployment: 7.1,
    employmentRate: 83.7,
    skillDensity: 2.4,
    workingPopulation: 21.3,
    skillGap: 'high',
    digitalSkills: 36.9,
    certifiedWorkforce: 19.8
  },
  'in-ka': {
    id: 'in-ka',
    name: 'Karnataka',
    unemployment: 4.1,
    employmentRate: 88.9,
    skillDensity: 4.3,
    workingPopulation: 38.2,
    skillGap: 'low',
    digitalSkills: 69.8,
    certifiedWorkforce: 54.7
  },
  'in-kl': {
    id: 'in-kl',
    name: 'Kerala',
    unemployment: 5.8,
    employmentRate: 85.4,
    skillDensity: 4.1,
    workingPopulation: 21.8,
    skillGap: 'medium',
    digitalSkills: 71.2,
    certifiedWorkforce: 56.3
  },
  'in-ld': {
    id: 'in-ld',
    name: 'Lakshadweep',
    unemployment: 2.5,
    employmentRate: 91.4,
    skillDensity: 2.9,
    workingPopulation: 0.04,
    skillGap: 'medium',
    digitalSkills: 49.6,
    certifiedWorkforce: 34.1
  },
  'in-mp': {
    id: 'in-mp',
    name: 'Madhya Pradesh',
    unemployment: 6.7,
    employmentRate: 84.8,
    skillDensity: 2.7,
    workingPopulation: 46.8,
    skillGap: 'high',
    digitalSkills: 41.5,
    certifiedWorkforce: 24.6
  },
  'in-mh': {
    id: 'in-mh',
    name: 'Maharashtra',
    unemployment: 4.6,
    employmentRate: 87.8,
    skillDensity: 4.0,
    workingPopulation: 72.5,
    skillGap: 'low',
    digitalSkills: 63.4,
    certifiedWorkforce: 49.2
  },
  'in-mn': {
    id: 'in-mn',
    name: 'Manipur',
    unemployment: 8.6,
    employmentRate: 80.9,
    skillDensity: 2.8,
    workingPopulation: 1.8,
    skillGap: 'high',
    digitalSkills: 44.7,
    certifiedWorkforce: 26.3
  },
  'in-ml': {
    id: 'in-ml',
    name: 'Meghalaya',
    unemployment: 4.9,
    employmentRate: 86.1,
    skillDensity: 2.5,
    workingPopulation: 1.9,
    skillGap: 'medium',
    digitalSkills: 42.8,
    certifiedWorkforce: 25.9
  },
  'in-mz': {
    id: 'in-mz',
    name: 'Mizoram',
    unemployment: 3.7,
    employmentRate: 88.6,
    skillDensity: 3.1,
    workingPopulation: 0.7,
    skillGap: 'medium',
    digitalSkills: 52.4,
    certifiedWorkforce: 35.7
  },
  'in-nl': {
    id: 'in-nl',
    name: 'Nagaland',
    unemployment: 6.2,
    employmentRate: 85.3,
    skillDensity: 2.6,
    workingPopulation: 1.2,
    skillGap: 'high',
    digitalSkills: 46.1,
    certifiedWorkforce: 28.4
  },
  'in-or': {
    id: 'in-or',
    name: 'Odisha',
    unemployment: 6.9,
    employmentRate: 84.1,
    skillDensity: 2.8,
    workingPopulation: 26.4,
    skillGap: 'high',
    digitalSkills: 43.2,
    certifiedWorkforce: 22.8
  },
  'in-py': {
    id: 'in-py',
    name: 'Puducherry',
    unemployment: 4.3,
    employmentRate: 87.9,
    skillDensity: 3.7,
    workingPopulation: 0.8,
    skillGap: 'medium',
    digitalSkills: 59.3,
    certifiedWorkforce: 44.1
  },
  'in-pb': {
    id: 'in-pb',
    name: 'Punjab',
    unemployment: 5.9,
    employmentRate: 85.8,
    skillDensity: 3.6,
    workingPopulation: 18.2,
    skillGap: 'medium',
    digitalSkills: 57.4,
    certifiedWorkforce: 41.9
  },
  'in-rj': {
    id: 'in-rj',
    name: 'Rajasthan',
    unemployment: 5.4,
    employmentRate: 86.7,
    skillDensity: 3.1,
    workingPopulation: 44.3,
    skillGap: 'medium',
    digitalSkills: 48.9,
    certifiedWorkforce: 32.7
  },
  'in-sk': {
    id: 'in-sk',
    name: 'Sikkim',
    unemployment: 3.8,
    employmentRate: 88.4,
    skillDensity: 3.4,
    workingPopulation: 0.4,
    skillGap: 'medium',
    digitalSkills: 54.6,
    certifiedWorkforce: 39.2
  },
  'in-tn': {
    id: 'in-tn',
    name: 'Tamil Nadu',
    unemployment: 4.7,
    employmentRate: 87.2,
    skillDensity: 3.9,
    workingPopulation: 44.8,
    skillGap: 'medium',
    digitalSkills: 64.1,
    certifiedWorkforce: 47.3
  },
  'in-tg': {
    id: 'in-tg',
    name: 'Telangana',
    unemployment: 4.2,
    employmentRate: 88.3,
    skillDensity: 4.2,
    workingPopulation: 22.7,
    skillGap: 'low',
    digitalSkills: 68.9,
    certifiedWorkforce: 52.4
  },
  'in-tr': {
    id: 'in-tr',
    name: 'Tripura',
    unemployment: 7.3,
    employmentRate: 83.2,
    skillDensity: 2.7,
    workingPopulation: 2.3,
    skillGap: 'high',
    digitalSkills: 44.8,
    certifiedWorkforce: 26.7
  },
  'in-up': {
    id: 'in-up',
    name: 'Uttar Pradesh',
    unemployment: 7.8,
    employmentRate: 82.9,
    skillDensity: 2.3,
    workingPopulation: 128.6,
    skillGap: 'high',
    digitalSkills: 38.4,
    certifiedWorkforce: 21.3
  },
  'in-ut': {
    id: 'in-ut',
    name: 'Uttarakhand',
    unemployment: 4.9,
    employmentRate: 86.8,
    skillDensity: 3.2,
    workingPopulation: 6.7,
    skillGap: 'medium',
    digitalSkills: 53.7,
    certifiedWorkforce: 36.8
  },
  'in-wb': {
    id: 'in-wb',
    name: 'West Bengal',
    unemployment: 6.3,
    employmentRate: 85.1,
    skillDensity: 3.1,
    workingPopulation: 58.2,
    skillGap: 'high',
    digitalSkills: 49.7,
    certifiedWorkforce: 31.4
  }
};

// Metric types for state analysis
export type StateMetric = 'unemployment' | 'employment_rate' | 'skill_density' | 'skill_gap' | 'digital_skills' | 'certified_workforce';

// Get color for a state based on metric value
export const getStateColor = (stateId: string, metric: StateMetric): string => {
  const state = stateWiseData[stateId];
  if (!state) return '#E0F8F8';

  let value: number;
  let isInverted = false; // true for metrics where lower is better

  switch (metric) {
    case 'unemployment':
      value = state.unemployment;
      isInverted = true;
      break;
    case 'employment_rate':
      value = state.employmentRate;
      break;
    case 'skill_density':
      value = state.skillDensity;
      break;
    case 'skill_gap':
      return state.skillGap === 'low' ? '#00A693' : 
             state.skillGap === 'medium' ? '#FFB399' : '#FF7F50';
    case 'digital_skills':
      value = state.digitalSkills;
      break;
    case 'certified_workforce':
      value = state.certifiedWorkforce;
      break;
    default:
      return '#E0F8F8';
  }

  // Color intensity calculation
  const getColorIntensity = (val: number, min: number, max: number): string => {
    const normalized = (val - min) / (max - min);
    const intensity = Math.max(0, Math.min(1, normalized));
    
    if (isInverted) {
      // Red for high values (bad), green for low values (good)
      if (intensity > 0.7) return '#FF7F50'; // High (bad) - Coral
      if (intensity > 0.4) return '#FFB399'; // Medium - Light coral
      return '#00A693'; // Low (good) - Teal-green
    } else {
      // Green for high values (good), red for low values (bad)
      if (intensity > 0.7) return '#00A693'; // High (good) - Teal-green
      if (intensity > 0.4) return '#4DCCCC'; // Medium - Light teal
      return '#FFB399'; // Low (needs improvement) - Light coral
    }
  };

  // Define ranges for each metric
  const ranges: Record<string, { min: number; max: number }> = {
    unemployment: { min: 2, max: 9 },
    employment_rate: { min: 80, max: 93 },
    skill_density: { min: 2, max: 5 },
    digital_skills: { min: 30, max: 80 },
    certified_workforce: { min: 10, max: 70 }
  };

  const range = ranges[metric];
  return getColorIntensity(value, range.min, range.max);
};

// Get metric label
export const getMetricLabel = (metric: StateMetric): string => {
  const labels: Record<StateMetric, string> = {
    unemployment: 'Unemployment Rate (%)',
    employment_rate: 'Employment Rate (%)',
    skill_density: 'Skill Density Score',
    skill_gap: 'Skill Gap Level',
    digital_skills: 'Digital Skills (%)',
    certified_workforce: 'Certified Workforce (%)'
  };
  return labels[metric];
};

// Get metric value as string
export const getMetricValue = (stateId: string, metric: StateMetric): string => {
  const state = stateWiseData[stateId];
  if (!state) return 'N/A';

  switch (metric) {
    case 'unemployment':
      return `${state.unemployment}%`;
    case 'employment_rate':
      return `${state.employmentRate}%`;
    case 'skill_density':
      return state.skillDensity.toString();
    case 'skill_gap':
      return state.skillGap.charAt(0).toUpperCase() + state.skillGap.slice(1);
    case 'digital_skills':
      return `${state.digitalSkills}%`;
    case 'certified_workforce':
      return `${state.certifiedWorkforce}%`;
    default:
      return 'N/A';
  }
};