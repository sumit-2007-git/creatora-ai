import { apiRequest } from "./client";
import { RelaxationResponse, LookAlikeResponse, SavedSearch } from "@/types/search";

export async function fetchFilterRelaxations(filters: Record<string, any>): Promise<RelaxationResponse> {
  return apiRequest<RelaxationResponse>("/api/recommendations/relaxations", {
    method: "POST",
    body: JSON.stringify({ filters }),
  });
}

export async function fetchLookAlikeMatches(payload: {
  imageUrl?: string;
  promptHint?: string;
  portfolioItemId?: string;
}): Promise<LookAlikeResponse> {
  return apiRequest<LookAlikeResponse>("/api/recommendations/lookalike", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchSavedSearches(brandId: string): Promise<SavedSearch[]> {
  return apiRequest<SavedSearch[]>(`/api/saved-searches?brandId=${encodeURIComponent(brandId)}`);
}

export async function saveSearchQuery(data: {
  brandId: string;
  title: string;
  filters: Record<string, any>;
}): Promise<SavedSearch> {
  return apiRequest<SavedSearch>("/api/saved-searches", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteSavedSearch(id: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/api/saved-searches?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
