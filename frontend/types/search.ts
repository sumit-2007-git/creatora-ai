export interface RelaxationSuggestion {
  filterKey: string;
  filterValue: any;
  label: string;
  newCount: number;
  gain: number;
}

export interface NearestMatchCreator {
  creator: any;
  unmetCriteria: string[];
  matchPercentage: number;
}

export interface RelaxationResponse {
  currentCount: number;
  suggestions: RelaxationSuggestion[];
  nearestMatches: NearestMatchCreator[];
}

export interface StyleAnalysis {
  style_description: string;
  aesthetic_keywords: string[];
  suggested_genres: string[];
  detected_tools: string[];
  dominant_mood: string;
}

export interface LookAlikeMatch {
  creatorId: string;
  creatorName: string;
  avatar: string;
  handle: string;
  similarityScore: number;
  matchedStyleTags: string[];
  samplePieceUrl?: string;
  samplePieceTitle?: string;
  explanation: string;
}

export interface LookAlikeResponse {
  referenceStyle: StyleAnalysis;
  matches: LookAlikeMatch[];
}

export interface SavedSearch {
  id: string;
  brandId: string;
  title: string;
  filters: Record<string, any>;
  createdAt: string;
}
