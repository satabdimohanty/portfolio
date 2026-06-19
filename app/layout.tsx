import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "../src/componets/smooth-scroll"

export const metadata: Metadata = {
  title: "Satabdi Mohanty | Frontend Developer (React & Next.js)",
  description: "Explore the portfolio of Satabdi Mohanty, a Frontend Developer specializing in React, Next.js, and crafting premium, high-performance web experiences.",
  keywords: [
    "Satabdi Mohanty",
    "Satabdi Mohanty Portfolio",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "React & Next.js Developer",
    "Web Developer Portfolio"
  ],
  authors: [{ name: "Satabdi Mohanty" }],
  creator: "Satabdi Mohanty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satabdi-dev.netlify.app", // Updated to Netlify URL
    title: "Satabdi Mohanty | Frontend Developer (React & Next.js)",
    description: "Explore the portfolio of Satabdi Mohanty, a Frontend Developer specializing in React, Next.js, and crafting premium, high-performance web experiences.",
    siteName: "Satabdi Mohanty Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satabdi Mohanty | Frontend Developer (React & Next.js)",
    description: "Explore the portfolio of Satabdi Mohanty, a Frontend Developer specializing in React, Next.js, and crafting premium, high-performance web experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google72af25a3baba3a4b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ colorScheme: "dark" }}>
      <body className="min-h-full bg-neutral-950 text-zinc-300 font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}