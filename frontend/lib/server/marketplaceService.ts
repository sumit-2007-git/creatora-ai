import seedData from "./marketplaceData.json";

export interface ScoreBreakdown {
  genreFit: number;
  toolsFit: number;
  contentTypeFit: number;
  audienceFit: number;
  budgetFit: number;
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

  const overallScore = Math.min(genreFit + toolsFit + contentTypeFit + audienceFit + budgetFit, 98);

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
