import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ContextCursorProvider } from "@/components/ui/ContextCursorProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fbf0d9",
};

export const metadata: Metadata = {
  title: "Creatora AI — AI Creator Marketplace | Where Creativity Meets AI",
  description: "Connect with elite AI filmmakers, 3D artists, and visual storytellers. Discover unique portfolios and launch impactful campaigns powered by generative intelligence.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="inkspark">
      <head>
        {/* Google Fonts: Permanent Marker & Zen Maru Gothic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Inline Theme Initializer to prevent flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('creatora-inkspark-theme') || 'inkspark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {/* SVG <defs> mounted once at app root for #wob displacement filter */}
        <svg
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="wob">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <ContextCursorProvider>
          {children}
          <CommandPalette />
        </ContextCursorProvider>
      </body>
    </html>
  );
}
