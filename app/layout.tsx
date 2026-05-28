import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hubbs – Family & Life Planner",
  description: "Build better habits together with Hubbs",
  openGraph: {
    title: "Hubbs – Family & Life Planner",
    description: "Build better habits together with Hubbs",
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
