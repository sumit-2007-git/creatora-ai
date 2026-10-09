import { apiRequest } from "./client";
import { RecommendationResponse } from "@/types/recommendation";

export async function fetchCreatorRecommendations(briefId?: string, genre?: string, tool?: string): Promise<RecommendationResponse> {
  const params: Record<string, string | undefined> = {};
  if (briefId) params.briefId = briefId;
  if (genre) params.genre = genre;
  if (tool) params.tool = tool;

  return apiRequest<RecommendationResponse>("/api/recommendations/creators", { params });
}

export async function matchBriefWithAI(payload: {
  briefId?: string;
  title?: string;
  description?: string;
  genres?: string[];
  contentTypes?: string[];
  preferredTools?: string[];
  targetAudience?: string;
  visualAesthetic?: string;
  budget?: string;
}): Promise<RecommendationResponse> {
  return apiRequest<RecommendationResponse>("/api/recommendations/match", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function enhanceBriefWithAI(payload: {
  idea?: string;
  title?: string;
  description?: string;
  category?: string;
}): Promise<any> {
  return apiRequest("/api/recommendations/enhance-brief", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
