import { apiRequest } from "./client";
import { CreatorPost } from "@/types/creator";

export interface UrlMetadataResult {
  url: string;
  platform: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  authorName?: string;
  success: boolean;
  message?: string;
}

export interface SuggestTagsResult {
  suggestedTags: string[];
  suggestedTools: string[];
  suggestedContentType: string;
  suggestedIndustry: string;
}

export async function fetchCreatorPosts(creatorId: string): Promise<CreatorPost[]> {
  return apiRequest<CreatorPost[]>(`/api/creators/${creatorId}/posts`);
}

export async function createCreatorPost(
  creatorId: string,
  postData: Partial<CreatorPost>
): Promise<CreatorPost> {
  return apiRequest<CreatorPost>(`/api/creators/${creatorId}/posts`, {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export async function updateCreatorPost(
  creatorId: string,
  postId: string,
  updates: Partial<CreatorPost>
): Promise<CreatorPost> {
  return apiRequest<CreatorPost>(`/api/creators/${creatorId}/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteCreatorPost(creatorId: string, postId: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/api/creators/${creatorId}/posts/${postId}`, {
    method: "DELETE",
  });
}

export async function extractUrlMetadata(url: string): Promise<UrlMetadataResult> {
  return apiRequest<UrlMetadataResult>("/api/tools/extract-url-metadata", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export async function suggestPostTags(title: string, description?: string): Promise<SuggestTagsResult> {
  return apiRequest<SuggestTagsResult>("/api/tools/suggest-post-tags", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
}
