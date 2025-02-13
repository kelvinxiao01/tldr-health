import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tldr Health",
  description: "AI Powered Health Insurance Matcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
