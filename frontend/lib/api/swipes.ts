import { apiRequest } from "./client";
import { NotificationItem, MatchItem, SwipeDeckItem } from "@/types/creator";

export interface SwipeDeckResponse {
  deck: SwipeDeckItem[];
  totalRemaining: number;
  brandId: string;
  briefTitle?: string;
}

export interface BrandMatchesResponse {
  brandId: string;
  mutualMatches: MatchItem[];
  interestedPending: any[];
  passes: any[];
}

export interface CreatorNotificationsResponse {
  notifications: NotificationItem[];
  unreadCount: number;
  creatorId: string;
}

export async function fetchSwipeDeck(brandId: string, briefId?: string): Promise<SwipeDeckResponse> {
  return apiRequest<SwipeDeckResponse>("/api/swipes/deck", {
    params: { brandId, briefId },
  });
}

export async function recordSwipe(params: {
  brandId: string;
  creatorId: string;
  direction: "interested" | "pass";
  briefId?: string;
  introMessage?: string;
}) {
  return apiRequest<{ success: boolean; direction: string; notificationCreated: boolean }>("/api/swipes", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function resetBrandPasses(brandId: string) {
  return apiRequest<{ success: boolean; resetCount: number }>("/api/swipes/reset-passes", {
    method: "POST",
    params: { brandId },
  });
}

export async function fetchBrandMatches(brandId: string): Promise<BrandMatchesResponse> {
  return apiRequest<BrandMatchesResponse>("/api/swipes/matches", {
    params: { brandId },
  });
}

export async function fetchCreatorNotifications(creatorId: string): Promise<CreatorNotificationsResponse> {
  return apiRequest<CreatorNotificationsResponse>("/api/swipes/notifications", {
    params: { creatorId },
  });
}

export async function handleNotificationAction(
  notificationId: string,
  action: "accepted" | "declined" | "read"
) {
  return apiRequest<{ success: boolean; status: string; matchId?: string; message?: string }>(
    `/api/swipes/notifications/${notificationId}/action`,
    {
      method: "POST",
      body: JSON.stringify({ status: action }),
    }
  );
}
