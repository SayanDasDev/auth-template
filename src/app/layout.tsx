import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "A simple authentication template using NextAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>{children}</body>
    </html>
  );
}
