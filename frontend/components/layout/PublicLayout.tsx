import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Navbar />{children}<Footer /></div>;
}
