import { cn } from "@/lib/utils";

interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  dotsclassname?: string;
}

export const LoadingDots = ({className, dotsclassname}:LoadingDotsProps) => {
  return (
    <div className={cn("flex gap-2",)}>
      <div className={cn("w-2 h-2 rounded-full animate-pulse animate-duration-500 bg-primary-foreground", dotsclassname)}></div>
      <div className={cn("w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-200 bg-primary-foreground", dotsclassname)}></div>
      <div className={cn("w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-500 bg-primary-foreground", dotsclassname)}></div>
    </div>
  );
};
