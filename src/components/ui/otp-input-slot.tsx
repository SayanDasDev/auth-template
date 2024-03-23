import { cn } from "@/lib/utils";
import { SlotProps } from "input-otp";
import FakeCaret from "./fake-caret";

export default function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-12 h-14 text-[2rem] text-primary',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-border border-y border-r first:border-l first:rounded-l-lg last:rounded-r-lg',
        'group-hover:border-accent-foreground/20 group-focus-within:border-ring/20',
        'outline outline-0 outline-ring/50',
        { 'outline-2 outline-ring': props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}