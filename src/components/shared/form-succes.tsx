import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({message}: FormSuccessProps) => {

  if (!message) return null;

  return(
    <div className="flex gap-2 items-center bg-success/10 !mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-success/75 text-success">
      <CircleCheck size={18} />
      {message}
    </div>
  )
}