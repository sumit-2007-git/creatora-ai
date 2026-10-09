export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface RecommendationItem {
  creatorId: string;
  name: string;
  avatar: string;
  handle: string;
  roleTitle: string;
  matchPercentage: number;
  matchRationale: string;
  genres: string[];
  tools: string[];
  totalFollowers: string;
  engagementRate: string;
}

export interface RecommendationResponse {
  briefId?: string;
  campaignTitle?: string;
  recommendations: RecommendationItem[];
  aiRationale: string;
}
