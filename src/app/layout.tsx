import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classicals Live",
  description: "Find Concerts Near You",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [
    { name: "Dongji Yang" },
    {
      name: "Dongji Yang",
      url: "https://www.linkedin.com/in/dongjiy/",
    },
  ],
  appleWebApp: {
    title: "Classicals Live",
    startupImage: [
      {
        url: "/splash/launch-640x1136.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-750x1294.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-1242x2148.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-1125x2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-1536x2048.png",
        media:
          "(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-1668x2224.png",
        media:
          "(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/launch-2048x2732.png",
        media:
          "(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#111827",
    },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: "deviceWidth",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        async
        src="https://analytics.eu.umami.is/script.js"
        data-website-id="4fe38e74-a1ff-460c-9fbc-27e6a33674e4"
      ></Script>
    </html>
  );
}
