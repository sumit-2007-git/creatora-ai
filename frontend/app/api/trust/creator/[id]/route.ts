import { NextRequest, NextResponse } from "next/server";
import { TrustProfile, TrustClaim } from "@/types/creator";
import { demoCreators } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const creatorId = params.id;
    const creator = demoCreators.find((c) => c.creatorId === creatorId || c.uid === creatorId) || demoCreators[0];

    const isProofBacked = creator.trustTier === "proof-backed";
    const isLinkChecked = creator.trustTier === "link-checked";

    // Deterministic demo claims list
    const claims: TrustClaim[] = [
      {
        id: `claim-${creatorId}-1`,
        creatorId,
        type: "tool",
        claim: `Expert production mastery in ${creator.tools?.[0] || "Runway Gen-3"}`,
        tier: isProofBacked ? "proof-backed" : isLinkChecked ? "link-checked" : "self-reported",
        evidence: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            description: "Workspace timeline project file screenshot"
          }
        ],
        checkedAt: "2026-10-09T18:00:00Z",
        checkedBy: isProofBacked ? "gemini" : "system",
        confidence: isProofBacked ? 0.92 : 0.65,
        observations: ["Identified legitimate workspace controls, keyframes, and parameter nodes matching claimed asset."],
        mismatches: [],
        reasons: [],
        c2paDetected: isProofBacked
      },
      {
        id: `claim-${creatorId}-2`,
        creatorId,
        type: "past-work",
        claim: "Commercial client deliverable for global consumer campaign",
        tier: isProofBacked || isLinkChecked ? "link-checked" : "self-reported",
        evidence: [
          {
            type: "url",
            url: `https://instagram.com/${creator.instagram?.username || creator.handle.replace('@', '')}`,
            description: "Live verified social campaign reel"
          }
        ],
        checkedAt: "2026-10-09T19:30:00Z",
        checkedBy: "system",
        confidence: 0.88,
        observations: ["SSRF gateway fetched valid metadata matching creator handle and portfolio preview."],
        mismatches: [],
        reasons: []
      },
      {
        id: `claim-${creatorId}-3`,
        creatorId,
        type: "licence",
        claim: "Full commercial intellectual property rights & model releases provided for deliverables",
        tier: "self-reported",
        evidence: [],
        checkedAt: "2026-10-09T20:00:00Z",
        checkedBy: "system",
        confidence: 0.70,
        observations: ["Standard Creatora commercial guarantee agreed upon during onboarding."],
        mismatches: [],
        reasons: []
      }
    ];

    const proofBackedCount = claims.filter((c) => c.tier === "proof-backed").length;
    const linkCheckedCount = claims.filter((c) => c.tier === "link-checked").length;
    const selfReportedCount = claims.filter((c) => c.tier === "self-reported").length;
    const needsProofCount = claims.filter((c) => c.tier === "needs-proof").length;

    const trustScore = creator.trustScore || (isProofBacked ? 92 : isLinkChecked ? 78 : 58);
    const dominantTier = creator.trustTier || (isProofBacked ? "proof-backed" : isLinkChecked ? "link-checked" : "self-reported");

    const profile: TrustProfile = {
      creatorId,
      trustScore,
      dominantTier,
      claimsCount: claims.length,
      proofBackedCount,
      linkCheckedCount,
      selfReportedCount,
      needsProofCount,
      checklist: {
        toolsVerified: proofBackedCount > 0,
        pastWorkLinked: linkCheckedCount > 0,
        processProofAdded: proofBackedCount > 0,
        licenceStated: true,
        profileComplete: true,
      },
      claims,
    };

    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load trust profile" }, { status: 500 });
  }
}
