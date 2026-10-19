import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#287A50",
};

export const metadata: Metadata = {
  title: {
    default: "RELEAF — Print Smarter. Reuse More. Waste Less.",
    template: "%s | RELEAF",
  },
  description:
    "RELEAF is a smart paper restoration and reuse concept combining document editing, AI assistance, intelligent printing, and paper-reuse workflows. Give every sheet another life.",
  keywords: [
    "smart printing",
    "paper reuse",
    "document restoration",
    "AI document editing",
    "de-inking",
    "sustainable printing",
    "RELEAF",
  ],
  authors: [{ name: "RELEAF" }],
  creator: "RELEAF",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://releaf.vercel.app",
    siteName: "RELEAF",
    title: "RELEAF — Print Smarter. Reuse More. Waste Less.",
    description:
      "Give every sheet another life. RELEAF combines intelligent document editing, AI assistance, and paper-reuse workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RELEAF — Smart Paper Restoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RELEAF — Print Smarter. Reuse More. Waste Less.",
    description: "Give every sheet another life with RELEAF.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
