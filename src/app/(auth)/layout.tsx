import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Image from "next/image";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "A simple authentication template using NextAuth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
