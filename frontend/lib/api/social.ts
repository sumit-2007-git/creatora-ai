import { apiRequest } from "./client";
import { ExtractedSocialProfile, ManualImportRequest } from "@/types/social";

export async function importSocialProfile(data: ManualImportRequest): Promise<ExtractedSocialProfile> {
  return apiRequest<ExtractedSocialProfile>("/api/social/import", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function importSocialProfileVision(formData: FormData): Promise<ExtractedSocialProfile> {
  return apiRequest<ExtractedSocialProfile>("/api/social/import-vision", {
    method: "POST",
    body: formData,
  });
}

export async function confirmSocialImport(data: any): Promise<any> {
  return apiRequest("/api/social/confirm", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
