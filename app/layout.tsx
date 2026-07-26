import type { Metadata } from "next";
import "./globals.css";

const title = "Rahul Chimata — Robotics & Software Engineer";
const description =
  "Rahul Chimata’s engineering portfolio: enterprise AI, robotics research, infrastructure software, embedded systems, and computer vision.";
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = deploymentHost
  ? `https://${deploymentHost}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/og-rahul.png",
        width: 1536,
        height: 1024,
        alt: "Rahul Chimata engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-rahul.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
