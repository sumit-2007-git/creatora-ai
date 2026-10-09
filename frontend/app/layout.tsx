import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CommandPalette } from "@/components/ui/CommandPalette";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
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
    <html lang="en">
      <body>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
