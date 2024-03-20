import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="space-y-6 text-center select-none">
        <h1
          className={cn("text-8xl font-bold text-primary", poppins.className)}
        >
          🔐 Auth
        </h1>
        <p className="text-xl text-foreground">
          A simple authentiction Service
        </p>
        <LoginButton>
          <Button
            className="rounded-[1rem] !mt-10"
            size={"xl"}
          >
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
