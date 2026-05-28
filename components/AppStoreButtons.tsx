"use client";

import { useEffect, useState } from "react";

type Device = "ios" | "android" | "desktop";

function detectDevice(): Device {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

const APP_STORE = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/hubbs";
const PLAY_STORE = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/hubbs";

export default function AppStoreButtons({ label }: { label?: string }) {
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const showIOS     = device === "ios"     || device === "desktop";
  const showAndroid = device === "android" || device === "desktop";

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <p className="text-hubbs-subtle text-sm text-center">{label}</p>
      )}

      {showIOS && (
        <a
          href={APP_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl border font-semibold transition-colors ${
            device === "ios"
              ? "bg-hubbs-primary border-hubbs-primary text-white"
              : "border-hubbs-subtle text-hubbs-subtle hover:border-hubbs-text hover:text-hubbs-text"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          App Store
        </a>
      )}

      {showAndroid && (
        <a
          href={PLAY_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl border font-semibold transition-colors ${
            device === "android"
              ? "bg-hubbs-primary border-hubbs-primary text-white"
              : "border-hubbs-subtle text-hubbs-subtle hover:border-hubbs-text hover:text-hubbs-text"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.18 23.76c.3.17.65.19.96.06l12.14-6.97-2.64-2.63-10.46 9.54zm-1.41-20.7C1.45 3.4 1.25 3.82 1.25 4.34v15.32c0 .52.2.94.52 1.27l.07.06 8.59-8.59v-.2L1.84 3.12l-.07.07-.07.07zM20.33 10.59l-2.56-1.47-2.93 2.93 2.93 2.93 2.58-1.48c.74-.42.74-1.49-.02-1.91zM4.14.18L16.27 7.15 13.63 9.8 3.18.24c.3-.13.65-.11.96.06l-.07-.07.07-.07z"/>
          </svg>
          Google Play
        </a>
      )}
    </div>
  );
}
