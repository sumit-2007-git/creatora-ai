export interface WeightedBreakdown {
  genreMatch: number;
  toolMatch: number;
  platformMatch: number;
  audienceMatch: number;
  budgetMatch: number;
  trustMatch?: number;
}

export interface CreatorRecommendation {
  creatorId: string;
  name: string;
  avatar: string;
  handle: string;
  roleTitle: string;
  matchPercentage: number;
  matchRationale: string;
  tier?: "Top Match" | "Relevant" | "Moderate" | "Weak";
  weightedBreakdown?: WeightedBreakdown;
  genres: string[];
  tools: string[];
  totalFollowers: string;
  engagementRate: string;
  strengths?: string[];
  bestForCategories?: string[];
  commercialAvailability?: string;
  rate?: string;
}

export interface RecommendationResponse {
  briefId?: string;
  campaignTitle?: string;
  recommendations: CreatorRecommendation[];
  aiRationale: string;
}

export interface StructuredSearchQuery {
  industry?: string;
  contentType?: string;
  style?: string;
  platform?: string;
  skills: string[];
  tools: string[];
  budgetRange?: string;
  licensingNeed?: string;
  minFollowers?: number;
  minEngagementRate?: number;
}

export interface AISearchResultItem {
  creatorId: string;
  name: string;
  avatar: string;
  handle: string;
  roleTitle: string;
  matchPercentage: number;
  tier: string;
  whyThisCreator: string;
  weightedBreakdown: WeightedBreakdown;
  genres: string[];
  tools: string[];
  totalFollowers: string;
  engagementRate: string;
  rate: string;
  commercialAvailability: string;
  featuredPostUrl?: string;
}

export interface AISearchResponse {
  query: string;
  structuredQuery: StructuredSearchQuery;
  isBasicMode: boolean;
  aiRationale: string;
  results: AISearchResultItem[];
}

export interface DreamTeamMember {
  creatorId: string;
  name: string;
  avatar: string;
  handle: string;
  assignedRole: string;
  primaryTool: string;
  keyStrength: string;
  followers: string;
  engagementRate: string;
  rate: string;
}

export interface DreamTeamResponse {
  briefId?: string;
  campaignTitle: string;
  teamName: string;
  synergyScore: number;
  collectiveReach: string;
  estimatedBudget: string;
  turnaroundTime: string;
  members: DreamTeamMember[];
  squadStrategy: string;
}

