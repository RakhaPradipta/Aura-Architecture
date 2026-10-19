import type { Metadata, Viewport } from "next";
import { Cormorant, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant({
  subsets: ["latin"],
  // Dipangkas 5 → 3 weight: hemat ~60KB font
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  // Dipangkas 4 → 2 weight untuk body
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// Technical annotations, dimensions and sheet numbers read in mono.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  // Hanya 400: anotasi tidak butuh 500
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080e15",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://auraarchitecture.com"),
  title: {
    default: "Aura Architecture — Designing Spaces That Breathe",
    template: "%s | Aura Architecture",
  },
  description:
    "Award-winning architecture studio specializing in residential, commercial, and interior design. We create spaces that harmonize people, nature, and light.",
  keywords: [
    "architecture",
    "interior design",
    "residential design",
    "commercial architecture",
    "urban planning",
    "minimalist design",
    "sustainable architecture",
  ],
  openGraph: {
    title: "Aura Architecture — Designing Spaces That Breathe",
    description:
      "Award-winning architecture studio specializing in residential, commercial, and interior design.",
    url: "https://auraarchitecture.com",
    siteName: "Aura Architecture",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Architecture — Designing Spaces That Breathe",
    description:
      "Villa tropis, kantor, dan ruang publik — kolom, vault, dan material jujur.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://auraarchitecture.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Preconnect ke origin gambar remote — hemat 100-300ms TLS */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
