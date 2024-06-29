// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

import { Gabarito } from "next/font/google";
import "./styles.css";

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gabarito",
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className={gabarito.variable}>{children}</body>
    </html>
  );
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Painting Description Generator",
  description: "Generate descriptions for paintings using AI.",
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
