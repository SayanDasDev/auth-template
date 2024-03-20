import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const poppins = Poppins({subsets: ["latin"], weight: ["700"]})

interface HeaderProps {
  label: string
}

export const Header = ({label}: HeaderProps) => {
  return(
    <div className="space-y-4">
      <h1 className={cn("text-4xl texpri font-semibold text-center tracking-tighter text-primary", poppins.className)}>🔐 Auth</h1>
      <p className="text-lg text-muted-foreground text-center">{label}</p>
    </div>
  )
}