"""SSRF-guarded URL fetcher and OpenGraph / oEmbed metadata extractor."""

import re
import socket
import ipaddress
import logging
import urllib.parse
from typing import Dict, Any, Optional
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger("ssrf_util")

MAX_RESPONSE_BYTES = 1024 * 1024  # 1 MB max
REQUEST_TIMEOUT_SECONDS = 5.0

ALLOWED_SCHEMES = {"http", "https"}


def is_ip_restricted(ip_str: str) -> bool:
    """Returns True if IP is private, loopback, link-local, multicast, or reserved."""
    try:
        ip = ipaddress.ip_address(ip_str)
        return (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )
    except ValueError:
        return True


def validate_url_safe(url: str) -> str:
    """
    Validates that a URL uses http/https and its resolved IP addresses
    do not belong to private or reserved IP ranges.
    """
    parsed = urllib.parse.urlparse(url.strip())
    if parsed.scheme.lower() not in ALLOWED_SCHEMES:
        raise ValueError(f"Unsupported URL scheme '{parsed.scheme}'. Only http and https are allowed.")

    hostname = parsed.hostname
    if not hostname:
        raise ValueError("Invalid URL: Hostname is missing.")

    hostname_lower = hostname.lower()
    if hostname_lower in {"localhost", "127.0.0.1", "::1", "0.0.0.0", "metadata.google.internal"}:
        raise ValueError("Access to local/metadata hostnames is forbidden.")

    # Check if hostname itself is a raw IP literal
    try:
        if is_ip_restricted(hostname):
            raise ValueError("Direct access to private or local IP ranges is blocked.")
    except ValueError:
        pass

    # Resolve hostname via DNS
    try:
        addr_info = socket.getaddrinfo(hostname, None)
    except socket.gaierror as e:
        raise ValueError(f"Could not resolve host '{hostname}': {e}")

    for item in addr_info:
        ip_addr = item[4][0]
        if is_ip_restricted(ip_addr):
            raise ValueError(f"Host '{hostname}' resolves to restricted IP range '{ip_addr}'. Request blocked for security.")

    return url.strip()


def detect_platform(url: str) -> str:
    """Identify creator content platform from URL domain."""
    domain = urllib.parse.urlparse(url).netloc.lower()
    if "instagram.com" in domain:
        return "Instagram"
    elif "youtube.com" in domain or "youtu.be" in domain:
        return "YouTube"
    elif "tiktok.com" in domain:
        return "TikTok"
    elif "twitter.com" in domain or "x.com" in domain:
        return "X"
    elif "behance.net" in domain:
        return "Behance"
    elif "vimeo.com" in domain:
        return "Vimeo"
    elif "dribbble.com" in domain:
        return "Dribbble"
    elif "artstation.com" in domain:
        return "ArtStation"
    return "Web"


def fetch_safe_metadata(url: str) -> Dict[str, Any]:
    """
    Safely fetches OpenGraph / HTML metadata with strict SSRF controls.
    Does not allow redirects to private hosts.
    """
    safe_url = validate_url_safe(url)
    platform = detect_platform(safe_url)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CreatoraAI-Bot/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    try:
        # Use session and disallow unvalidated redirects
        session = requests.Session()
        resp = session.get(
            safe_url,
            headers=headers,
            timeout=REQUEST_TIMEOUT_SECONDS,
            stream=True,
            allow_redirects=False
        )

        # Handle single safe redirect if present
        if resp.status_code in (301, 302, 303, 307, 308):
            redirect_target = resp.headers.get("Location")
            if redirect_target:
                abs_redirect = urllib.parse.urljoin(safe_url, redirect_target)
                safe_redirect = validate_url_safe(abs_redirect)
                resp = session.get(
                    safe_redirect,
                    headers=headers,
                    timeout=REQUEST_TIMEOUT_SECONDS,
                    stream=True,
                    allow_redirects=False
                )

        if resp.status_code >= 400:
            return {
                "url": url,
                "platform": platform,
                "success": False,
                "message": f"Target server returned HTTP {resp.status_code}. You can enter details manually."
            }

        # Read up to MAX_RESPONSE_BYTES
        content_chunks = []
        bytes_read = 0
        for chunk in resp.iter_content(chunk_size=4096):
            bytes_read += len(chunk)
            if bytes_read > MAX_RESPONSE_BYTES:
                break
            content_chunks.append(chunk)

        html_text = b"".join(content_chunks).decode("utf-8", errors="ignore")
        soup = BeautifulSoup(html_text, "html.parser")

        # Extract title
        og_title = (
            (soup.find("meta", property="og:title") or {}).get("content")
            or (soup.find("meta", attrs={"name": "twitter:title"}) or {}).get("content")
            or (soup.title.string if soup.title else None)
        )

        # Extract description
        og_desc = (
            (soup.find("meta", property="og:description") or {}).get("content")
            or (soup.find("meta", attrs={"name": "description"}) or {}).get("content")
            or (soup.find("meta", attrs={"name": "twitter:description"}) or {}).get("content")
        )

        # Extract thumbnail image
        og_image = (
            (soup.find("meta", property="og:image") or {}).get("content")
            or (soup.find("meta", attrs={"name": "twitter:image"}) or {}).get("content")
        )

        # Extract author name
        author = (
            (soup.find("meta", property="og:site_name") or {}).get("content")
            or (soup.find("meta", attrs={"name": "author"}) or {}).get("content")
        )

        if og_image and not og_image.startswith("http"):
            og_image = urllib.parse.urljoin(safe_url, og_image)

        clean_title = og_title.strip() if og_title else None
        clean_desc = og_desc.strip() if og_desc else None

        return {
            "url": url,
            "platform": platform,
            "title": clean_title[:150] if clean_title else None,
            "description": clean_desc[:500] if clean_desc else None,
            "thumbnailUrl": og_image,
            "authorName": author,
            "success": True,
            "message": None
        }

    except requests.exceptions.RequestException as e:
        logger.warning(f"Error fetching safe URL metadata for {url}: {e}")
        return {
            "url": url,
            "platform": platform,
            "success": False,
            "message": f"Could not automatically fetch URL preview: {str(e)}. You can enter details manually."
        }
    except Exception as e:
        logger.warning(f"Unexpected error validating URL metadata: {e}")
        return {
            "url": url,
            "platform": platform,
            "success": False,
            "message": f"URL fetch failed: {str(e)}"
        }
