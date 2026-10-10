import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, message: "URL is required" }, { status: 400 });
    }

    const cleanUrl = url.trim();
    const parsed = new URL(cleanUrl);

    // Protocol check
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json({ success: false, message: "Only http and https URLs allowed" }, { status: 400 });
    }

    const hostname = parsed.hostname.toLowerCase();
    // SSRF blacklist check
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.16.") ||
      hostname.startsWith("172.17.") ||
      hostname.startsWith("172.18.") ||
      hostname.startsWith("172.19.") ||
      hostname.startsWith("172.2") ||
      hostname.startsWith("172.3") ||
      hostname.startsWith("169.254.") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return NextResponse.json(
        { success: false, message: "Access to private or local hostnames is blocked for security." },
        { status: 400 }
      );
    }

    // Try FastAPI if configured
    const fastApiUrl = process.env.FASTAPI_BACKEND_URL;
    if (fastApiUrl) {
      try {
        const resp = await fetch(`${fastApiUrl}/api/tools/extract-url-metadata`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: cleanUrl }),
        });
        if (resp.ok) {
          const data = await resp.json();
          return NextResponse.json(data);
        }
      } catch (e) {
        // Fallback
      }
    }

    // Detect platform
    let platform = "Web";
    if (hostname.includes("instagram.com")) platform = "Instagram";
    else if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) platform = "YouTube";
    else if (hostname.includes("tiktok.com")) platform = "TikTok";
    else if (hostname.includes("twitter.com") || hostname.includes("x.com")) platform = "X";
    else if (hostname.includes("behance.net")) platform = "Behance";
    else if (hostname.includes("vimeo.com")) platform = "Vimeo";
    else if (hostname.includes("dribbble.com")) platform = "Dribbble";

    // Safe fetch with abort signal for 5s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const fetchResp = await fetch(cleanUrl, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 CreatoraAI-Bot/1.0" },
      });
      clearTimeout(timeoutId);

      if (!fetchResp.ok) {
        return NextResponse.json({
          url: cleanUrl,
          platform,
          success: false,
          message: `Remote server returned HTTP ${fetchResp.status}. Please enter details manually.`,
        });
      }

      const html = await fetchResp.text();

      // Simple regex extraction for OG tags
      const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);

      const title = ogTitleMatch ? ogTitleMatch[1].trim() : undefined;
      const description = ogDescMatch ? ogDescMatch[1].trim() : undefined;
      let thumbnailUrl = ogImageMatch ? ogImageMatch[1].trim() : undefined;

      if (thumbnailUrl && !thumbnailUrl.startsWith("http")) {
        thumbnailUrl = new URL(thumbnailUrl, cleanUrl).toString();
      }

      return NextResponse.json({
        url: cleanUrl,
        platform,
        title,
        description,
        thumbnailUrl,
        success: true,
      });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      return NextResponse.json({
        url: cleanUrl,
        platform,
        success: false,
        message: "Could not fetch preview. You can enter details manually.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
