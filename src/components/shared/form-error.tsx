import { TriangleAlert } from "lucide-react";

interface FromErrorProps {
  message?: string;
}

export const FromError = ({message}: FromErrorProps) => {

  if (!message) return null;

  return(
    <div className="flex gap-2 items-center bg-destructive/10 !mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-destructive/50 text-destructive/75">
      <TriangleAlert size={18} />
      {message}
    </div>
  )
}