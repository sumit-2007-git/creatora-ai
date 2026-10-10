import { apiRequest } from "./client";
import { TrustProfile, TrustClaim } from "@/types/creator";

export async function fetchCreatorTrustProfile(creatorId: string): Promise<TrustProfile> {
  return apiRequest<TrustProfile>(`/api/trust/creator/${creatorId}`);
}

export async function verifyProofClaim(data: {
  creatorId: string;
  claimId?: string;
  claimText: string;
  claimedTool?: string;
  proofImageUrl: string;
  pieceOutputUrl?: string;
}): Promise<any> {
  return apiRequest("/api/trust/verify-proof", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyWorkLink(params: {
  creatorId: string;
  postUrl: string;
  claimedTitle?: string;
}): Promise<any> {
  return apiRequest("/api/trust/link-check", {
    method: "POST",
    params,
  });
}
