import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const FormError = ({message, ...props}: FormErrorProps) => {

  if (!message) return null;

  return(
    <div {...props} className={cn(
        "flex gap-2 items-center bg-destructive/10 mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-destructive/50 text-destructive/75",
        props.className
      )}>
      <TriangleAlert size={18} />
      {message}
    </div>
  )
}