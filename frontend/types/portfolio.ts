export interface PortfolioItem {
  id: string;
  creatorId: string;
  uid: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  contentType: string;
  genre: string;
  toolsUsed: string[];
  views: string;
  likes: string;
  aiTags: string[];
  publishedAt?: string;
  createdAt?: string;
}
