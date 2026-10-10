import seedData from "./marketplaceData.json";

export interface ScoreBreakdown {
  genreFit: number;
  toolsFit: number;
  contentTypeFit: number;
  audienceFit: number;
  budgetFit: number;
  trustFit?: number;
}

export interface RecommendationMatch {
  creator: any;
  overallScore: number;
  tier: "Top Match" | "Strong Match" | "Relevant Match" | "Emerging Fit";
  scoreBreakdown: ScoreBreakdown;
  aiExplanation: string;
  matchedKeywords: string[];
  suggestedDeliverables: string[];
  keyStrengths: string[];
  estimatedTurnaround: string;
}

// In-memory state for mutations during runtime
let creatorsList: any[] = [...seedData.creators];
let briefsList: any[] = [...seedData.briefs];
let portfoliosList: any[] = [...seedData.portfolios];
let inquiriesList: any[] = [...seedData.inquiries];
let savedList: any[] = [...(seedData.saved || [])];
let postsList: any[] = [...((seedData as any).posts || [])];
let swipesList: any[] = [...((seedData as any).swipes || [])];
let notificationsList: any[] = [...((seedData as any).notifications || [])];
let matchesList: any[] = [...((seedData as any).matches || [])];
let applicationsList: any[] = [];

export function listCreators(filters?: {
  q?: string;
  genre?: string;
  contentType?: string;
  tool?: string;
  platform?: string;
  specialization?: string;
  availability?: string;
  sortBy?: string;
}) {
  let results = [...creatorsList];

  if (filters?.genre) {
    const target = filters.genre.toLowerCase();
    results = results.filter((c) =>
      (c.genres || []).some((g: string) => g.toLowerCase() === target)
    );
  }
  if (filters?.contentType) {
    const target = filters.contentType.toLowerCase();
    results = results.filter((c) =>
      (c.contentTypes || []).some((ct: string) => ct.toLowerCase() === target)
    );
  }
  if (filters?.tool) {
    const target = filters.tool.toLowerCase();
    results = results.filter((c) =>
      (c.tools || []).some((t: string) => t.toLowerCase() === target)
    );
  }
  if (filters?.platform) {
    const target = filters.platform.toLowerCase();
    results = results.filter((c) =>
      (c.platforms || []).some((p: string) => p.toLowerCase() === target)
    );
  }
  if (filters?.specialization) {
    const target = filters.specialization.toLowerCase();
    results = results.filter((c) =>
      (c.specializations || []).some((s: string) => s.toLowerCase() === target)
    );
  }
  if (filters?.availability) {
    const target = filters.availability.toLowerCase();
    results = results.filter((c) =>
      String(c.commercialAvailability || "").toLowerCase().includes(target)
    );
  }
  if (filters?.q) {
    const query = filters.q.toLowerCase();
    results = results.filter((c) => {
      const corpus = `${c.name || ""} ${c.roleTitle || ""} ${c.bio || ""} ${(c.skills || []).join(" ")} ${(c.tools || []).join(" ")} ${(c.genres || []).join(" ")}`.toLowerCase();
      return corpus.includes(query);
    });
  }

  if (filters?.sortBy === "followers") {
    results.sort((a, b) => (b.totalFollowers || 0) - (a.totalFollowers || 0));
  } else if (filters?.sortBy === "engagement") {
    results.sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0));
  }

  return results;
}

export function findCreatorById(id: string) {
  return creatorsList.find((c) => c.creatorId === id || c.id === id || c.uid === id);
}

export function saveCreator(creatorData: any) {
  const existingIndex = creatorsList.findIndex(
    (c) => c.creatorId === creatorData.creatorId || c.uid === creatorData.uid
  );
  if (existingIndex >= 0) {
    creatorsList[existingIndex] = { ...creatorsList[existingIndex], ...creatorData };
    return creatorsList[existingIndex];
  } else {
    const newCreator = {
      ...creatorData,
      creatorId: creatorData.creatorId || `creator-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    creatorsList.unshift(newCreator);
    return newCreator;
  }
}

export function listSavedCreatorIds(uid: string = "demo-user") {
  return savedList
    .filter((s) => s.uid === uid)
    .map((s) => s.creatorId);
}

export function toggleSave(creatorId: string, uid: string = "demo-user") {
  const index = savedList.findIndex(
    (s) => s.creatorId === creatorId && s.uid === uid
  );
  if (index >= 0) {
    savedList.splice(index, 1);
    return { creatorId, saved: false, message: "Removed from saved" };
  } else {
    savedList.push({
      id: `save_${uid}_${creatorId}`,
      uid,
      creatorId,
      createdAt: new Date().toISOString(),
    });
    return { creatorId, saved: true, message: "Saved to collection" };
  }
}

export function listBriefs(filters?: { status?: string; genre?: string; contentType?: string }) {
  let list = [...briefsList];
  if (filters?.status) {
    list = list.filter((b) => b.status === filters.status);
  }
  if (filters?.genre) {
    const target = filters.genre.toLowerCase();
    list = list.filter((b) =>
      (b.genres || []).some((g: string) => g.toLowerCase() === target)
    );
  }
  if (filters?.contentType) {
    const target = filters.contentType.toLowerCase();
    list = list.filter((b) =>
      (b.contentTypes || []).some((ct: string) => ct.toLowerCase() === target)
    );
  }
  return list;
}

export function findBriefById(id: string) {
  return briefsList.find((b) => b.id === id || b.briefId === id);
}

export function createOrUpdateBrief(data: any) {
  if (data.id) {
    const idx = briefsList.findIndex((b) => b.id === data.id);
    if (idx >= 0) {
      briefsList[idx] = { ...briefsList[idx], ...data };
      return briefsList[idx];
    }
  }
  const newBrief = {
    ...data,
    id: data.id || `brief-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: data.status || "open",
    applicantCount: 0,
    shortlistedCount: 0,
  };
  briefsList.unshift(newBrief);
  return newBrief;
}

export function listPortfolios(filters?: { creatorId?: string; genre?: string; contentType?: string }) {
  let list = [...portfoliosList];
  if (filters?.creatorId) {
    list = list.filter((p) => p.creatorId === filters.creatorId);
  }
  if (filters?.genre) {
    const target = filters.genre.toLowerCase();
    list = list.filter((p) => (p.genre || "").toLowerCase() === target);
  }
  if (filters?.contentType) {
    const target = filters.contentType.toLowerCase();
    list = list.filter((p) => (p.contentType || "").toLowerCase() === target);
  }
  return list;
}

export function addPortfolio(item: any) {
  const newItem = {
    ...item,
    id: item.id || `port-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  portfoliosList.unshift(newItem);
  return newItem;
}

export function deletePortfolio(id: string) {
  portfoliosList = portfoliosList.filter((p) => p.id !== id);
  return { success: true };
}

export function listInquiries(creatorId: string) {
  return inquiriesList.filter((inq) => inq.creatorId === creatorId);
}

export function createInquiry(creatorId: string, payload: any) {
  const newInq = {
    id: `inq-${Date.now()}`,
    creatorId,
    campaignTitle: payload.campaignTitle || "Brand Campaign",
    message: payload.message || "",
    budgetOffer: payload.budgetOffer || "$3,000",
    timeline: payload.timeline || "2 Weeks",
    status: "pending",
    brandName: payload.brandName || "Creatora Partner Brand",
    createdAt: new Date().toISOString(),
  };
  inquiriesList.unshift(newInq);
  return newInq;
}

export function updateInquiry(creatorId: string, inquiryId: string, status: string) {
  const inq = inquiriesList.find((i) => i.id === inquiryId);
  if (inq) {
    inq.status = status;
    return inq;
  }
  return { id: inquiryId, status };
}

export function applyBrief(briefId: string, payload: any) {
  const app = {
    id: `app-${Date.now()}`,
    briefId,
    creatorId: payload.creatorId,
    coverLetter: payload.coverLetter,
    proposedRate: payload.proposedRate || "$2,500",
    relevantPortfolioIds: payload.relevantPortfolioIds || [],
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  applicationsList.unshift(app);
  const brief = findBriefById(briefId);
  if (brief) {
    brief.applicantCount = (brief.applicantCount || 0) + 1;
  }
  return app;
}

export function listApplications(briefId: string) {
  return applicationsList.filter((a) => a.briefId === briefId);
}

// -------------------------------------------------------------
// WEIGHTED MATCHING ENGINE (Firestore / Serverless)
// -------------------------------------------------------------
export function computeMatchScore(brief: any, creator: any): RecommendationMatch {
  // 1. Genre fit: 30 pts max
  const briefGenres = (brief.genres || []).map((g: string) => g.toLowerCase());
  const creatorGenres = (creator.genres || []).map((g: string) => g.toLowerCase());
  const genreOverlap = briefGenres.filter((bg: string) => creatorGenres.includes(bg)).length;
  let genreFit = 4;
  if (genreOverlap >= 2) genreFit = 28 + Math.min(genreOverlap - 2, 2);
  else if (genreOverlap === 1) genreFit = 20;
  else {
    const textCorpus = `${creator.bio || ""} ${creator.roleTitle || ""}`.toLowerCase();
    if (briefGenres.some((bg: string) => textCorpus.includes(bg))) genreFit = 12;
  }

  // 2. Tools & Technical Skills: 25 pts max
  const briefTools = (brief.preferredTools || []).map((t: string) => t.toLowerCase());
  const creatorTools = (creator.tools || []).map((t: string) => t.toLowerCase());
  const toolOverlap = briefTools.filter((bt: string) => creatorTools.includes(bt)).length;
  let toolsFit = 5;
  if (toolOverlap >= 2) toolsFit = 23 + Math.min(toolOverlap - 2, 2);
  else if (toolOverlap === 1) toolsFit = 16;

  // 3. Content Type & Platform: 20 pts max
  const briefContent = (brief.contentTypes || []).map((c: string) => c.toLowerCase());
  const creatorContent = (creator.contentTypes || []).map((c: string) => c.toLowerCase());
  const contentOverlap = briefContent.filter((bc: string) => creatorContent.includes(bc)).length;
  let contentTypeFit = 4;
  if (contentOverlap >= 2) contentTypeFit = 19;
  else if (contentOverlap === 1) contentTypeFit = 14;

  // 4. Audience & Engagement: 15 pts max
  const eng = parseFloat(creator.engagementRate || 5.0);
  let audienceFit = 3;
  if (eng >= 7.5) audienceFit = 15;
  else if (eng >= 6.0) audienceFit = 13;
  else if (eng >= 4.5) audienceFit = 10;
  else if (eng >= 3.0) audienceFit = 7;

  // 5. Budget & Availability: 10 pts max
  const avail = String(creator.commercialAvailability || "").toLowerCase();
  let budgetFit = 4;
  if (avail.includes("immediate") || avail.includes("open")) budgetFit = 9;
  else if (avail.includes("selective")) budgetFit = 6;
  if (creator.verified) budgetFit = Math.min(budgetFit + 1, 10);

  // 6. Trust & Verification: 5 pts max
  const trustTier = String(creator.trustTier || "self-reported").toLowerCase();
  let trustFit = 2;
  if (trustTier.includes("proof-backed")) trustFit = 5;
  else if (trustTier.includes("link-checked")) trustFit = 3;
  else if (trustTier.includes("needs-proof")) trustFit = 1;

  const overallScore = Math.min(genreFit + toolsFit + contentTypeFit + audienceFit + budgetFit + trustFit, 99);

  let tier: RecommendationMatch["tier"] = "Emerging Fit";
  if (overallScore >= 85) tier = "Top Match";
  else if (overallScore >= 70) tier = "Strong Match";
  else if (overallScore >= 55) tier = "Relevant Match";

  const matchedKeywords = [
    ...(creator.genres || []).filter((g: string) => briefGenres.includes(g.toLowerCase())),
    ...(creator.tools || []).filter((t: string) => briefTools.includes(t.toLowerCase())),
    ...(creator.contentTypes || []).filter((ct: string) => briefContent.includes(ct.toLowerCase())),
  ];

  return {
    creator,
    overallScore,
    tier,
    scoreBreakdown: {
      genreFit,
      toolsFit,
      contentTypeFit,
      audienceFit,
      budgetFit,
      trustFit,
    },
    aiExplanation: `${creator.name} is classified as ${tier} (${overallScore}%) for '${brief.title}'. Strongest synergy lies in ${(creator.genres || []).slice(0, 2).join(", ")} content workflows paired with high-impact ${creator.tools?.[0] || "AI"} pipelines.`,
    matchedKeywords: Array.from(new Set(matchedKeywords)),
    suggestedDeliverables: [
      `1x Primary ${brief.contentTypes?.[0] || "Campaign Reel"} (${brief.aspectRatio || "9:16"})`,
      `2x Behind-The-Scenes AI prompt breakdown snippets`,
      `Full raw prompt recipes + color palette tokens`,
    ],
    keyStrengths: creator.strengths || [
      "Rapid turnaround",
      "High audience conversion",
      "Photorealistic synthesis",
    ],
    estimatedTurnaround: creator.commercialAvailability === "Immediate" ? "5-7 Days" : "10-14 Days",
  };
}

export function rankCreatorsForBrief(brief: any) {
  const matches = creatorsList.map((creator) => computeMatchScore(brief, creator));
  matches.sort((a, b) => b.overallScore - a.overallScore);
  return {
    briefId: brief.id,
    briefTitle: brief.title,
    totalEvaluated: creatorsList.length,
    matches,
    generatedAt: new Date().toISOString(),
  };
}

// =================== POSTS ===================
export function listPosts(creatorId: string) {
  const posts = postsList.filter((p) => p.creatorId === creatorId);
  posts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return (a.orderIndex || 0) - (b.orderIndex || 0);
  });
  return posts;
}

export function addPost(creatorId: string, postData: any) {
  const cleanUrl = (postData.originalUrl || "").trim().toLowerCase();
  const exists = postsList.some((p) => p.creatorId === creatorId && (p.originalUrl || "").trim().toLowerCase() === cleanUrl);
  if (exists) {
    throw new Error("A post with this URL has already been added to your profile.");
  }
  const pinnedCount = postsList.filter((p) => p.creatorId === creatorId && p.isPinned).length;
  if (postData.isPinned && pinnedCount >= 3) {
    throw new Error("Maximum of 3 featured posts can be pinned.");
  }

  const newPost = {
    ...postData,
    id: `post_${creatorId}_${Date.now()}`,
    creatorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSelfReported: true,
    isDemo: true,
  };
  postsList.unshift(newPost);
  return newPost;
}

export function updatePost(creatorId: string, postId: string, updates: any) {
  const index = postsList.findIndex((p) => p.id === postId && p.creatorId === creatorId);
  if (index === -1) throw new Error("Post not found");

  if (updates.isPinned && !postsList[index].isPinned) {
    const pinnedCount = postsList.filter((p) => p.creatorId === creatorId && p.isPinned).length;
    if (pinnedCount >= 3) throw new Error("Maximum of 3 featured posts can be pinned.");
  }

  postsList[index] = {
    ...postsList[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return postsList[index];
}

export function deletePost(creatorId: string, postId: string) {
  const index = postsList.findIndex((p) => p.id === postId && p.creatorId === creatorId);
  if (index === -1) throw new Error("Post not found");
  postsList.splice(index, 1);
  return { success: true };
}

// =================== SWIPES & MATCHES ===================
export function getSwipeDeck(brandId: string, briefId?: string) {
  const swipedIds = new Set(
    swipesList.filter((s) => s.brandId === brandId).map((s) => s.creatorId)
  );

  const brief = briefId
    ? briefsList.find((b) => b.id === briefId) || briefsList[0]
    : briefsList[0];

  const unswiped = creatorsList.filter((c) => !swipedIds.has(c.creatorId));
  const scored = unswiped.map((c) => {
    const scoreRes = computeMatchScore(brief, c);
    return {
      ...c,
      matchPercentage: scoreRes.overallScore,
      tier: scoreRes.tier,
      weightedBreakdown: {
        genreMatch: scoreRes.scoreBreakdown.genreFit,
        toolMatch: scoreRes.scoreBreakdown.toolsFit,
        platformMatch: scoreRes.scoreBreakdown.contentTypeFit,
        audienceMatch: scoreRes.scoreBreakdown.audienceFit,
        budgetMatch: scoreRes.scoreBreakdown.budgetFit,
      },
    };
  });

  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return {
    deck: scored,
    totalRemaining: scored.length,
    brandId,
    briefTitle: brief.title,
  };
}

export function recordSwipe(payload: {
  brandId: string;
  creatorId: string;
  direction: "interested" | "pass";
  briefId?: string;
  introMessage?: string;
}) {
  const swipeId = `swipe_${payload.brandId}_${payload.creatorId}_${payload.briefId || "general"}`;
  const now = new Date().toISOString();

  const existingIndex = swipesList.findIndex((s) => s.id === swipeId);
  if (existingIndex >= 0) {
    swipesList[existingIndex].direction = payload.direction;
    swipesList[existingIndex].timestamp = now;
  } else {
    swipesList.push({
      id: swipeId,
      brandId: payload.brandId,
      creatorId: payload.creatorId,
      briefId: payload.briefId,
      direction: payload.direction,
      timestamp: now,
      isDemo: true,
    });
  }

  let notificationCreated = false;
  if (payload.direction === "interested") {
    const notifId = `notif_${payload.brandId}_${payload.creatorId}_${payload.briefId || "general"}`;
    const notifExists = notificationsList.some((n) => n.id === notifId);
    if (!notifExists) {
      const brand = seedData.brands?.find((b: any) => b.brandId === payload.brandId) || { companyName: "Aura Studio Global" };
      const brief = payload.briefId ? briefsList.find((b) => b.id === payload.briefId) : null;

      notificationsList.unshift({
        id: notifId,
        brandId: payload.brandId,
        brandName: (brand as any).companyName || (brand as any).name || "Brand Partner",
        creatorId: payload.creatorId,
        creatorUid: `user-${payload.creatorId}`,
        briefId: payload.briefId,
        briefTitle: brief?.title,
        introMessage: payload.introMessage || `We love your portfolio and would like to collaborate on an upcoming project!`,
        link: `/brands/${payload.brandId}`,
        isRead: false,
        status: "pending",
        createdAt: now,
        isDemo: true,
      });
      notificationCreated = true;
    }
  }

  return { success: true, direction: payload.direction, notificationCreated };
}

export function resetPasses(brandId: string) {
  const initial = swipesList.length;
  swipesList = swipesList.filter((s) => !(s.brandId === brandId && s.direction === "pass"));
  return { success: true, resetCount: initial - swipesList.length };
}

export function getBrandMatches(brandId: string) {
  const mutualMatches = matchesList.filter((m) => m.brandId === brandId);
  const matchedIds = new Set(mutualMatches.map((m) => m.creatorId));

  const brandSwipes = swipesList.filter((s) => s.brandId === brandId);
  const creatorsMap = new Map(creatorsList.map((c) => [c.creatorId, c]));

  const interestedPending: any[] = [];
  const passes: any[] = [];

  for (const s of brandSwipes) {
    const c = creatorsMap.get(s.creatorId);
    if (!c) continue;
    const info = {
      creatorId: c.creatorId,
      name: c.name,
      avatar: c.avatar,
      handle: c.handle,
      roleTitle: c.roleTitle,
      rate: c.rate,
      timestamp: s.timestamp,
    };
    if (s.direction === "interested" && !matchedIds.has(s.creatorId)) {
      interestedPending.push(info);
    } else if (s.direction === "pass") {
      passes.push(info);
    }
  }

  return { brandId, mutualMatches, interestedPending, passes };
}

export function getCreatorNotifications(creatorId: string) {
  const notifs = notificationsList.filter((n) => n.creatorId === creatorId);
  notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const unreadCount = notifs.filter((n) => !n.isRead).length;
  return { notifications: notifs, unreadCount, creatorId };
}

export function actionNotification(notificationId: string, action: string) {
  const notif = notificationsList.find((n) => n.id === notificationId);
  if (!notif) throw new Error("Notification not found");

  const now = new Date().toISOString();
  if (action === "accepted") {
    notif.status = "accepted";
    notif.isRead = true;

    const creator = creatorsList.find((c) => c.creatorId === notif.creatorId) || { name: "Creator", avatar: "", handle: "@creator" };
    const matchId = `match_${notif.brandId}_${notif.creatorId}_${notif.briefId || "direct"}`;
    const exists = matchesList.some((m) => m.id === matchId);
    if (!exists) {
      matchesList.unshift({
        id: matchId,
        brandId: notif.brandId,
        brandName: notif.brandName,
        creatorId: notif.creatorId,
        creatorName: creator.name,
        creatorAvatar: creator.avatar,
        creatorHandle: creator.handle,
        creatorRole: creator.roleTitle || "AI Creator",
        briefId: notif.briefId,
        briefTitle: notif.briefTitle,
        status: "accepted",
        createdAt: now,
        isDemo: true,
        projectThreadId: `thread-${matchId}`,
      });
    }
    return { success: true, status: "accepted", matchId };
  } else if (action === "declined") {
    notif.status = "declined";
    notif.isRead = true;
    return { success: true, status: "declined" };
  } else if (action === "read") {
    notif.isRead = true;
    return { success: true, status: "read" };
  }
  throw new Error("Invalid action");
}

// =================== AI SEARCH & DREAM TEAM ===================
export function searchCreatorsWithAI(query: string, structuredQuery?: any) {
  const q = query.toLowerCase();

  let industry = structuredQuery?.industry;
  let contentType = structuredQuery?.contentType;
  let style = structuredQuery?.style;
  let tools = structuredQuery?.tools || [];
  let budgetRange = structuredQuery?.budgetRange;

  if (!industry) {
    if (q.includes("sneaker") || q.includes("shoe")) industry = "Sneakers";
    else if (q.includes("game") || q.includes("gaming") || q.includes("trailer")) industry = "Gaming";
    else if (q.includes("car") || q.includes("automotive")) industry = "Automotive";
    else if (q.includes("beauty") || q.includes("skin")) industry = "Beauty";
    else if (q.includes("fashion") || q.includes("lookbook")) industry = "Fashion";
    else industry = "Lifestyle";
  }

  if (!contentType) {
    if (q.includes("reel")) contentType = "Reels";
    else if (q.includes("film") || q.includes("trailer")) contentType = "AI Films";
    else contentType = "Product Ads";
  }

  if (!style) {
    if (q.includes("cinematic")) style = "Cinematic";
    else if (q.includes("anime") || q.includes("sketch")) style = "Anime Sketchbook";
    else style = "Cinematic";
  }

  if (!tools || tools.length === 0) {
    if (q.includes("runway")) tools = ["Runway"];
    else if (q.includes("midjourney")) tools = ["Midjourney"];
    else tools = ["Runway", "Midjourney"];
  }

  if (!budgetRange) {
    if (q.includes("cheap") || q.includes("low budget")) budgetRange = "$1,000–$2,500";
    else if (q.includes("luxury")) budgetRange = "$6,000–$15,000";
    else budgetRange = "$2,500–$5,000";
  }

  const resolvedStructured = {
    industry,
    contentType,
    style,
    platform: "Instagram",
    skills: ["Prompt Engineering", "VFX"],
    tools,
    budgetRange,
    licensingNeed: "Organic Social",
    minFollowers: structuredQuery?.minFollowers,
    minEngagementRate: structuredQuery?.minEngagementRate,
  };

  const briefProxy = {
    id: "search-proxy",
    title: query,
    genres: [industry, style],
    contentTypes: [contentType],
    preferredTools: tools,
    targetAudience: `${industry} Consumers`,
    visualAesthetic: style,
    budget: budgetRange,
  };

  const results = creatorsList.map((c) => {
    const scoreRes = computeMatchScore(briefProxy, c);
    const cPosts = postsList.filter((p) => p.creatorId === c.creatorId);
    let score = scoreRes.overallScore;

    // Bonus for matching posts
    if (cPosts.some((p) => (p.industry || "").toLowerCase() === industry.toLowerCase())) {
      score = Math.min(score + 4, 98);
    }

    const whyThisCreator = score >= 90
      ? `Exceptional ${score}% alignment with ${industry} visual storytelling and mastered ${tools.join(", ")} pipelines.`
      : score >= 75
      ? `Strong creative resonance in ${c.genres?.[0] || industry} with reliable ${c.engagementRate}% engagement.`
      : `Promising niche specialist with unique artistic flair.`;

    const fol = c.totalFollowers || 0;
    const folStr = fol >= 1000 ? `${Math.round(fol / 1000)}K` : `${fol}`;

    return {
      creatorId: c.creatorId,
      name: c.name,
      avatar: c.avatar,
      handle: c.handle,
      roleTitle: c.roleTitle,
      matchPercentage: score,
      tier: scoreRes.tier,
      whyThisCreator,
      weightedBreakdown: {
        genreMatch: scoreRes.scoreBreakdown.genreFit,
        toolMatch: scoreRes.scoreBreakdown.toolsFit,
        platformMatch: scoreRes.scoreBreakdown.contentTypeFit,
        audienceMatch: scoreRes.scoreBreakdown.audienceFit,
        budgetMatch: scoreRes.scoreBreakdown.budgetFit,
      },
      genres: (c.genres || []).slice(0, 3),
      tools: (c.tools || []).slice(0, 3),
      totalFollowers: folStr,
      engagementRate: `${c.engagementRate || 5.0}%`,
      rate: c.rate || "$1,500",
      commercialAvailability: c.commercialAvailability || "Immediate",
      featuredPostUrl: cPosts[0]?.originalUrl,
    };
  });

  results.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    query,
    structuredQuery: resolvedStructured,
    isBasicMode: false,
    aiRationale: `Found ${results.slice(0, 8).length} elite creators matching '${query}' based on transparent multi-vector scoring.`,
    results: results.slice(0, 8),
  };
}

export function buildDreamTeamSquad(brief: any) {
  const squad = [
    {
      role: "Lead AI Creative Director",
      tool: "Runway",
      creator: creatorsList.find((c) => (c.genres || []).includes("Fashion") || (c.tools || []).includes("Runway")) || creatorsList[0],
      strength: "Cinematic pacing & brand integration",
    },
    {
      role: "Concept & Prompt Specialist",
      tool: "Midjourney",
      creator: creatorsList.find((c) => (c.genres || []).includes("Art") || (c.genres || []).includes("Beauty")) || creatorsList[1],
      strength: "Aesthetic consistency & character keyframing",
    },
    {
      role: "Motion & VFX Colorist",
      tool: "DaVinci Resolve",
      creator: creatorsList.find((c) => (c.tools || []).includes("DaVinci Resolve") || (c.genres || []).includes("Tech")) || creatorsList[2],
      strength: "Audio synchronization & high-dynamic color grading",
    },
  ];

  const totalFollowers = squad.reduce((sum, item) => sum + (item.creator.totalFollowers || 0), 0);
  const reachStr = totalFollowers >= 1000 ? `${Math.round(totalFollowers / 1000)}K Combined Reach` : `${totalFollowers} Reach`;

  return {
    briefId: brief?.id || "demo-brief",
    campaignTitle: brief?.title || "Campaign Brief",
    teamName: `Squad ${brief?.genres?.[0] || "Creatora"} Alpha`,
    synergyScore: 97,
    collectiveReach: reachStr,
    estimatedBudget: "$6,200–$8,500",
    turnaroundTime: "8–10 Days",
    members: squad.map((item) => ({
      creatorId: item.creator.creatorId,
      name: item.creator.name,
      avatar: item.creator.avatar,
      handle: item.creator.handle,
      assignedRole: item.role,
      primaryTool: item.tool,
      keyStrength: item.strength,
      followers: item.creator.totalFollowers >= 1000 ? `${Math.round(item.creator.totalFollowers / 1000)}K` : `${item.creator.totalFollowers}`,
      engagementRate: `${item.creator.engagementRate}%`,
      rate: item.creator.rate || "$2,000",
    })),
    squadStrategy: "This 3-creator squad unites high-tempo directorial execution with world-class prompt engineering and technical color polish for maximum viral resonance.",
  };
}

