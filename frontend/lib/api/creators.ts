import { apiRequest } from "./client";
import { Creator, CreatorFilterParams } from "@/types/creator";
import { CreatorInquiry } from "@/types/brief";

export async function fetchCreators(filters?: CreatorFilterParams): Promise<Creator[]> {
  const params: Record<string, string | undefined> = {};
  if (filters?.q) params.q = filters.q;
  if (filters?.genre) params.genre = filters.genre;
  if (filters?.contentType) params.contentType = filters.contentType;
  if (filters?.tool) params.tool = filters.tool;
  if (filters?.platform) params.platform = filters.platform;
  if (filters?.specialization) params.specialization = filters.specialization;
  if (filters?.availability) params.availability = filters.availability;
  if (filters?.sortBy) params.sortBy = filters.sortBy;

  return apiRequest<Creator[]>("/api/creators", { params });
}

export async function fetchCreatorById(id: string): Promise<Creator> {
  return apiRequest<Creator>(`/api/creators/${id}`);
}

export async function onboardCreator(data: Partial<Creator>): Promise<Creator> {
  return apiRequest<Creator>("/api/creators", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCreatorProfile(creatorId: string, data: Partial<Creator>): Promise<Creator> {
  return apiRequest<Creator>(`/api/creators/${creatorId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function toggleSaveCreator(creatorId: string): Promise<{ creatorId: string; saved: boolean }> {
  return apiRequest(`/api/creators/${creatorId}/save`, {
    method: "POST",
  });
}

export async function fetchSavedCreatorIds(): Promise<string[]> {
  return apiRequest<string[]>("/api/creators/saved/list");
}

export async function sendInquiry(creatorId: string, payload: {
  campaignTitle: string;
  message: string;
  budgetOffer?: string;
  timeline?: string;
}): Promise<CreatorInquiry> {
  return apiRequest<CreatorInquiry>(`/api/creators/${creatorId}/inquire`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchCreatorInquiries(creatorId: string): Promise<CreatorInquiry[]> {
  return apiRequest<CreatorInquiry[]>(`/api/creators/${creatorId}/inquiries`);
}

export async function updateInquiryStatus(creatorId: string, inquiryId: string, status: string): Promise<any> {
  return apiRequest(`/api/creators/${creatorId}/inquiries/${inquiryId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
