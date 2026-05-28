"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HubbsLogo from "@/components/HubbsLogo";
import AppStoreButtons from "@/components/AppStoreButtons";
import DeepLinkHandler from "@/components/DeepLinkHandler";
import InvitationError from "@/components/InvitationError";

// ─── Types ────────────────────────────────────────────────────────────────────

type FamilyInvitation = {
  token: string;
  type: string;
  inviter_name: string;
  status: string;
  data?: {
    family_name?: string;
    member_count?: number;
  };
};

type Lang = "en" | "ar";
type ErrorType = "not_found" | "expired" | "network" | "unknown" | null;

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    title: (name: string) => `${name} has invited you to join their family on Hubbs`,
    subtitle: "Start your family wellness journey together",
    familyLabel: "Family:",
    features: [
      "👨‍👩‍👧‍👦 Shared family calendar & events",
      "💪 Family challenges & goals",
      "🤖 Family AI assistant",
      "📊 Family wellness insights",
      "🛡️ Parent control dashboard",
    ],
    openApp: "Open in Hubbs",
    downloadLabel: "Don't have Hubbs yet?",
    or: "or",
    qrTitle: "Scan to open on your phone",
    qrSubtitle: "Point your camera at the code below",
  },
  ar: {
    title: (name: string) => `دعاك ${name} للانضمام إلى عائلته على هبس`,
    subtitle: "ابدأوا رحلة العافية العائلية معاً",
    familyLabel: "العائلة:",
    features: [
      "👨‍👩‍👧‍👦 تقويم عائلي وفعاليات مشتركة",
      "💪 تحديات وأهداف عائلية",
      "🤖 مساعد ذكاء اصطناعي للعائلة",
      "📊 رؤى صحية عائلية",
      "🛡️ لوحة تحكم الوالدين",
    ],
    openApp: "فتح في هبس",
    downloadLabel: "لا تملك هبس بعد؟",
    or: "أو",
    qrTitle: "امسح للفتح على هاتفك",
    qrSubtitle: "وجّه كاميرتك نحو الرمز أدناه",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_HUBBS_API_URL ?? "https://api.hubbsapp.com";
const SCHEME = process.env.NEXT_PUBLIC_DEEP_LINK_SCHEME ?? "hubbs";

export default function FamilyInvitePage() {
  const { token } = useParams<{ token: string }>();
  const [invitation, setInvitation] = useState<FamilyInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [isDesktop, setIsDesktop] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const mobile = /iphone|ipad|ipod|android/.test(ua);
    setIsDesktop(!mobile);
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
  const deepLink = `${SCHEME}://invite/family/${token}`;
  const fallback =
    typeof navigator !== "undefined" &&
    /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
      ? (process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/hubbs")
      : (process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store/apps/hubbs");

  if (loading) return <LoadingSkeleton />;
  if (error || !invitation) return <InvitationError type={error} lang={lang} />;

  return (
    <main className="min-h-screen bg-hubbs-dark flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-md space-y-4">

        {/* Header */}
        <div className="flex justify-center mb-2">
          <HubbsLogo />
        </div>

        {/* Invitation Hero */}
        <div className="bg-hubbs-card rounded-2xl p-6 text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-hubbs-primary/20 flex items-center justify-center text-4xl">
            👨‍👩‍👧‍👦
          </div>
          <h1 className="text-lg font-bold text-hubbs-text leading-snug mb-1">
            {t.title(invitation.inviter_name)}
          </h1>
          {invitation.data?.family_name && (
            <p className="text-hubbs-primary font-semibold mt-1">
              {t.familyLabel} {invitation.data.family_name}
            </p>
          )}
          <p className="text-hubbs-subtle text-sm mt-2">{t.subtitle}</p>
        </div>

        {/* Features */}
        <div className="bg-hubbs-card rounded-2xl p-6">
          <ul className="space-y-3">
            {t.features.map((f, i) => (
              <li key={i} className="text-hubbs-text text-sm">{f}</li>
            ))}
          </ul>
        </div>

        {/* Deep Link CTA */}
        <DeepLinkHandler deepLink={deepLink} label={t.openApp} fallbackUrl={fallback} />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-hubbs-card" />
          <span className="text-hubbs-subtle text-xs">{t.or}</span>
          <div className="flex-1 border-t border-hubbs-card" />
        </div>

        {/* App Store Buttons */}
        <AppStoreButtons label={t.downloadLabel} />

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
        <div className="h-48 bg-hubbs-card rounded-2xl" />
        <div className="h-32 bg-hubbs-card rounded-2xl" />
        <div className="h-14 bg-hubbs-card rounded-xl" />
      </div>
    </div>
  );
}
