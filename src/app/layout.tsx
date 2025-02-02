import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dream_Sketch_AI",
 description:
    "Generate stunning images from text using AI models for free with StableMax. Turn your ideas into visual art instantly.",
  openGraph: {
    title: "StableMax - Free AI Image Generation",
    description: "Turn your text into images with our free AI-powered tool",
  },
  twitter: {
    card: "summary_large_image",
    title: "StableMax - Free AI Image Generation",
    description: "Turn your text into images with our free AI-powered tool",
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
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <Provider>
            <Header />
            {children}
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  );
}
