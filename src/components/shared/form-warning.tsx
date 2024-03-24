import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

interface FormWarningProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const FormWarning = ({message, ...props}: FormWarningProps) => {

  if (!message) return null;

  return(
    <div {...props} className={cn(
      "flex gap-2 items-center bg-warning/10 !mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-warning/75 text-warning",
      props.className
    )}>
      <CircleAlert size={18} />
      {message}
    </div>
  )
}