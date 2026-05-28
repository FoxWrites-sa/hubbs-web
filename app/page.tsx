import HubbsLogo from "@/components/HubbsLogo";
import AppStoreButtons from "@/components/AppStoreButtons";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-hubbs-dark flex flex-col items-center justify-center px-6 text-center">
      <HubbsLogo size="lg" />
      <p className="mt-3 text-hubbs-subtle text-lg">Family &amp; Life Planner</p>
      <p className="mt-6 text-hubbs-text max-w-sm">
        Build better habits, stay connected, and grow together as a family.
      </p>
      <div className="mt-10">
        <AppStoreButtons />
      </div>
    </main>
  );
}
