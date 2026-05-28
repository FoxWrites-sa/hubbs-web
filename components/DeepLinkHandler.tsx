"use client";

import { useState } from "react";

interface Props {
  deepLink: string;
  label?: string;
  fallbackUrl: string;
  className?: string;
}

export default function DeepLinkHandler({
  deepLink,
  label = "Open in Hubbs",
  fallbackUrl,
  className,
}: Props) {
  const [status, setStatus] = useState<"idle" | "trying">("idle");

  const handleOpen = () => {
    setStatus("trying");

    // Try to open the deep link
    window.location.href = deepLink;

    // If the app is not installed, the browser stays on this page.
    // After 2.5 s we redirect to the appropriate store.
    const timer = setTimeout(() => {
      setStatus("idle");
      window.location.href = fallbackUrl;
    }, 2500);

    // If the page loses visibility (app opened), cancel the redirect
    const handleVisibility = () => {
      if (document.hidden) {
        clearTimeout(timer);
        setStatus("idle");
        document.removeEventListener("visibilitychange", handleVisibility);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
  };

  return (
    <button
      onClick={handleOpen}
      disabled={status === "trying"}
      className={
        className ??
        "w-full py-4 bg-hubbs-primary text-white rounded-xl font-bold text-lg transition-opacity disabled:opacity-70"
      }
    >
      {status === "trying" ? "Opening Hubbs…" : label}
    </button>
  );
}
