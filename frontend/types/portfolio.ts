export interface WorkflowTool {
  name: string;
  kind: "model" | "app";
  version?: string;
}

export interface WorkflowStep {
  order: number;
  title: string;
  tool: string;
  description: string;
  minutes: number;
}

export interface WorkflowData {
  tools: WorkflowTool[];
  steps: WorkflowStep[];
  totalHours: number;
  promptText?: string;
  promptVisibility?: "public" | "private";
  referenceImageUrl?: string;
}

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
  workflow?: WorkflowData;
  styleDescription?: string;
  styleTags?: string[];
  trustTier?: "self-reported" | "link-checked" | "proof-backed" | "needs-proof";
  publishedAt?: string;
  createdAt?: string;
  isDemo?: boolean;
}

export interface WorkflowSuggestionPayload {
  title: string;
  description?: string;
  genre?: string;
  contentType?: string;
}

export interface WorkflowSuggestionResult {
  tools: WorkflowTool[];
  steps: WorkflowStep[];
  totalHours: number;
  suggestedPrompt?: string;
  rationale: string;
}
