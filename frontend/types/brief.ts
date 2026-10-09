export type BriefStatus = "draft" | "open" | "in_review" | "completed";

export interface Brief {
  id: string;
  brandUid: string;
  brandName: string;
  brandLogo?: string;
  title: string;
  description: string;
  contentTypes: string[];
  platform?: string;
  aspectRatio?: string;
  style?: string;
  genres: string[];
  skills?: string[];
  budget: string;
  licensing?: string;
  deliverablesCount: number;
  deadline: string;
  targetAudience: string;
  preferredTools: string[];
  visualAesthetic: string;
  status: BriefStatus;
  applicantCount: number;
  shortlistedCount: number;
  aiEnhancedDetails?: Record<string, any>;
  isDemo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BriefApplication {
  id: string;
  briefId: string;
  creatorId: string;
  creatorUid: string;
  creatorName: string;
  creatorAvatar: string;
  brandUid: string;
  coverLetter: string;
  proposedRate?: string;
  status: "pending" | "shortlisted" | "accepted" | "declined";
  createdAt?: string;
}

export interface CreatorInquiry {
  id: string;
  creatorId: string;
  creatorUid: string;
  brandUid: string;
  brandName: string;
  brandLogo?: string;
  campaignTitle: string;
  message: string;
  budgetOffer?: string;
  timeline?: string;
  status: "pending" | "accepted" | "declined";
  createdAt?: string;
}
