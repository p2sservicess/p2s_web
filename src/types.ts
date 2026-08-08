export interface ProblemSolutionPair {
  id: string;
  category: string;
  problem: string;
  problemDetail: string;
  solution: string;
  solutionDetail: string;
  keyDeliverables: string[];
  roiMetric: string;
  iconName: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface SocialPackage {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  popular?: boolean;
  color: string;
  features: PackageFeature[];
  platforms: string[];
  deliverablesSummary: string;
}

export interface CustomPackageConfig {
  platforms: string[];
  postFrequency: number; // posts per week
  reelsCount: number; // reels per month
  adManagement: boolean;
  adSpendTier: string;
  brandIdentity: boolean;
  communityManagement: boolean;
  analyticsReporting: 'standard' | 'advanced' | 'realtime_dashboard';
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  badge: string;
  overview: string;
  processSteps: { step: string; title: string; description: string }[];
  deliverables: string[];
  toolsUsed: string[];
  impactMetric: string;
  impactLabel: string;
}

export interface IntakeFormState {
  step: number;
  primaryChallenge: string;
  industry: string;
  currentFollowersOrAdSpend: string;
  targetTimeline: string;
  budgetRange: string;
  selectedPackageId?: string;
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl?: string;
  additionalNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendation?: {
    recommendedPackage: string;
    actionPlan: string[];
    estimatedRoi: string;
  };
}
