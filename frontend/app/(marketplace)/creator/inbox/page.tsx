"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { getStoredUser, loginDemoCreator } from "@/lib/firebase/auth";
import { fetchCreatorNotifications, handleNotificationAction } from "@/lib/api/swipes";
import { NotificationItem } from "@/types/creator";

export default function CreatorInboxPage() {
  const [user, setUser] = useState<any>(null);
  const [creatorId, setCreatorId] = useState("creator-001");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const loadNotifications = async (cId: string) => {
    try {
      setLoading(true);
      const res = await fetchCreatorNotifications(cId);
      setNotifications(res.notifications || []);
    } catch (e) {
      console.warn("Notifications load warning:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let u = getStoredUser();
    if (!u) {
      loginDemoCreator().then((demo) => {
        setUser(demo);
        const cid = demo.creatorId || "creator-001";
        setCreatorId(cid);
        loadNotifications(cid);
      });
    } else {
      setUser(u);
      const cid = u.creatorId || "creator-001";
      setCreatorId(cid);
      loadNotifications(cid);
    }
  }, []);

  const handleAction = async (notifId: string, action: "accepted" | "declined" | "read") => {
    try {
      const res = await handleNotificationAction(notifId, action);
      if (action === "accepted") {
        setActionFeedback("🎉 Collaboration Accepted! A mutual project match has been initiated.");
      } else if (action === "declined") {
        setActionFeedback("Request declined.");
      }
      setTimeout(() => setActionFeedback(null), 3000);
      loadNotifications(creatorId);
    } catch (err: any) {
      console.warn("Action error:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <PublicLayout>
      <main className="container" style={{ padding: "40px 0 80px", maxWidth: 760 }}>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>INBOX</span>
              <span className="pill purple">Talent Opportunities</span>
            </div>
            <h1 style={{ margin: "6px 0 2px", fontSize: 28, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.03em" }}>
              Creator Inbox
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              Direct collaboration requests and swipe matches from verified brands.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {unreadCount > 0 && (
              <span className="pill purple" style={{ fontSize: 12, fontWeight: 800 }}>
                ● {unreadCount} Unread
              </span>
            )}
            <Link href="/dashboard/creator" className="button small secondary">
              ← Back to Studio
            </Link>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div
            style={{
              padding: "12px 18px",
              background: "#E8F5E9",
              border: "1.5px solid #A5D6A7",
              color: "#2E7D32",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            {actionFeedback}
          </div>
        )}

        {/* Notification Cards List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
            Loading your talent inbox...
          </div>
        ) : notifications.length === 0 ? (
          <div
            className="surface"
            style={{
              textAlign: "center",
              padding: "60px 24px",
              borderRadius: 20,
              border: "1.5px dashed var(--line)",
              background: "#FFFFFF",
            }}
          >
            <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>📬</span>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800 }}>Your Inbox is Empty</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
              When brands swipe interested on your profile or dispatch direct campaign inquiries, they will appear right here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {notifications.map((n) => {
              const isAccepted = n.status === "accepted";
              const isDeclined = n.status === "declined";

              if (isDeclined) return null; // Hide declined items as specified

              return (
                <div
                  key={n.id}
                  className="surface"
                  style={{
                    padding: 22,
                    borderRadius: 18,
                    border: `1.5px solid ${!n.isRead ? "var(--purple-line)" : "var(--line)"}`,
                    background: !n.isRead ? "#FAF8FF" : "#FFFFFF",
                    boxShadow: !n.isRead ? "0 4px 18px rgba(108, 92, 231, 0.06)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="pill purple" style={{ fontSize: 11, fontWeight: 800 }}>
                          🏢 {n.brandName}
                        </span>
                        {n.briefTitle && (
                          <span className="pill" style={{ fontSize: 11 }}>
                            Campaign: {n.briefTitle}
                          </span>
                        )}
                        {!n.isRead && (
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--purple-primary)" }} />
                        )}
                      </div>
                    </div>

                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p style={{ margin: "10px 0 16px", fontSize: 14.5, lineHeight: 1.6, color: "var(--pencil)" }}>
                    "{n.introMessage}"
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14, flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {isAccepted ? (
                        <span className="pill" style={{ color: "#2E7D32", borderColor: "#A5D6A7", background: "#E8F5E9", fontWeight: 800 }}>
                          ✓ Collaboration Accepted & Project Thread Open
                        </span>
                      ) : (
                        <span className="pill" style={{ color: "#D97706", borderColor: "#FDE68A", background: "#FFFBEB", fontWeight: 700 }}>
                          ⏳ Pending Your Review
                        </span>
                      )}
                    </div>

                    {!isAccepted && (
                      <div style={{ display: "flex", gap: 10 }}>
                        {!n.isRead && (
                          <button
                            onClick={() => handleAction(n.id, "read")}
                            className="button small ghost"
                            style={{ fontSize: 12 }}
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(n.id, "declined")}
                          className="button small secondary"
                          style={{ fontSize: 12, color: "#E74C3C" }}
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAction(n.id, "accepted")}
                          className="button small"
                          style={{ fontSize: 12, background: "#00B894", borderColor: "#00B894" }}
                        >
                          ✓ Accept & Connect
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </PublicLayout>
  );
}
