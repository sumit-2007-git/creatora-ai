"use client";

import { usePathname, useRouter } from "next/navigation";

export function BackArrowButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on root landing page
  if (pathname === "/" || !pathname) {
    return null;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="back-arrow-pill"
      title="Back to previous page"
      aria-label="Back to previous page"
    >
      <span style={{ fontSize: 16 }}>←</span>
      <span>Back</span>
    </button>
  );
}
