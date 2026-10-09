export interface WeightedBreakdown {
  genreMatch: number;
  toolMatch: number;
  platformMatch: number;
  audienceMatch: number;
  budgetMatch: number;
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
