export type Student = {
  id: string;
  name: string;
  grade: number;
  avatarUrl: string;
  attendance: number;
  averageScore: number;
  performance: Performance[];
  riskPrediction: RiskPrediction;
  parentEmail: string;
};

export type Performance = {
  subject: string;
  score: number;
  date: string;
};

export type RiskPrediction = {
  probability: number;
  level: 'Low' | 'Medium' | 'High';
  contributingFactors: {
    feature: string;
    impact: number;
  }[];
};

export type LearningResource = {
  id: string;
  title: string;
  type: 'Video' | 'Article' | 'Worksheet' | 'Interactive';
  url: string;
};
