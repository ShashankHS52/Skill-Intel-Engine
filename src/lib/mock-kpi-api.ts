import { KPIData } from '@/lib/kpi-types';

// Simplified KPI configuration without ReactNode icons
export interface SimpleKPIConfig {
  id: string;
  category: 'employment' | 'skills' | 'demographics' | 'risk';
  type: 'micro' | 'standard' | 'detailed' | 'regional' | 'composite';
  title: string;
  description?: string;
  iconName: string; // Icon name instead of ReactNode
  hasGeography: boolean;
  hasBreakdowns: boolean;
  hasChart: boolean;
  priority: 'high' | 'medium' | 'low';
  color: string;
}

// Mock API for KPI configurations
export const kpiConfigs: SimpleKPIConfig[] = [
  {
    id: 'working-age-population',
    category: 'demographics',
    type: 'micro',
    title: 'Working-Age Population (15-59)',
    description: 'Total working-age population in millions',
    iconName: 'users',
    hasGeography: true,
    hasBreakdowns: false,
    hasChart: true,
    priority: 'high',
    color: '#008080'
  },
  {
    id: 'lfpr',
    category: 'employment',
    type: 'detailed',
    title: 'Labour Force Participation Rate',
    description: 'Overall participation split by demographics',
    icon: <Briefcase className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: true,
    hasChart: true,
    priority: 'high',
    color: '#008080'
  },
  {
    id: 'employment-rate',
    category: 'employment',
    type: 'regional',
    title: 'Employment Rate',
    description: 'Regional employment distribution',
    icon: <TrendingUp className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: false,
    hasChart: true,
    priority: 'high',
    color: '#008080'
  },
  {
    id: 'neet-rate',
    category: 'demographics',
    type: 'detailed',
    title: 'NEET Rate (15-24)',
    description: 'Not in Education, Employment or Training',
    icon: <Target className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: true,
    hasChart: true,
    priority: 'medium',
    color: '#FF7F50'
  },
  {
    id: 'digital-skills',
    category: 'skills',
    type: 'detailed',
    title: 'Individuals with Digital Skills',
    description: 'Population with certified digital competencies',
    icon: <Zap className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: true,
    hasChart: true,
    priority: 'high',
    color: '#00A693'
  },
  {
    id: 'certified-workforce',
    category: 'skills',
    type: 'micro',
    title: 'Certified Skilled Workforce',
    description: 'Workers with formal skill certifications',
    icon: <Award className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: false,
    hasChart: true,
    priority: 'medium',
    color: '#00A693'
  },
  {
    id: 'multi-skilled-workforce',
    category: 'skills',
    type: 'detailed',
    title: 'Multi-Skilled Workforce',
    description: 'Workers with multiple skill certifications',
    icon: <Layers className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: true,
    hasChart: true,
    priority: 'medium',
    color: '#00A693'
  },
  {
    id: 'skill-density',
    category: 'skills',
    type: 'regional',
    title: 'Skill Density by Region',
    description: 'Concentration of skilled workforce by region',
    icon: <BookCheck className="h-4 w-4" />,
    hasGeography: true,
    hasBreakdowns: false,
    hasChart: true,
    priority: 'high',
    color: '#00A693'
  }
];

// Mock API for KPI data
export const kpiData: Record<string, KPIData> = {
  'working-age-population': {
    value: '890M',
    change: '+2.1%',
    changeType: 'positive',
    description: 'vs last year',
    geographic: {
      national: 890,
      regions: {
        north: 210,
        south: 185,
        east: 165,
        west: 195,
        central: 135
      }
    }
  },
  'lfpr': {
    value: '68.5%',
    change: '+2.3%',
    changeType: 'positive',
    description: 'vs last period',
    breakdowns: [
      { label: 'Male', value: 78.2, percentage: 78.2, color: '#008080' },
      { label: 'Female', value: 28.7, percentage: 28.7, color: '#00A693' },
      { label: 'Rural', value: 65.4, percentage: 65.4, color: '#4DCCCC' },
      { label: 'Urban', value: 72.1, percentage: 72.1, color: '#006666' }
    ],
    geographic: {
      national: 68.5,
      regions: {
        north: 72,
        south: 66,
        east: 65,
        west: 71,
        central: 67
      }
    }
  },
  'employment-rate': {
    value: '85.2%',
    change: '+1.8%',
    changeType: 'positive',
    description: 'national average',
    geographic: {
      national: 85.2,
      regions: {
        north: 87,
        south: 84,
        east: 82,
        west: 88,
        central: 85
      }
    }
  },
  'neet-rate': {
    value: '22.4%',
    change: '-2.5%',
    changeType: 'positive',
    description: 'vs last period',
    breakdowns: [
      { label: 'Male (15-24)', value: 18.5, percentage: 18.5, color: '#008080' },
      { label: 'Female (15-24)', value: 26.8, percentage: 26.8, color: '#00A693' },
      { label: 'Rural Youth', value: 25.2, percentage: 25.2, color: '#FF7F50' },
      { label: 'Urban Youth', value: 19.1, percentage: 19.1, color: '#4DCCCC' }
    ],
    geographic: {
      national: 22.4,
      regions: {
        north: 24,
        south: 20,
        east: 26,
        west: 19,
        central: 23
      }
    }
  },
  'digital-skills': {
    value: '42.7%',
    change: '+15.3%',
    changeType: 'positive',
    description: 'of working population',
    breakdowns: [
      { label: 'Basic Digital Literacy', value: 67.2, percentage: 67.2, color: '#00A693' },
      { label: 'Intermediate Skills', value: 34.5, percentage: 34.5, color: '#008080' },
      { label: 'Advanced Skills', value: 12.8, percentage: 12.8, color: '#4DCCCC' },
      { label: 'Programming/Tech', value: 8.4, percentage: 8.4, color: '#006666' }
    ],
    geographic: {
      national: 42.7,
      regions: {
        north: 38,
        south: 52,
        east: 35,
        west: 48,
        central: 40
      }
    }
  },
  'certified-workforce': {
    value: '28.9M',
    change: '+8.7%',
    changeType: 'positive',
    description: 'certified professionals',
    geographic: {
      national: 28.9,
      regions: {
        north: 7.2,
        south: 8.1,
        east: 5.8,
        west: 4.9,
        central: 2.9
      }
    }
  },
  'multi-skilled-workforce': {
    value: '15.6M',
    change: '+12.4%',
    changeType: 'positive',
    description: 'with multiple certifications',
    breakdowns: [
      { label: '2 Skills', value: 68.5, percentage: 68.5, color: '#00A693' },
      { label: '3 Skills', value: 24.3, percentage: 24.3, color: '#008080' },
      { label: '4+ Skills', value: 7.2, percentage: 7.2, color: '#4DCCCC' }
    ],
    geographic: {
      national: 15.6,
      regions: {
        north: 3.8,
        south: 4.2,
        east: 2.9,
        west: 3.1,
        central: 1.6
      }
    }
  },
  'skill-density': {
    value: '3.2',
    change: '+0.4',
    changeType: 'positive',
    description: 'skills per worker (national avg)',
    geographic: {
      national: 3.2,
      regions: {
        north: 3.1,
        south: 3.8,
        east: 2.9,
        west: 3.4,
        central: 2.8
      }
    }
  }
};

// API simulation functions
export const fetchKPIConfig = async (id: string): Promise<KPIConfig | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return kpiConfigs.find(config => config.id === id) || null;
};

export const fetchKPIData = async (id: string): Promise<KPIData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return kpiData[id] || null;
};

export const fetchAllKPIs = async (): Promise<{ configs: KPIConfig[], data: Record<string, KPIData> }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    configs: kpiConfigs,
    data: kpiData
  };
};