export type TrainingProgram = {
  id: string;
  name: string;
  region: string;
  alignmentScore: number;
  status: 'Aligned' | 'Needs Review' | 'Pending';
};

export type DataQualityIssue = {
  id: string;
  type: 'Duplicate Profile' | 'Incomplete Registration' | 'Low Confidence Skill';
  details: string;
  priority: 'High' | 'Medium' | 'Low';
};
