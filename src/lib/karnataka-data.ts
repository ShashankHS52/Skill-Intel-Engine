// Karnataka district-wise workforce data
export interface DistrictData {
  id: string;
  name: string;
  unemployment: number;
  employmentRate: number;
  skillDensity: number;
  workingPopulation: number; // in thousands
  skillGap: 'low' | 'medium' | 'high';
  digitalSkills: number;
  certifiedWorkforce: number;
  majorSectors: string[];
  emergingSkills: string[];
}

export const karnatakaDistrictData: Record<string, DistrictData> = {
  'bagalkot': {
    id: 'bagalkot',
    name: 'Bagalkot',
    unemployment: 5.2,
    employmentRate: 85.8,
    skillDensity: 2.8,
    workingPopulation: 850,
    skillGap: 'medium',
    digitalSkills: 42.3,
    certifiedWorkforce: 28.7,
    majorSectors: ['Agriculture', 'Textiles', 'Mining'],
    emergingSkills: ['Digital Marketing', 'Farm Mechanization', 'Quality Control']
  },
  'ballary': {
    id: 'ballary',
    name: 'Ballary',
    unemployment: 6.1,
    employmentRate: 84.2,
    skillDensity: 3.1,
    workingPopulation: 1200,
    skillGap: 'high',
    digitalSkills: 38.9,
    certifiedWorkforce: 24.6,
    majorSectors: ['Mining', 'Steel', 'Agriculture'],
    emergingSkills: ['Industrial Automation', 'Environmental Management', 'Mining Technology']
  },
  'belagavi': {
    id: 'belagavi',
    name: 'Belagavi',
    unemployment: 4.8,
    employmentRate: 86.7,
    skillDensity: 3.4,
    workingPopulation: 2100,
    skillGap: 'medium',
    digitalSkills: 51.2,
    certifiedWorkforce: 35.8,
    majorSectors: ['Agriculture', 'Manufacturing', 'Defence'],
    emergingSkills: ['Precision Agriculture', 'Defence Technology', 'Supply Chain Management']
  },
  'bengaluru-rural': {
    id: 'bengaluru-rural',
    name: 'Bengaluru Rural',
    unemployment: 3.2,
    employmentRate: 92.1,
    skillDensity: 4.6,
    workingPopulation: 850,
    skillGap: 'low',
    digitalSkills: 78.4,
    certifiedWorkforce: 68.2,
    majorSectors: ['IT Services', 'Agriculture', 'Horticulture'],
    emergingSkills: ['Cloud Computing', 'AI/ML', 'Agri-tech', 'Data Analytics']
  },
  'bengaluru-urban': {
    id: 'bengaluru-urban',
    name: 'Bengaluru Urban',
    unemployment: 2.8,
    employmentRate: 94.3,
    skillDensity: 4.9,
    workingPopulation: 8200,
    skillGap: 'low',
    digitalSkills: 89.7,
    certifiedWorkforce: 82.1,
    majorSectors: ['IT/Software', 'Biotechnology', 'Aerospace', 'R&D'],
    emergingSkills: ['Artificial Intelligence', 'Blockchain', 'Cybersecurity', 'DevOps', 'Full Stack Development']
  },
  'bidar': {
    id: 'bidar',
    name: 'Bidar',
    unemployment: 7.3,
    employmentRate: 82.1,
    skillDensity: 2.4,
    workingPopulation: 750,
    skillGap: 'high',
    digitalSkills: 31.8,
    certifiedWorkforce: 19.4,
    majorSectors: ['Agriculture', 'Handlooms', 'Small Industries'],
    emergingSkills: ['E-commerce', 'Rural Banking', 'Handicraft Design']
  },
  'chamarajanagar': {
    id: 'chamarajanagar',
    name: 'Chamarajanagar',
    unemployment: 6.8,
    employmentRate: 83.4,
    skillDensity: 2.6,
    workingPopulation: 520,
    skillGap: 'high',
    digitalSkills: 35.7,
    certifiedWorkforce: 22.1,
    majorSectors: ['Agriculture', 'Silk', 'Tourism'],
    emergingSkills: ['Eco-tourism', 'Sericulture Technology', 'Organic Farming']
  },
  'chikkaballapur': {
    id: 'chikkaballapur',
    name: 'Chikkaballapur',
    unemployment: 4.1,
    employmentRate: 88.9,
    skillDensity: 3.8,
    workingPopulation: 680,
    skillGap: 'medium',
    digitalSkills: 58.3,
    certifiedWorkforce: 41.7,
    majorSectors: ['Horticulture', 'Floriculture', 'Sericulture'],
    emergingSkills: ['Greenhouse Technology', 'Post-harvest Management', 'Export Documentation']
  },
  'chikkamagaluru': {
    id: 'chikkamagaluru',
    name: 'Chikkamagaluru',
    unemployment: 5.4,
    employmentRate: 85.9,
    skillDensity: 3.2,
    workingPopulation: 620,
    skillGap: 'medium',
    digitalSkills: 46.8,
    certifiedWorkforce: 32.4,
    majorSectors: ['Coffee', 'Tourism', 'Iron Ore'],
    emergingSkills: ['Coffee Processing', 'Adventure Tourism', 'Sustainable Mining']
  },
  'chitradurga': {
    id: 'chitradurga',
    name: 'Chitradurga',
    unemployment: 5.9,
    employmentRate: 84.6,
    skillDensity: 2.9,
    workingPopulation: 890,
    skillGap: 'medium',
    digitalSkills: 41.2,
    certifiedWorkforce: 27.8,
    majorSectors: ['Agriculture', 'Mining', 'Textiles'],
    emergingSkills: ['Dryland Farming', 'Renewable Energy', 'Textile Design']
  },
  'dakshina-kannada': {
    id: 'dakshina-kannada',
    name: 'Dakshina Kannada',
    unemployment: 3.6,
    employmentRate: 90.2,
    skillDensity: 4.2,
    workingPopulation: 1150,
    skillGap: 'low',
    digitalSkills: 72.6,
    certifiedWorkforce: 58.9,
    majorSectors: ['Banking', 'Education', 'Healthcare', 'Port Operations'],
    emergingSkills: ['Financial Technology', 'Healthcare IT', 'Maritime Logistics', 'Digital Banking']
  },
  'dharwad': {
    id: 'dharwad',
    name: 'Dharwad',
    unemployment: 4.3,
    employmentRate: 87.8,
    skillDensity: 3.9,
    workingPopulation: 980,
    skillGap: 'medium',
    digitalSkills: 62.4,
    certifiedWorkforce: 47.3,
    majorSectors: ['Education', 'Agriculture', 'Textiles'],
    emergingSkills: ['EdTech', 'Research & Development', 'Sustainable Agriculture']
  },
  'gadag': {
    id: 'gadag',
    name: 'Gadag',
    unemployment: 5.7,
    employmentRate: 85.1,
    skillDensity: 2.7,
    workingPopulation: 540,
    skillGap: 'medium',
    digitalSkills: 39.8,
    certifiedWorkforce: 26.4,
    majorSectors: ['Agriculture', 'Handlooms', 'Small Scale Industries'],
    emergingSkills: ['Textile Technology', 'Food Processing', 'Rural Entrepreneurship']
  },
  'hassan': {
    id: 'hassan',
    name: 'Hassan',
    unemployment: 4.7,
    employmentRate: 86.9,
    skillDensity: 3.5,
    workingPopulation: 890,
    skillGap: 'medium',
    digitalSkills: 53.7,
    certifiedWorkforce: 38.6,
    majorSectors: ['Agriculture', 'Coffee', 'Temples & Tourism'],
    emergingSkills: ['Heritage Tourism', 'Coffee Export', 'Temple Architecture']
  },
  'haveri': {
    id: 'haveri',
    name: 'Haveri',
    unemployment: 5.3,
    employmentRate: 85.4,
    skillDensity: 3.0,
    workingPopulation: 720,
    skillGap: 'medium',
    digitalSkills: 44.1,
    certifiedWorkforce: 30.7,
    majorSectors: ['Agriculture', 'Handlooms', 'Paper Mills'],
    emergingSkills: ['Sustainable Agriculture', 'Handicraft Export', 'Paper Technology']
  },
  'kalaburagi': {
    id: 'kalaburagi',
    name: 'Kalaburagi',
    unemployment: 6.4,
    employmentRate: 83.8,
    skillDensity: 3.1,
    workingPopulation: 1380,
    skillGap: 'high',
    digitalSkills: 43.2,
    certifiedWorkforce: 28.9,
    majorSectors: ['Agriculture', 'Cement', 'Mining'],
    emergingSkills: ['Construction Technology', 'Agricultural Mechanization', 'Industrial Safety']
  },
  'kodagu': {
    id: 'kodagu',
    name: 'Kodagu',
    unemployment: 3.9,
    employmentRate: 89.1,
    skillDensity: 4.1,
    workingPopulation: 290,
    skillGap: 'low',
    digitalSkills: 64.8,
    certifiedWorkforce: 49.2,
    majorSectors: ['Coffee', 'Tourism', 'Spices'],
    emergingSkills: ['Eco-tourism', 'Specialty Coffee', 'Adventure Sports', 'Hospitality Management']
  },
  'kolar': {
    id: 'kolar',
    name: 'Kolar',
    unemployment: 4.5,
    employmentRate: 87.2,
    skillDensity: 3.6,
    workingPopulation: 780,
    skillGap: 'medium',
    digitalSkills: 55.9,
    certifiedWorkforce: 40.3,
    majorSectors: ['IT Services', 'Agriculture', 'Dairy'],
    emergingSkills: ['Software Testing', 'Precision Agriculture', 'Dairy Technology']
  },
  'koppal': {
    id: 'koppal',
    name: 'Koppal',
    unemployment: 6.2,
    employmentRate: 84.1,
    skillDensity: 2.5,
    workingPopulation: 650,
    skillGap: 'high',
    digitalSkills: 37.4,
    certifiedWorkforce: 23.8,
    majorSectors: ['Agriculture', 'Handlooms', 'Mining'],
    emergingSkills: ['Water Management', 'Solar Energy', 'Cooperative Banking']
  },
  'mandya': {
    id: 'mandya',
    name: 'Mandya',
    unemployment: 5.1,
    employmentRate: 86.3,
    skillDensity: 3.3,
    workingPopulation: 980,
    skillGap: 'medium',
    digitalSkills: 48.6,
    certifiedWorkforce: 34.2,
    majorSectors: ['Agriculture', 'Sugar', 'Silk'],
    emergingSkills: ['Sugar Technology', 'Irrigation Management', 'Sericulture Development']
  },
  'mysuru': {
    id: 'mysuru',
    name: 'Mysuru',
    unemployment: 3.4,
    employmentRate: 91.6,
    skillDensity: 4.4,
    workingPopulation: 1650,
    skillGap: 'low',
    digitalSkills: 74.3,
    certifiedWorkforce: 61.8,
    majorSectors: ['Tourism', 'IT', 'Sandalwood', 'Silk', 'Education'],
    emergingSkills: ['Cultural Tourism', 'Software Development', 'Digital Marketing', 'Heritage Management']
  },
  'raichur': {
    id: 'raichur',
    name: 'Raichur',
    unemployment: 6.9,
    employmentRate: 83.2,
    skillDensity: 2.6,
    workingPopulation: 920,
    skillGap: 'high',
    digitalSkills: 36.1,
    certifiedWorkforce: 21.7,
    majorSectors: ['Agriculture', 'Cement', 'Thermal Power'],
    emergingSkills: ['Power Plant Operation', 'Irrigation Technology', 'Rural Development']
  },
  'ramanagara': {
    id: 'ramanagara',
    name: 'Ramanagara',
    unemployment: 4.2,
    employmentRate: 88.4,
    skillDensity: 3.7,
    workingPopulation: 560,
    skillGap: 'medium',
    digitalSkills: 56.8,
    certifiedWorkforce: 42.1,
    majorSectors: ['Silk', 'Agriculture', 'Granite'],
    emergingSkills: ['Silk Processing', 'Stone Processing', 'Film Tourism']
  },
  'shivamogga': {
    id: 'shivamogga',
    name: 'Shivamogga',
    unemployment: 4.9,
    employmentRate: 86.5,
    skillDensity: 3.4,
    workingPopulation: 890,
    skillGap: 'medium',
    digitalSkills: 52.3,
    certifiedWorkforce: 37.9,
    majorSectors: ['Iron & Steel', 'Paper', 'Agriculture'],
    emergingSkills: ['Metallurgy', 'Forest Management', 'Renewable Energy']
  },
  'tumakuru': {
    id: 'tumakuru',
    name: 'Tumakuru',
    unemployment: 3.8,
    employmentRate: 89.7,
    skillDensity: 4.0,
    workingPopulation: 1250,
    skillGap: 'low',
    digitalSkills: 67.2,
    certifiedWorkforce: 52.4,
    majorSectors: ['Aerospace', 'Textiles', 'Agriculture'],
    emergingSkills: ['Aerospace Engineering', 'Advanced Manufacturing', 'Precision Agriculture']
  },
  'udupi': {
    id: 'udupi',
    name: 'Udupi',
    unemployment: 3.1,
    employmentRate: 92.3,
    skillDensity: 4.3,
    workingPopulation: 640,
    skillGap: 'low',
    digitalSkills: 76.9,
    certifiedWorkforce: 63.7,
    majorSectors: ['Banking', 'Education', 'Hospitality', 'Fisheries'],
    emergingSkills: ['Financial Services', 'Culinary Arts', 'Marine Technology', 'Hotel Management']
  },
  'uttara-kannada': {
    id: 'uttara-kannada',
    name: 'Uttara Kannada',
    unemployment: 4.6,
    employmentRate: 87.1,
    skillDensity: 3.8,
    workingPopulation: 780,
    skillGap: 'medium',
    digitalSkills: 59.4,
    certifiedWorkforce: 44.6,
    majorSectors: ['Spices', 'Cashew', 'Fisheries', 'Tourism'],
    emergingSkills: ['Spice Processing', 'Coastal Tourism', 'Aquaculture', 'Forest Conservation']
  },
  'vijayapura': {
    id: 'vijayapura',
    name: 'Vijayapura',
    unemployment: 5.8,
    employmentRate: 84.7,
    skillDensity: 2.9,
    workingPopulation: 1180,
    skillGap: 'medium',
    digitalSkills: 40.7,
    certifiedWorkforce: 27.3,
    majorSectors: ['Agriculture', 'Textiles', 'Sugar'],
    emergingSkills: ['Cotton Technology', 'Sugar Processing', 'Water Conservation']
  },
  'yadgir': {
    id: 'yadgir',
    name: 'Yadgir',
    unemployment: 7.1,
    employmentRate: 82.6,
    skillDensity: 2.3,
    workingPopulation: 480,
    skillGap: 'high',
    digitalSkills: 33.2,
    certifiedWorkforce: 18.9,
    majorSectors: ['Agriculture', 'Handlooms', 'Mining'],
    emergingSkills: ['Dryland Farming', 'Mineral Processing', 'Rural Finance']
  }
};

// Karnataka state overview data
export const karnatakaOverview = {
  name: 'Karnataka',
  capital: 'Bengaluru',
  totalDistricts: 31,
  totalWorkingPopulation: 32.4, // in millions
  averageUnemployment: 4.1,
  averageEmploymentRate: 88.9,
  averageDigitalSkills: 69.8,
  averageCertifiedWorkforce: 54.7,
  topSectors: ['IT/Software', 'Agriculture', 'Aerospace', 'Biotechnology', 'Textiles'],
  keyStrengths: [
    'Leading IT hub in India',
    'Strong educational institutions',
    'Diverse industrial base',
    'High skilled workforce in urban areas',
    'Government support for startups'
  ],
  challenges: [
    'Rural-urban skill divide',
    'Agricultural sector modernization',
    'Infrastructure development in tier-2 cities',
    'Youth employment in rural areas'
  ]
};

// Helper functions for Karnataka data
export type DistrictMetric = 'unemployment' | 'employment_rate' | 'skill_density' | 'skill_gap' | 'digital_skills' | 'certified_workforce';

export const getDistrictColor = (districtId: string, metric: DistrictMetric): string => {
  const district = karnatakaDistrictData[districtId];
  if (!district) return '#E0F8F8';

  let value: number;
  let isInverted = false; // true for metrics where lower is better

  switch (metric) {
    case 'unemployment':
      value = district.unemployment;
      isInverted = true;
      break;
    case 'employment_rate':
      value = district.employmentRate;
      break;
    case 'skill_density':
      value = district.skillDensity;
      break;
    case 'skill_gap':
      return district.skillGap === 'low' ? '#00A693' : 
             district.skillGap === 'medium' ? '#FFB399' : '#FF7F50';
    case 'digital_skills':
      value = district.digitalSkills;
      break;
    case 'certified_workforce':
      value = district.certifiedWorkforce;
      break;
    default:
      return '#E0F8F8';
  }

  // Color intensity calculation
  const getColorIntensity = (val: number, min: number, max: number): string => {
    const normalized = (val - min) / (max - min);
    const intensity = Math.max(0, Math.min(1, normalized));
    
    if (isInverted) {
      if (intensity > 0.7) return '#FF7F50'; // High (bad)
      if (intensity > 0.4) return '#FFB399'; // Medium
      return '#00A693'; // Low (good)
    } else {
      if (intensity > 0.7) return '#00A693'; // High (good)
      if (intensity > 0.4) return '#4DCCCC'; // Medium
      return '#FFB399'; // Low (needs improvement)
    }
  };

  // Define ranges for each metric
  const ranges: Record<string, { min: number; max: number }> = {
    unemployment: { min: 2.5, max: 7.5 },
    employment_rate: { min: 82, max: 95 },
    skill_density: { min: 2, max: 5 },
    digital_skills: { min: 30, max: 90 },
    certified_workforce: { min: 15, max: 85 }
  };

  const range = ranges[metric];
  return getColorIntensity(value, range.min, range.max);
};

export const getDistrictMetricLabel = (metric: DistrictMetric): string => {
  const labels: Record<DistrictMetric, string> = {
    unemployment: 'Unemployment Rate (%)',
    employment_rate: 'Employment Rate (%)',
    skill_density: 'Skill Density Score',
    skill_gap: 'Skill Gap Level',
    digital_skills: 'Digital Skills (%)',
    certified_workforce: 'Certified Workforce (%)'
  };
  return labels[metric];
};

export const getDistrictMetricValue = (districtId: string, metric: DistrictMetric): string => {
  const district = karnatakaDistrictData[districtId];
  if (!district) return 'N/A';

  switch (metric) {
    case 'unemployment':
      return `${district.unemployment}%`;
    case 'employment_rate':
      return `${district.employmentRate}%`;
    case 'skill_density':
      return district.skillDensity.toString();
    case 'skill_gap':
      return district.skillGap.charAt(0).toUpperCase() + district.skillGap.slice(1);
    case 'digital_skills':
      return `${district.digitalSkills}%`;
    case 'certified_workforce':
      return `${district.certifiedWorkforce}%`;
    default:
      return 'N/A';
  }
};