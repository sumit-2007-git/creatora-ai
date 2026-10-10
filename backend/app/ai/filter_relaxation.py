"""Deterministic search filter relaxation and nearest matches engine without AI hallucination."""

from typing import List, Dict, Any, Optional, Set
from pydantic import BaseModel, Field


class RelaxationSuggestion(BaseModel):
    filterKey: str  # e.g. "tool", "genre", "budget", "proofBackedOnly"
    filterValue: Any  # e.g. "Kling AI"
    label: str  # e.g. "Remove tool 'Kling AI' filter"
    newCount: int  # number of creators matching after relaxation
    gain: int  # additional creators unlocked


class NearestMatchCreator(BaseModel):
    creator: Dict[str, Any]
    unmetCriteria: List[str]  # e.g. ["Missing tool: Kling AI", "Rate $2,500 exceeds $1,000"]
    matchPercentage: int


class RelaxationResponse(BaseModel):
    currentCount: int
    suggestions: List[RelaxationSuggestion]
    nearestMatches: List[NearestMatchCreator]


def _parse_budget_number(budget_str: Optional[str]) -> Optional[float]:
    if not budget_str:
        return None
    cleaned = budget_str.replace("$", "").replace(",", "").replace("/piece", "").strip()
    try:
        return float(cleaned)
    except ValueError:
        return None


def creator_matches_criterion(creator: Dict[str, Any], key: str, value: Any) -> bool:
    """Check if creator matches a specific filter criterion."""
    if not value:
        return True

    if key == "genre":
        c_genres = [g.lower() for g in creator.get("genres", [])]
        return str(value).lower() in c_genres

    if key == "tool":
        c_tools = [t.lower() for t in creator.get("tools", [])]
        return any(str(value).lower() in t for t in c_tools)

    if key == "contentType":
        c_types = [ct.lower() for ct in creator.get("contentTypes", [])]
        return str(value).lower() in c_types

    if key == "proofBackedOnly":
        if bool(value):
            return creator.get("trustTier") == "proof-backed"
        return True

    if key == "budget" or key == "maxBudget":
        max_b = _parse_budget_number(str(value))
        if max_b is not None:
            c_rate = _parse_budget_number(creator.get("rate"))
            if c_rate is not None:
                return c_rate <= max_b
        return True

    if key == "minFollowers":
        try:
            min_f = int(value)
            return int(creator.get("totalFollowers", 0)) >= min_f
        except (ValueError, TypeError):
            return True

    return True


def compute_filter_relaxations(
    creators: List[Dict[str, Any]],
    active_filters: Dict[str, Any],
) -> RelaxationResponse:
    """Deterministic algorithm calculating filter relaxation gains and nearest matches."""
    # 1. Normalize active filters (ignore None / empty strings / False)
    clean_filters: Dict[str, Any] = {}
    for k, v in active_filters.items():
        if v is None or v == "" or v == "All" or v is False:
            continue
        clean_filters[k] = v

    # 2. Count current matching creators
    def filter_passes(creator: Dict[str, Any], filters_to_check: Dict[str, Any]) -> bool:
        for fk, fv in filters_to_check.items():
            if not creator_matches_criterion(creator, fk, fv):
                return False
        return True

    current_matches = [c for c in creators if filter_passes(c, clean_filters)]
    current_count = len(current_matches)

    # 3. If there are active filters, test dropping each filter one by one
    suggestions: List[RelaxationSuggestion] = []
    for fk, fv in clean_filters.items():
        # Relaxed filter set without fk
        relaxed_set = {k: v for k, v in clean_filters.items() if k != fk}
        relaxed_matches = [c for c in creators if filter_passes(c, relaxed_set)]
        relaxed_count = len(relaxed_matches)
        gain = relaxed_count - current_count

        if gain > 0:
            if fk == "tool":
                label = f"Remove tool '{fv}'"
            elif fk == "genre":
                label = f"Remove genre '{fv}'"
            elif fk == "contentType":
                label = f"Remove format '{fv}'"
            elif fk == "proofBackedOnly":
                label = "Include link-checked & self-reported tiers"
            elif fk in ("budget", "maxBudget"):
                label = f"Relax budget constraint ({fv})"
            elif fk == "minFollowers":
                label = f"Lower minimum follower threshold ({fv})"
            else:
                label = f"Remove '{fk}: {fv}'"

            suggestions.append(
                RelaxationSuggestion(
                    filterKey=fk,
                    filterValue=fv,
                    label=label,
                    newCount=relaxed_count,
                    gain=gain,
                )
            )

    # Sort suggestions by highest gain descending
    suggestions.sort(key=lambda s: s.gain, reverse=True)

    # 4. Find nearest matches: creators that failed exactly 1 filter
    nearest_matches: List[NearestMatchCreator] = []
    if current_count < 3 and clean_filters:
        for c in creators:
            # Check which filters this creator failed
            failed_criteria: List[str] = []
            for fk, fv in clean_filters.items():
                if not creator_matches_criterion(c, fk, fv):
                    if fk == "tool":
                        failed_criteria.append(f"Tool missing: {fv}")
                    elif fk == "genre":
                        failed_criteria.append(f"Genre: {fv}")
                    elif fk == "proofBackedOnly":
                        failed_criteria.append("Tier: Link-checked (not proof-backed)")
                    elif fk in ("budget", "maxBudget"):
                        failed_criteria.append(f"Rate: {c.get('rate', 'N/A')} (exceeds {fv})")
                    else:
                        failed_criteria.append(f"Missing {fk}: {fv}")

            # If failed exactly 1 filter, include as nearest match
            if len(failed_criteria) == 1:
                nearest_matches.append(
                    NearestMatchCreator(
                        creator=c,
                        unmetCriteria=failed_criteria,
                        matchPercentage=85,
                    )
                )

    # Limit to top 6 nearest matches
    nearest_matches = nearest_matches[:6]

    return RelaxationResponse(
        currentCount=current_count,
        suggestions=suggestions,
        nearestMatches=nearest_matches,
    )
