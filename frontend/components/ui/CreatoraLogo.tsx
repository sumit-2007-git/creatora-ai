import Image from "next/image";
import Link from "next/link";

interface CreatoraLogoProps {
  size?: number;
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  href?: string;
}

export function CreatoraLogo({
  size = 36,
  showText = true,
  showSubtitle = true,
  className = "",
  href = "/",
}: CreatoraLogoProps) {
  const content = (
    <div
      className={`brand-mark ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      {/* Glowing Creatora Icon */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(124, 92, 252, 0.35)",
          flexShrink: 0,
          background: "#161026",
          position: "relative",
        }}
      >
        <Image
          src="/creatora-logo.png"
          alt="Creatora AI Logo"
          width={size}
          height={size}
          priority
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: Math.round(size * 0.28),
          }}
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span
            style={{
              fontSize: Math.max(16, Math.round(size * 0.55)),
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.04em",
            }}
          >
            Creatora AI
          </span>
          {showSubtitle && (
            <span
              style={{
                fontSize: Math.max(8.5, Math.round(size * 0.24)),
                fontWeight: 700,
                color: "var(--purple-primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              AI Creator Marketplace
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return content;
}
