import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-none border border-white/10 bg-void px-4 py-2 text-sm text-white transition-all",
              "focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder:text-text-tertiary",
              error && "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/30",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Gradient sweep line effect on focus */}
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold transition-all duration-300 peer-focus:w-full" />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
