import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "#/auth";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "A simple authentication template using NextAuth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={dm.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
