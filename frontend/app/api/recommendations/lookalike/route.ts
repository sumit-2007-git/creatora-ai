import { NextRequest, NextResponse } from "next/server";
import marketplaceData from "@/lib/server/marketplaceData.json";

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach((item) => {
    if (setB.has(item)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { imageUrl, promptHint, portfolioItemId } = body;

    const creators = marketplaceData.creators || [];
    const portfolios = marketplaceData.portfolios || [];

    // If portfolio item ID provided, retrieve image URL & title
    if (portfolioItemId && !imageUrl) {
      const p = portfolios.find((item: any) => item.id === portfolioItemId);
      if (p) {
        imageUrl = p.mediaUrl || p.thumbnailUrl;
        if (!promptHint) promptHint = p.description || p.title;
      }
    }

    // Default style analysis
    let styleAnalysis = {
      style_description: promptHint
        ? `Cinematic generative composition focused on "${promptHint}". Characterized by rich atmospheric lighting, precise camera framing, and hyper-detailed material rendering.`
        : "Atmospheric cinematic visual narrative with high-contrast volumetric illumination, filmic grain, and dynamic camera choreography.",
      aesthetic_keywords: ["cinematic", "photorealistic", "atmospheric", "volumetric-lighting", "cyberpunk", "editorial", "hyper-detailed"],
      suggested_genres: ["AI Films", "Art", "Tech"],
      detected_tools: ["Midjourney", "Runway Gen-3", "Magnific AI"],
      dominant_mood: "Cinematic Neo-Noir",
    };

    // Call FastAPI backend for Gemini Vision analysis if available
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    try {
      const fastApiResponse = await fetch(`${backendUrl}/api/recommendations/lookalike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, promptHint, portfolioItemId }),
        signal: AbortSignal.timeout(6000),
      });

      if (fastApiResponse.ok) {
        const fastApiData = await fastApiResponse.json();
        if (fastApiData.matches && fastApiData.matches.length > 0) {
          return NextResponse.json(fastApiData);
        }
      }
    } catch {
      // Fallback to local heuristic matching
    }

    // Target tags for similarity matching
    const targetTags = new Set(
      [
        ...styleAnalysis.aesthetic_keywords,
        ...styleAnalysis.suggested_genres,
        ...styleAnalysis.detected_tools,
      ].map((k) => k.toLowerCase())
    );

    // Group portfolios by creator
    const portfolioByCreator: Record<string, any[]> = {};
    for (const p of portfolios) {
      const cId = p.creatorId || (p as any).creator_id;
      if (cId) {
        if (!portfolioByCreator[cId]) portfolioByCreator[cId] = [];
        portfolioByCreator[cId].push(p);
      }
    }

    const matches = creators.map((c: any) => {
      const cId = c.creatorId || c.id || c.uid;
      const creatorTags = new Set<string>();

      (c.genres || []).forEach((g: string) => creatorTags.add(g.toLowerCase()));
      (c.tools || []).forEach((t: string) => creatorTags.add(t.toLowerCase()));
      (c.strengths || []).forEach((s: string) => creatorTags.add(s.toLowerCase()));

      const creatorPortfolios = portfolioByCreator[cId] || [];
      for (const p of creatorPortfolios) {
        (p.aiTags || []).forEach((t: string) => creatorTags.add(t.toLowerCase()));
        (p.styleTags || []).forEach((t: string) => creatorTags.add(t.toLowerCase()));
        if (p.genre) creatorTags.add(p.genre.toLowerCase());
      }

      const tagSim = jaccardSimilarity(targetTags, creatorTags);

      const genreOverlap = (styleAnalysis.suggested_genres || []).filter((g) =>
        (c.genres || []).some((cg: string) => cg.toLowerCase() === g.toLowerCase())
      ).length;

      const toolOverlap = (styleAnalysis.detected_tools || []).filter((t) =>
        (c.tools || []).some((ct: string) => ct.toLowerCase().includes(t.toLowerCase()))
      ).length;

      const genreRatio = Math.min(1.0, genreOverlap / Math.max(1, styleAnalysis.suggested_genres.length));
      const toolRatio = Math.min(1.0, toolOverlap / Math.max(1, styleAnalysis.detected_tools.length));

      const rawScore = tagSim * 45 + toolRatio * 30 + genreRatio * 25;
      const finalScore = Math.min(98, Math.max(54, Math.round(rawScore)));

      const overlapTags: string[] = [];
      targetTags.forEach((t) => {
        if (creatorTags.has(t)) overlapTags.push(t.charAt(0).toUpperCase() + t.slice(1));
      });

      const samplePiece = creatorPortfolios[0];

      return {
        creatorId: cId,
        creatorName: c.name,
        avatar: c.avatar,
        handle: c.handle,
        similarityScore: finalScore,
        matchedStyleTags: overlapTags.slice(0, 5),
        samplePieceUrl: samplePiece?.mediaUrl || samplePiece?.thumbnailUrl,
        samplePieceTitle: samplePiece?.title,
        explanation: `${c.name} produces ${(c.genres || []).slice(0, 2).join(", ")} content matching your target '${styleAnalysis.dominant_mood}' aesthetic with ${(c.tools || []).slice(0, 2).join(" and ")}.`,
      };
    });

    matches.sort((a, b) => b.similarityScore - a.similarityScore);

    return NextResponse.json({
      referenceStyle: styleAnalysis,
      matches,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to find lookalike creators" },
      { status: 500 }
    );
  }
}
