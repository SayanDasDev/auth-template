import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface FormSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const FormSuccess = ({message, ...props}: FormSuccessProps) => {

  if (!message) return null;

  return(
    <div {...props} className={cn(
      "flex gap-2 items-center bg-success/10 !mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-success/75 text-success",
      props.className
    )}>
      <CircleCheck size={18} />
      {message}
    </div>
  )
}