import type { Metadata } from "next";
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

const title = "Rahul Chimata — Robotics & Software Engineer";
const description =
  "Rahul Chimata’s engineering portfolio: enterprise AI, robotics research, infrastructure software, embedded systems, and computer vision.";

export const metadata: Metadata = {
  metadataBase: new URL("https://engineering-portfolio-lab.bcazrm.chatgpt.site"),
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
