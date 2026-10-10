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

export interface CreatorPost {
  id: string;
  creatorId: string;
  creatorUid?: string;
  title: string;
  description?: string;
  originalUrl: string;
  platform: string;
  thumbnailUrl?: string;
  tags?: string[];
  toolsUsed?: string[];
  contentType?: string;
  industry?: string;
  viewsCount?: number;
  likesCount?: number;
  isPinned?: boolean;
  orderIndex?: number;
  isSelfReported?: boolean;
  createdAt: string;
  updatedAt?: string;
  isDemo?: boolean;
}

export interface SwipeDeckItem extends Creator {
  matchPercentage: number;
  tier: string;
  weightedBreakdown: {
    genreMatch: number;
    toolMatch: number;
    platformMatch: number;
    audienceMatch: number;
    budgetMatch: number;
  };
}

export interface NotificationItem {
  id: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorUid?: string;
  briefId?: string;
  briefTitle?: string;
  introMessage: string;
  link: string;
  isRead: boolean;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  isDemo?: boolean;
}

export interface MatchItem {
  id: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  creatorRole?: string;
  briefId?: string;
  briefTitle?: string;
  status: "accepted";
  createdAt: string;
  isDemo?: boolean;
  projectThreadId?: string;
}

