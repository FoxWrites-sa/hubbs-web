import HubbsLogo from "./HubbsLogo";
import AppStoreButtons from "./AppStoreButtons";

type ErrorType = "not_found" | "expired" | "network" | "unknown" | null;

const MESSAGES: Record<NonNullable<ErrorType>, { en: string; ar: string }> = {
  not_found: {
    en: "This invitation link is invalid or has already been used.",
    ar: "رابط الدعوة هذا غير صالح أو تم استخدامه بالفعل.",
  },
  expired: {
    en: "This invitation has expired. Ask the sender to send a new one.",
    ar: "انتهت صلاحية هذه الدعوة. اطلب من المُرسِل إرسال دعوة جديدة.",
  },
  network: {
    en: "Could not load the invitation. Check your connection and try again.",
    ar: "تعذّر تحميل الدعوة. تحقق من اتصالك وحاول مجدداً.",
  },
  unknown: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
};

export default function InvitationError({
  type,
  lang = "en",
}: {
  type: ErrorType;
  lang?: "en" | "ar";
}) {
  const msg = type ? MESSAGES[type][lang] : MESSAGES.unknown[lang];
  const title = lang === "ar" ? "رابط غير صالح" : "Invalid Invitation";
  const downloadLabel =
    lang === "ar" ? "تحميل هبس" : "Download Hubbs";

  return (
    <main className="min-h-screen bg-hubbs-dark flex flex-col items-center justify-center px-6 text-center">
      <HubbsLogo />
      <div className="mt-10 bg-hubbs-card rounded-2xl p-8 w-full max-w-sm">
        <div className="text-5xl mb-4">🔗</div>
        <h1 className="text-xl font-bold text-hubbs-text mb-3">{title}</h1>
        <p className="text-hubbs-subtle text-sm mb-8">{msg}</p>
        <AppStoreButtons label={downloadLabel} />
      </div>
    </main>
  );
}
