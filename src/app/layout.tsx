import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontAccent = Caveat({
  variable: "--font-accent",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nasarawa",
  description: "Nasarawa is a creative studio working in media.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontAccent.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
