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
  icons: [
    { rel: "apple-touch-icon", url: "icons/Icon-196x196.png" },
    { rel: "icon", url: "icons/Icon-196x196.png" },
  ],
};
export const viewport: Viewport = {
  themeColor: "#ffffff",
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
