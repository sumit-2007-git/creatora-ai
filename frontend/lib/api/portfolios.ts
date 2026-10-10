import { apiRequest } from "./client";
import { PortfolioItem, WorkflowSuggestionPayload, WorkflowSuggestionResult } from "@/types/portfolio";

export async function fetchPortfolios(filters?: { creatorId?: string; genre?: string; contentType?: string }): Promise<PortfolioItem[]> {
  const params: Record<string, string | undefined> = {};
  if (filters?.creatorId) params.creatorId = filters.creatorId;
  if (filters?.genre) params.genre = filters.genre;
  if (filters?.contentType) params.contentType = filters.contentType;

  return apiRequest<PortfolioItem[]>("/api/portfolios", { params });
}

export async function createPortfolioItem(data: Partial<PortfolioItem>): Promise<PortfolioItem> {
  return apiRequest<PortfolioItem>("/api/portfolios", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function uploadPortfolioMedia(formData: FormData): Promise<PortfolioItem> {
  return apiRequest<PortfolioItem>("/api/portfolios/upload", {
    method: "POST",
    body: formData,
  });
}

export async function deletePortfolioItem(id: string): Promise<any> {
  return apiRequest(`/api/portfolios/${id}`, {
    method: "DELETE",
  });
}

export async function suggestPortfolioWorkflow(payload: WorkflowSuggestionPayload): Promise<WorkflowSuggestionResult> {
  return apiRequest<WorkflowSuggestionResult>("/api/portfolios/suggest-workflow", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
