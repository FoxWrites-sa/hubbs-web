type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { box: string; text: string }> = {
  sm: { box: "w-8 h-8 text-base",  text: "text-xl" },
  md: { box: "w-10 h-10 text-lg",  text: "text-3xl" },
  lg: { box: "w-14 h-14 text-2xl", text: "text-5xl" },
};

export default function HubbsLogo({ size = "md" }: { size?: Size }) {
  const s = sizeMap[size];
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${s.box} bg-hubbs-primary rounded-2xl flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white font-black leading-none">H</span>
      </div>
      <span className={`${s.text} font-black text-hubbs-text tracking-tight`}>
        hubbs
      </span>
    </div>
  );
}
