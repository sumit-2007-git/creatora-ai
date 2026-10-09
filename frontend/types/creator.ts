export interface Creator {
  creatorId: string;
  uid: string;
  name: string;
  handle: string;
  email?: string;
  roleTitle: string;
  bio: string;
  avatar: string;
  coverImage: string;
  location: string;
  verified: boolean;
  genres: string[];
  specializations: string[];
  skills: string[];
  contentTypes: string[];
  tools: string[];
  platforms?: string[];
  rate: string;
  totalFollowers: number;
  monthlyViews: number;
  engagementRate: number;
  postsCount: number;
  commercialAvailability?: string;
  isSelfReported?: boolean;
  aiSummary: string;
  strengths?: string[];
  bestForCategories?: string[];
  instagram?: {
    username: string;
    followers: number;
    posts?: number;
    avgViews?: number;
    avgLikes?: number;
    engagementRate?: number;
  };
  youtube?: {
    channelName: string;
    subscribers: number;
    totalViews?: number;
    monthlyViews?: number;
    videos?: number;
  };
  isDemo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatorFilterParams {
  q?: string;
  genre?: string;
  contentType?: string;
  tool?: string;
  platform?: string;
  specialization?: string;
  availability?: string;
  sortBy?: "relevance" | "followers" | "engagement";
}
