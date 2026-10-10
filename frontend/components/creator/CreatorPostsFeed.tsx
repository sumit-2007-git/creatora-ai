"use client";

import { useEffect, useState } from "react";
import {
  fetchCreatorPosts,
  createCreatorPost,
  updateCreatorPost,
  deleteCreatorPost,
  extractUrlMetadata,
  suggestPostTags,
} from "@/lib/api/posts";
import { CreatorPost } from "@/types/creator";

export function CreatorPostsFeed({
  creatorId,
  isOwner = false,
}: {
  creatorId: string;
  isOwner?: boolean;
}) {
  const [posts, setPosts] = useState<CreatorPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Add / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<CreatorPost | null>(null);

  // Form State
  const [url, setUrl] = useState("");
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [fetchMetaError, setFetchMetaError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [industry, setIndustry] = useState("Fashion");
  const [contentType, setContentType] = useState("Reels");
  const [toolsStr, setToolsStr] = useState("Runway, Midjourney");
  const [tagsStr, setTagsStr] = useState("generative-ai, visual");
  const [viewsCount, setViewsCount] = useState(150000);
  const [likesCount, setLikesCount] = useState(12000);
  const [isPinned, setIsPinned] = useState(false);
  const [suggestingTags, setSuggestingTags] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchCreatorPosts(creatorId);
      setPosts(data);
    } catch (e) {
      console.warn("Failed to load posts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [creatorId]);

  const handleOpenAdd = () => {
    setEditingPost(null);
    setUrl("");
    setTitle("");
    setDescription("");
    setPlatform("Instagram");
    setThumbnailUrl("");
    setIndustry("Fashion");
    setContentType("Reels");
    setToolsStr("Runway, Midjourney");
    setTagsStr("generative-ai, visual");
    setViewsCount(150000);
    setLikesCount(12000);
    setIsPinned(false);
    setFetchMetaError(null);
    setErrorMessage(null);
    setShowModal(true);
  };

  const handleOpenEdit = (p: CreatorPost) => {
    setEditingPost(p);
    setUrl(p.originalUrl);
    setTitle(p.title);
    setDescription(p.description || "");
    setPlatform(p.platform);
    setThumbnailUrl(p.thumbnailUrl || "");
    setIndustry(p.industry || "Fashion");
    setContentType(p.contentType || "Reels");
    setToolsStr((p.toolsUsed || []).join(", "));
    setTagsStr((p.tags || []).join(", "));
    setViewsCount(p.viewsCount || 0);
    setLikesCount(p.likesCount || 0);
    setIsPinned(!!p.isPinned);
    setFetchMetaError(null);
    setErrorMessage(null);
    setShowModal(true);
  };

  const handleFetchMetadata = async () => {
    if (!url.trim()) return;
    try {
      setFetchingMeta(true);
      setFetchMetaError(null);
      const res = await extractUrlMetadata(url.trim());
      if (res.success) {
        if (res.title) setTitle(res.title);
        if (res.description) setDescription(res.description);
        if (res.thumbnailUrl) setThumbnailUrl(res.thumbnailUrl);
        if (res.platform) setPlatform(res.platform);
      } else {
        setFetchMetaError(res.message || "Could not fetch preview. Enter details manually below.");
        if (res.platform) setPlatform(res.platform);
      }
    } catch (e: any) {
      setFetchMetaError("Metadata extraction failed. Please enter details manually.");
    } finally {
      setFetchingMeta(false);
    }
  };

  const handleSuggestTags = async () => {
    if (!title) return;
    try {
      setSuggestingTags(true);
      const res = await suggestPostTags(title, description);
      if (res.suggestedTags) setTagsStr(res.suggestedTags.join(", "));
      if (res.suggestedTools) setToolsStr(res.suggestedTools.join(", "));
      if (res.suggestedContentType) setContentType(res.suggestedContentType);
      if (res.suggestedIndustry) setIndustry(res.suggestedIndustry);
    } catch (e) {
      console.warn("Suggest tags error:", e);
    } finally {
      setSuggestingTags(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) {
      setErrorMessage("Original URL and Post Title are required.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);

      const toolsArray = toolsStr.split(",").map((t) => t.trim()).filter(Boolean);
      const tagsArray = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        originalUrl: url.trim(),
        platform,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        industry,
        contentType,
        toolsUsed: toolsArray,
        tags: tagsArray,
        viewsCount: Number(viewsCount) || 0,
        likesCount: Number(likesCount) || 0,
        isPinned,
      };

      if (editingPost) {
        await updateCreatorPost(creatorId, editingPost.id, payload);
      } else {
        await createCreatorPost(creatorId, payload);
      }

      setShowModal(false);
      loadPosts();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = async (p: CreatorPost) => {
    try {
      await updateCreatorPost(creatorId, p.id, { isPinned: !p.isPinned });
      loadPosts();
    } catch (err: any) {
      alert(err.message || "Failed to update pin status");
    }
  };

  const handleDelete = async (p: CreatorPost) => {
    if (!confirm(`Delete post "${p.title}"?`)) return;
    try {
      await deleteCreatorPost(creatorId, p.id);
      loadPosts();
    } catch (err: any) {
      alert(err.message || "Failed to delete post");
    }
  };

  const pinnedCount = posts.filter((p) => p.isPinned).length;

  return (
    <div style={{ marginTop: 24 }}>
      {/* Header with Add Post button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="kanji-stamp" style={{ background: "var(--purple-soft)" }}>POSTS</span>
            <span className="pill purple">Published Social Showcase</span>
          </div>
          <h3 style={{ margin: "4px 0 2px", fontSize: 20, fontWeight: 900, color: "var(--ink)" }}>
            Social Feed & Published Works ({posts.length})
          </h3>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            Verified external posts informing match scoring and creator analysis.
          </span>
        </div>

        {isOwner && (
          <button onClick={handleOpenAdd} className="button small">
            + Add Social Post
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--muted)" }}>
          Loading published posts...
        </div>
      ) : posts.length === 0 ? (
        <div
          className="surface"
          style={{
            textAlign: "center",
            padding: "50px 20px",
            borderRadius: 18,
            border: "1.5px dashed var(--line)",
            background: "#FFFFFF",
          }}
        >
          <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>📱</span>
          <h4 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800 }}>No External Posts Added Yet</h4>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
            Add published posts from Instagram, YouTube, TikTok, X, Behance, or Vimeo to showcase audience reach.
          </p>
          {isOwner && (
            <button onClick={handleOpenAdd} className="button small">
              + Add First Post
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 20 }}>
          {posts.map((p) => (
            <div
              key={p.id}
              className="surface"
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: `1.5px solid ${p.isPinned ? "var(--purple-primary)" : "var(--line)"}`,
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                boxShadow: p.isPinned ? "0 6px 20px rgba(108, 92, 231, 0.1)" : "none",
              }}
            >
              {/* Media Thumbnail */}
              <div style={{ position: "relative", height: 180, background: "#EAE5DC", overflow: "hidden" }}>
                {p.thumbnailUrl ? (
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--muted)", fontSize: 32 }}>
                    📱
                  </div>
                )}

                {/* Platform Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    padding: "3px 9px",
                    borderRadius: 8,
                    background: "rgba(0, 0, 0, 0.75)",
                    color: "#FFFFFF",
                    fontSize: 10.5,
                    fontWeight: 800,
                  }}
                >
                  {p.platform}
                </span>

                {/* Pinned Badge */}
                {p.isPinned && (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "3px 8px",
                      borderRadius: 8,
                      background: "var(--purple-primary)",
                      color: "#FFFFFF",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: "var(--ink)", lineHeight: 1.3 }}>
                  {p.title}
                </h4>

                {p.description && (
                  <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "var(--pencil)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p.description}
                  </p>
                )}

                {/* Tags and Tools */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.toolsUsed?.slice(0, 2).map((t) => (
                    <span key={t} className="pill" style={{ fontSize: 10, padding: "2px 7px" }}>
                      ⚡ {t}
                    </span>
                  ))}
                  {p.industry && (
                    <span className="pill purple" style={{ fontSize: 10, padding: "2px 7px" }}>
                      {p.industry}
                    </span>
                  )}
                </div>

                {/* Self-reported Metrics Bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 11.5,
                    padding: "8px 0",
                    borderTop: "1px solid var(--line)",
                    marginTop: "auto",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--muted)" }}>Views: </span>
                    <strong>{p.viewsCount ? (p.viewsCount >= 1000 ? `${(p.viewsCount / 1000).toFixed(0)}K` : p.viewsCount) : "N/A"}</strong>
                    <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 4 }}>(Self-Reported)</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)" }}>Likes: </span>
                    <strong>{p.likesCount ? (p.likesCount >= 1000 ? `${(p.likesCount / 1000).toFixed(0)}K` : p.likesCount) : "N/A"}</strong>
                  </div>
                </div>

                {/* View Original External Link with Required Label */}
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a
                    href={p.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11.5, color: "var(--purple-primary)", fontWeight: 700, textDecoration: "none" }}
                  >
                    View Original ↗ <span style={{ fontSize: 9.5, color: "var(--muted)", fontWeight: 500 }}>(Creator-Provided, Not Verified)</span>
                  </a>

                  {isOwner && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => handleTogglePin(p)}
                        className="button small ghost"
                        style={{ fontSize: 11, padding: "2px 6px" }}
                        title={p.isPinned ? "Unpin post" : "Pin as featured (max 3)"}
                      >
                        {p.isPinned ? "★ Unpin" : "☆ Pin"}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="button small ghost"
                        style={{ fontSize: 11, padding: "2px 6px" }}
                        title="Edit post"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="button small ghost"
                        style={{ fontSize: 11, padding: "2px 6px", color: "#E74C3C" }}
                        title="Delete post"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Post Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}
          >
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900 }}>
              {editingPost ? "Edit Social Post" : "Add Published Social Post"}
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
              Paste a published post URL from Instagram, YouTube, TikTok, X, Behance, or Vimeo.
            </p>

            {errorMessage && (
              <div style={{ padding: "8px 12px", background: "#FFEBEE", color: "#C62828", borderRadius: 8, fontSize: 12, marginBottom: 14 }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* URL with Metadata Auto-fetch */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  Post URL (Instagram, YouTube, TikTok, X, Vimeo, Behance)*
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleFetchMetadata}
                    disabled={fetchingMeta || !url.trim()}
                    className="button small secondary"
                    style={{ minWidth: 110 }}
                  >
                    {fetchingMeta ? "Fetching..." : "Fetch Preview"}
                  </button>
                </div>
                {fetchMetaError && (
                  <span style={{ fontSize: 11, color: "#D97706", display: "block", marginTop: 4 }}>
                    ⚠️ {fetchMetaError}
                  </span>
                )}
              </div>

              {/* Title & Suggest Tags Button */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>
                    Post Title*
                  </label>
                  <button
                    type="button"
                    onClick={handleSuggestTags}
                    disabled={suggestingTags || !title.trim()}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--purple-primary)",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {suggestingTags ? "Thinking..." : "✨ AI Suggest Tags & Tools"}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Cybernetic Sneaker Hologram Reveal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1.5px solid var(--line)",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the generative techniques used..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1.5px solid var(--line)",
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {/* Platform & Thumbnail URL */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                    <option value="X">X (Twitter)</option>
                    <option value="Behance">Behance</option>
                    <option value="Vimeo">Vimeo</option>
                    <option value="Dribbble">Dribbble</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Industry & Content Type */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Sneakers">Sneakers</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Tech">Tech</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Content Type
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  >
                    <option value="Reels">Reels</option>
                    <option value="Shorts">Shorts</option>
                    <option value="AI Films">AI Films</option>
                    <option value="Product Ads">Product Ads</option>
                    <option value="Visual Art">Visual Art</option>
                  </select>
                </div>
              </div>

              {/* Tools & Tags */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Tools Used (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Runway, Midjourney, DaVinci"
                    value={toolsStr}
                    onChange={(e) => setToolsStr(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="cinematic, vfx, anime"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Self-Reported Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Views (Self-Reported)
                  </label>
                  <input
                    type="number"
                    value={viewsCount}
                    onChange={(e) => setViewsCount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Likes (Self-Reported)
                  </label>
                  <input
                    type="number"
                    value={likesCount}
                    onChange={(e) => setLikesCount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1.5px solid var(--line)",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Pin Checkbox */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                  />
                  <span>Pin as featured post (max 3 pinned on your profile)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="button secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="button"
                >
                  {submitting ? "Saving..." : editingPost ? "Update Post" : "Add to Feed"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
