import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hubbs — Smart Hubs, Connected Living",
  description: "Build better habits, strengthen family bonds, and grow together — all in one app designed for modern families.",
  openGraph: {
    title: "Hubbs — Smart Hubs, Connected Living",
    description: "Build better habits, strengthen family bonds, and grow together with Hubbs.",
    siteName: "Hubbs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
