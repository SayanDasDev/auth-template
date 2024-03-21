import { CircleAlert } from "lucide-react";

interface FormWarningProps {
  message?: string;
}

export const FormWarning = ({message}: FormWarningProps) => {

  if (!message) return null;

  return(
    <div className="flex gap-2 items-center bg-warning/10 !mt-6 rounded-sm px-6 text-base font-semibold py-3 border border-warning/75 text-warning">
      <CircleAlert size={18} />
      {message}
    </div>
  )
}