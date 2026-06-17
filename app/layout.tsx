import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "../src/componets/smooth-scroll"

export const metadata: Metadata = {
  title: "Satabdi Mohanty - Developer & Designer | Portfolio",
  description: "Developer & Designer with a passion for creating user-friendly solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-neutral-950 text-zinc-300 font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}