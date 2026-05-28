"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HubbsLogo from "@/components/HubbsLogo";
import AppStoreButtons from "@/components/AppStoreButtons";
import DeepLinkHandler from "@/components/DeepLinkHandler";
import InvitationError from "@/components/InvitationError";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalendarInvitation = {
  token: string;
  type: string;
  inviter_name: string;
  status: string;
  data?: {
    title?: string;
    start_datetime?: string;
    end_datetime?: string;
    location?: string;
    description?: string;
  };
};

type Lang = "en" | "ar";
type ErrorType = "not_found" | "expired" | "network" | "unknown" | null;
type ResponseStatus = "idle" | "loading" | "accepted" | "declined" | "error";

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    headline: (name: string) => `${name} has invited you to an event`,
    by: "Organised by",
    accept: "Accept",
    decline: "Decline",
    openApp: "Open in Hubbs",
    acceptedMsg: "You accepted this invitation! Download Hubbs to see it in your calendar.",
    declinedMsg: "You declined this invitation.",
    addGoogle: "Add to Google Calendar",
    addApple: "Download .ics File",
    responseError: "Could not save your response. Please try again.",
    or: "or",
  },
  ar: {
    headline: (name: string) => `دعاك ${name} إلى فعالية`,
    by: "نظّمها",
    accept: "قبول",
    decline: "رفض",
    openApp: "فتح في هبس",
    acceptedMsg: "لقد قبلت هذه الدعوة! حمّل هبس لرؤيتها في تقويمك.",
    declinedMsg: "لقد رفضت هذه الدعوة.",
    addGoogle: "إضافة إلى تقويم Google",
    addApple: "تحميل ملف .ics",
    responseError: "تعذّر حفظ ردّك. يرجى المحاولة مجدداً.",
    or: "أو",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso?: string, lang: Lang = "en"): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(lang === "ar" ? "ar-SA" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function toICSDate(iso?: string): string {
  if (!iso) return "";
  return iso.replace(/[-:]/g, "").replace(/\.\d+/, "").replace(/Z$/, "Z");
}

function generateICS(data: {
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  uid: string;
}): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hubbs//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${toICSDate(data.start)}`,
    `DTEND:${toICSDate(data.end || data.start)}`,
    `SUMMARY:${data.title.replace(/\n/g, "\\n")}`,
    data.location ? `LOCATION:${data.location.replace(/\n/g, "\\n")}` : null,
    data.description ? `DESCRIPTION:${data.description.replace(/\n/g, "\\n")}` : null,
    `UID:${data.uid}@hubbsapp.com`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];
  return lines.join("\r\n");
}

function googleCalendarUrl(data: {
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
}): string {
  const fmt = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d+/, "").replace(/Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: data.title,
    dates: `${fmt(data.start)}/${fmt(data.end || data.start)}`,
    ...(data.location && { location: data.location }),
    ...(data.description && { details: data.description }),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const API    = process.env.NEXT_PUBLIC_HUBBS_API_URL    ?? "https://api.hubbsapp.com";
const SCHEME = process.env.NEXT_PUBLIC_DEEP_LINK_SCHEME ?? "hubbs";

export default function CalendarInvitePage() {
  const { token } = useParams<{ token: string }>();
  const [invitation, setInvitation] = useState<CalendarInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>("idle");

  useEffect(() => {
    if (navigator.language.toLowerCase().startsWith("ar")) {
      setLang("ar");
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/invitations/link/${token}`)
      .then(async (res) => {
        if (res.status === 404) { setError("not_found"); return; }
        if (res.status === 410) { setError("expired");   return; }
        if (!res.ok)            { setError("unknown");   return; }
        setInvitation(await res.json());
      })
      .catch(() => setError("network"))
      .finally(() => setLoading(false));
  }, [token]);

  const respond = async (response: "accepted" | "declined") => {
    setResponseStatus("loading");
    try {
      const res = await fetch(`${API}/api/invitations/link/${token}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      if (!res.ok) throw new Error();
      setResponseStatus(response);
    } catch {
      setResponseStatus("error");
    }
  };

  const downloadICS = () => {
    const d = invitation?.data;
    if (!d?.title || !d?.start_datetime) return;
    const content = generateICS({
      title: d.title,
      start: d.start_datetime,
      end: d.end_datetime ?? d.start_datetime,
      location: d.location,
      description: d.description,
      uid: token,
    });
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${d.title.replace(/\s+/g, "-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const t = T[lang];
  const deepLink = `${SCHEME}://invite/calendar/${token}`;
  const fallback =
    typeof navigator !== "undefined" && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
      ? (process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/hubbs")
      : (process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/hubbs");

  if (loading) return <LoadingSkeleton />;
  if (error || !invitation) return <InvitationError type={error} lang={lang} />;

  const d = invitation.data ?? {};
  const responded = responseStatus === "accepted" || responseStatus === "declined";

  return (
    <main className="min-h-screen bg-hubbs-dark flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-md space-y-4">

        <div className="flex justify-center mb-2">
          <HubbsLogo />
        </div>

        {/* Invitation Headline */}
        <p className="text-center text-hubbs-subtle text-sm">
          {t.headline(invitation.inviter_name)}
        </p>

        {/* Event Card */}
        <div className="bg-hubbs-card rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-bold text-hubbs-text">
            {d.title ?? "Event"}
          </h1>

          {d.start_datetime && (
            <div className="flex items-start gap-3 text-sm">
              <span className="text-xl mt-0.5">📅</span>
              <div>
                <p className="text-hubbs-text font-medium">
                  {formatDateTime(d.start_datetime, lang)}
                </p>
                {d.end_datetime && (
                  <p className="text-hubbs-subtle">
                    → {formatDateTime(d.end_datetime, lang)}
                  </p>
                )}
              </div>
            </div>
          )}

          {d.location && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xl">📍</span>
              <p className="text-hubbs-text">{d.location}</p>
            </div>
          )}

          {d.description && (
            <div className="flex items-start gap-3 text-sm">
              <span className="text-xl mt-0.5">📝</span>
              <p className="text-hubbs-subtle leading-relaxed">{d.description}</p>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm pt-2 border-t border-hubbs-dark">
            <span className="text-xl">👤</span>
            <p className="text-hubbs-subtle">
              {t.by}: <span className="text-hubbs-text font-medium">{invitation.inviter_name}</span>
            </p>
          </div>
        </div>

        {/* Response Confirmation */}
        {responded ? (
          <div
            className={`rounded-2xl p-5 text-center font-semibold ${
              responseStatus === "accepted"
                ? "bg-hubbs-success/20 text-hubbs-success"
                : "bg-hubbs-danger/20 text-hubbs-danger"
            }`}
          >
            {responseStatus === "accepted" ? "✅ " : "❌ "}
            {responseStatus === "accepted" ? t.acceptedMsg : t.declinedMsg}
          </div>
        ) : (
          <>
            {/* Accept / Decline */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => respond("accepted")}
                disabled={responseStatus === "loading"}
                className="py-4 rounded-xl font-bold text-white bg-hubbs-success disabled:opacity-60 transition-opacity"
              >
                {responseStatus === "loading" ? "…" : t.accept}
              </button>
              <button
                onClick={() => respond("declined")}
                disabled={responseStatus === "loading"}
                className="py-4 rounded-xl font-bold text-white bg-hubbs-danger disabled:opacity-60 transition-opacity"
              >
                {responseStatus === "loading" ? "…" : t.decline}
              </button>
            </div>

            {responseStatus === "error" && (
              <p className="text-hubbs-danger text-sm text-center">{t.responseError}</p>
            )}

            {/* Open in App */}
            <DeepLinkHandler deepLink={deepLink} label={t.openApp} fallbackUrl={fallback} />
          </>
        )}

        {/* Add to Calendar */}
        {d.title && d.start_datetime && (
          <div className="bg-hubbs-card rounded-2xl p-5 space-y-3">
            <a
              href={googleCalendarUrl({
                title: d.title,
                start: d.start_datetime,
                end: d.end_datetime ?? d.start_datetime,
                location: d.location,
                description: d.description,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-hubbs-subtle text-hubbs-text font-semibold text-sm transition-colors hover:border-hubbs-primary hover:text-hubbs-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8"  y1="2" x2="8"  y2="6" />
                <line x1="3"  y1="10" x2="21" y2="10" />
              </svg>
              {t.addGoogle}
            </a>

            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-hubbs-subtle text-hubbs-text font-semibold text-sm transition-colors hover:border-hubbs-primary hover:text-hubbs-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.addApple}
            </button>
          </div>
        )}

        {/* Divider + App Store */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-hubbs-card" />
          <span className="text-hubbs-subtle text-xs">{t.or}</span>
          <div className="flex-1 border-t border-hubbs-card" />
        </div>
        <AppStoreButtons />

      </div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-hubbs-dark flex items-center justify-center">
      <div className="w-full max-w-md px-4 space-y-4 animate-pulse">
        <div className="h-10 w-32 bg-hubbs-card rounded-lg mx-auto" />
        <div className="h-8 w-64 bg-hubbs-card rounded mx-auto" />
        <div className="h-56 bg-hubbs-card rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 bg-hubbs-card rounded-xl" />
          <div className="h-14 bg-hubbs-card rounded-xl" />
        </div>
        <div className="h-14 bg-hubbs-card rounded-xl" />
      </div>
    </div>
  );
}
