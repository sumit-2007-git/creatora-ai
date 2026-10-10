import { NextRequest, NextResponse } from "next/server";
import marketplaceData from "@/lib/server/marketplaceData.json";

function parseBudget(budgetStr?: string): number | null {
  if (!budgetStr) return null;
  const cleaned = budgetStr.replace(/[\$,]/g, "").replace(/\/piece/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function matchesCriterion(creator: any, key: string, value: any): boolean {
  if (!value || value === "All") return true;

  if (key === "genre") {
    const cGenres = (creator.genres || []).map((g: string) => g.toLowerCase());
    return cGenres.includes(String(value).toLowerCase());
  }

  if (key === "tool") {
    const cTools = (creator.tools || []).map((t: string) => t.toLowerCase());
    return cTools.some((t: string) => t.includes(String(value).toLowerCase()));
  }

  if (key === "contentType") {
    const cTypes = (creator.contentTypes || []).map((ct: string) => ct.toLowerCase());
    return cTypes.includes(String(value).toLowerCase());
  }

  if (key === "proofBackedOnly") {
    if (Boolean(value)) {
      return creator.trustTier === "proof-backed";
    }
    return true;
  }

  if (key === "budget" || key === "maxBudget") {
    const maxB = parseBudget(String(value));
    if (maxB !== null) {
      const cRate = parseBudget(creator.rate);
      if (cRate !== null) {
        return cRate <= maxB;
      }
    }
    return true;
  }

  if (key === "minFollowers") {
    const minF = parseInt(String(value), 10);
    if (!isNaN(minF)) {
      return (creator.totalFollowers || 0) >= minF;
    }
    return true;
  }

  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const activeFilters = body.filters || {};
    const creators = marketplaceData.creators || [];

    // Filter out null / empty / false filters
    const cleanFilters: Record<string, any> = {};
    for (const [k, v] of Object.entries(activeFilters)) {
      if (v === null || v === undefined || v === "" || v === "All" || v === false) continue;
      cleanFilters[k] = v;
    }

    const passesAll = (c: any, filtersToCheck: Record<string, any>) => {
      for (const [k, v] of Object.entries(filtersToCheck)) {
        if (!matchesCriterion(c, k, v)) return false;
      }
      return true;
    };

    const currentMatches = creators.filter((c: any) => passesAll(c, cleanFilters));
    const currentCount = currentMatches.length;

    // Compute relaxation gains
    const suggestions: Array<{
      filterKey: string;
      filterValue: any;
      label: string;
      newCount: number;
      gain: number;
    }> = [];

    for (const [fk, fv] of Object.entries(cleanFilters)) {
      const relaxedFilters = { ...cleanFilters };
      delete relaxedFilters[fk];

      const relaxedMatches = creators.filter((c: any) => passesAll(c, relaxedFilters));
      const relaxedCount = relaxedMatches.length;
      const gain = relaxedCount - currentCount;

      if (gain > 0) {
        let label = `Remove '${fk}: ${fv}'`;
        if (fk === "tool") label = `Remove tool '${fv}'`;
        else if (fk === "genre") label = `Remove genre '${fv}'`;
        else if (fk === "contentType") label = `Remove format '${fv}'`;
        else if (fk === "proofBackedOnly") label = "Include link-checked & self-reported tiers";
        else if (fk === "budget" || fk === "maxBudget") label = `Relax budget constraint (${fv})`;
        else if (fk === "minFollowers") label = `Lower minimum followers threshold (${fv})`;

        suggestions.push({
          filterKey: fk,
          filterValue: fv,
          label,
          newCount: relaxedCount,
          gain,
        });
      }
    }

    suggestions.sort((a, b) => b.gain - a.gain);

    // Compute nearest matches (failed exactly 1 filter)
    const nearestMatches: Array<{
      creator: any;
      unmetCriteria: string[];
      matchPercentage: number;
    }> = [];

    if (currentCount < 3 && Object.keys(cleanFilters).length > 0) {
      for (const c of creators) {
        const failed: string[] = [];
        for (const [fk, fv] of Object.entries(cleanFilters)) {
          if (!matchesCriterion(c, fk, fv)) {
            if (fk === "tool") failed.push(`Tool missing: ${fv}`);
            else if (fk === "genre") failed.push(`Genre missed: ${fv}`);
            else if (fk === "proofBackedOnly") failed.push("Tier: Link-checked (not proof-backed)");
            else if (fk === "budget" || fk === "maxBudget") failed.push(`Rate ${c.rate || "N/A"} exceeds ${fv}`);
            else failed.push(`Missing ${fk}: ${fv}`);
          }
        }

        if (failed.length === 1) {
          nearestMatches.push({
            creator: c,
            unmetCriteria: failed,
            matchPercentage: 85,
          });
        }
      }
    }

    return NextResponse.json({
      currentCount,
      suggestions,
      nearestMatches: nearestMatches.slice(0, 6),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to compute relaxations" },
      { status: 500 }
    );
  }
}
