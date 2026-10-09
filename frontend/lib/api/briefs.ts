import { apiRequest } from "./client";
import { Brief, BriefApplication } from "@/types/brief";

export async function fetchBriefs(filters?: { status?: string; genre?: string; contentType?: string }): Promise<Brief[]> {
  const params: Record<string, string | undefined> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.genre) params.genre = filters.genre;
  if (filters?.contentType) params.contentType = filters.contentType;

  return apiRequest<Brief[]>("/api/briefs", { params });
}

export async function fetchBriefById(id: string): Promise<Brief> {
  return apiRequest<Brief>(`/api/briefs/${id}`);
}

export async function createBrief(data: Partial<Brief>): Promise<Brief> {
  return apiRequest<Brief>("/api/briefs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBrief(id: string, data: Partial<Brief>): Promise<Brief> {
  return apiRequest<Brief>(`/api/briefs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function applyToBrief(briefId: string, payload: {
  creatorId: string;
  coverLetter: string;
  proposedRate?: string;
  relevantPortfolioIds?: string[];
}): Promise<BriefApplication> {
  return apiRequest<BriefApplication>(`/api/briefs/${briefId}/apply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchBriefApplications(briefId: string): Promise<BriefApplication[]> {
  return apiRequest<BriefApplication[]>(`/api/briefs/${briefId}/applications`);
}

export async function updateApplicationStatus(briefId: string, appId: string, status: string): Promise<any> {
  return apiRequest(`/api/briefs/${briefId}/applications/${appId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
