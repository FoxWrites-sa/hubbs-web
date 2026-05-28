"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HubbsLogo from "@/components/HubbsLogo";
import AppStoreButtons from "@/components/AppStoreButtons";
import DeepLinkHandler from "@/components/DeepLinkHandler";
import InvitationError from "@/components/InvitationError";

// ─── Types ────────────────────────────────────────────────────────────────────

type Participant = { name: string; initials: string };

type ChallengeInvitation = {
  token: string;
  type: string;
  inviter_name: string;
  status: string;
  data?: {
    name?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    category?: string;
    participants?: Participant[];
    participant_count?: number;
  };
};

type Lang = "en" | "ar";
type ErrorType = "not_found" | "expired" | "network" | "unknown" | null;

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    headline: (name: string) => `${name} has challenged you on Hubbs!`,
    subtitle: "Accept the challenge and track your progress together",
    participants: (n: number) => `${n} participant${n !== 1 ? "s" : ""}`,
    dates: (start: string, end: string) => `${start} → ${end}`,
    joinChallenge: "Join This Challenge",
    downloadPrompt: "Download Hubbs to join and track your progress",
    or: "or",
    qrTitle: "Scan to join on your phone",
    qrSubtitle: "Point your camera at the code below",
    categories: {
      health: "🏃 Health",
      productivity: "⚡ Productivity",
      social: "👥 Social",
      mindfulness: "🧘 Mindfulness",
      spiritual: "🤲 Spiritual",
    } as Record<string, string>,
  },
  ar: {
    headline: (name: string) => `تحدّاك ${name} على هبس!`,
    subtitle: "اقبل التحدي وتتبع تقدمك معاً",
    participants: (n: number) => `${n} مشارك`,
    dates: (start: string, end: string) => `${start} ← ${end}`,
    joinChallenge: "انضم إلى التحدي",
    downloadPrompt: "حمّل هبس للانضمام وتتبع تقدمك",
    or: "أو",
    qrTitle: "امسح للانضمام من هاتفك",
    qrSubtitle: "وجّه كاميرتك نحو الرمز أدناه",
    categories: {
      health: "🏃 صحة",
      productivity: "⚡ إنتاجية",
      social: "👥 اجتماعي",
      mindfulness: "🧘 يقظة",
      spiritual: "🤲 روحي",
    } as Record<string, string>,
  },
};

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

const AVATAR_COLORS = [
  "bg-orange-500", "bg-purple-500", "bg-blue-500",
  "bg-green-500", "bg-pink-500", "bg-yellow-500",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const API    = process.env.NEXT_PUBLIC_HUBBS_API_URL    ?? "https://api.hubbsapp.com";
const SCHEME = process.env.NEXT_PUBLIC_DEEP_LINK_SCHEME ?? "hubbs";

export default function ChallengeInvitePage() {
  const { token } = useParams<{ token: string }>();
  const [invitation, setInvitation] = useState<ChallengeInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [isDesktop, setIsDesktop] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsDesktop(!/iphone|ipad|ipod|android/.test(ua));
    setPageUrl(window.location.href);
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

  const t = T[lang];
  const deepLink = `${SCHEME}://invite/challenge/${token}`;
  const fallback =
    typeof navigator !== "undefined" && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
      ? (process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/hubbs")
      : (process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/hubbs");

  if (loading) return <LoadingSkeleton />;
  if (error || !invitation) return <InvitationError type={error} lang={lang} />;

  const d = invitation.data ?? {};
  const participants: Participant[] = d.participants ?? [];
  const totalParticipants = d.participant_count ?? participants.length;
  const category = d.category ? t.categories[d.category] ?? d.category : null;

  return (
    <main className="min-h-screen bg-hubbs-dark flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-md space-y-4">

        <div className="flex justify-center mb-2">
          <HubbsLogo />
        </div>

        {/* Challenge Hero */}
        <div className="bg-hubbs-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-hubbs-purple/20 flex items-center justify-center text-3xl flex-shrink-0">
              🏆
            </div>
            <div>
              {category && (
                <span className="text-xs font-semibold text-hubbs-purple uppercase tracking-wider">
                  {category}
                </span>
              )}
              <h1 className="text-lg font-bold text-hubbs-text leading-tight">
                {d.name ?? "Challenge"}
              </h1>
            </div>
          </div>

          <p className="text-hubbs-subtle text-sm mb-4">
            {t.headline(invitation.inviter_name)}
          </p>

          {d.description && (
            <p className="text-hubbs-text text-sm leading-relaxed mb-4">
              {d.description}
            </p>
          )}

          {/* Dates */}
          {(d.start_date || d.end_date) && (
            <div className="flex items-center gap-2 text-sm text-hubbs-subtle mb-4">
              <span>📅</span>
              <span>{t.dates(formatDate(d.start_date), formatDate(d.end_date))}</span>
            </div>
          )}

          {/* Participants */}
          {totalParticipants > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {participants.slice(0, 5).map((p, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold border-2 border-hubbs-card`}
                    title={p.name}
                  >
                    {p.initials || getInitials(p.name)}
                  </div>
                ))}
                {totalParticipants > 5 && (
                  <div className="w-8 h-8 rounded-full bg-hubbs-card border-2 border-hubbs-card flex items-center justify-center text-hubbs-subtle text-xs">
                    +{totalParticipants - 5}
                  </div>
                )}
              </div>
              <span className="text-hubbs-subtle text-sm">
                {t.participants(totalParticipants)}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <DeepLinkHandler deepLink={deepLink} label={t.joinChallenge} fallbackUrl={fallback} />

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-hubbs-card" />
          <span className="text-hubbs-subtle text-xs">{t.or}</span>
          <div className="flex-1 border-t border-hubbs-card" />
        </div>

        <AppStoreButtons label={t.downloadPrompt} />

        {/* QR Code — desktop only */}
        {isDesktop && pageUrl && (
          <div className="bg-hubbs-card rounded-2xl p-6 text-center">
            <p className="text-hubbs-text font-semibold mb-1">{t.qrTitle}</p>
            <p className="text-hubbs-subtle text-xs mb-4">{t.qrSubtitle}</p>
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}`}
                  alt="QR Code"
                  width={180}
                  height={180}
                  className="rounded block"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-hubbs-dark flex items-center justify-center">
      <div className="w-full max-w-md px-4 space-y-4 animate-pulse">
        <div className="h-10 w-32 bg-hubbs-card rounded-lg mx-auto" />
        <div className="h-56 bg-hubbs-card rounded-2xl" />
        <div className="h-14 bg-hubbs-card rounded-xl" />
      </div>
    </div>
  );
}
