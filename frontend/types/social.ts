export interface ExtractedSocialProfile {
  handle: string;
  category: string;
  specializations: string[];
  skills: string[];
  tools: string[];
  contentTypes: string[];
  totalFollowers: number;
  monthlyViews: number;
  engagementRate: number;
  audienceSummary: string;
  suggestedBio: string;
  suggestedRate: string;
  configured?: boolean;
  warning?: string;
}

export interface ManualImportRequest {
  handle: string;
  bio?: string;
  followers?: string;
  avgLikes?: string;
  avgViews?: string;
  captions?: string;
}
