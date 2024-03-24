import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "./_components/navbar";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "A simple authentication template using NextAuth",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full bg-background flex flex-col items-center space-y-2 justify-center p-2">
      <h1 className={cn("text-4xl font-bold text-primary mb-8", poppins.className)}>
        🔐 Auth
      </h1>
      <Navbar />
      {children}
    </div>
  );
}
