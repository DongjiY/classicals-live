import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classicals Live",
  description: "Find Concerts Near You",
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
