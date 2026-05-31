import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  title: "Hubbs — The Family App for Muslim Families",
  description:
    "Hubbs is the family wellness app for Muslim families — prayer tracker, habit tracking, AI buddy, daily du'aa, and family calendar. Available on iOS.",
  openGraph: {
    title: "Hubbs — The Family App for Muslim Families",
    description:
      "Hubbs is the family wellness app for Muslim families — prayer tracker, habit tracking, AI buddy, daily du'aa, and family calendar. Available on iOS.",
    url: "https://hubbsapp.com",
    siteName: "Hubbs",
    images: [{ url: "/images/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubbs — The Family App for Muslim Families",
    description:
      "Hubbs is the family wellness app for Muslim families — prayer tracker, habit tracking, AI buddy, daily du'aa, and family calendar. Available on iOS.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
