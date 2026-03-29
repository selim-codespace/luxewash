import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-white text-void hover:bg-gold shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_24px_0_rgba(201,168,76,0.3)]",
        destructive:
          "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
        secondary:
          "bg-smoke text-white hover:bg-smoke/80",
        ghost: "hover:bg-white/5 text-white hover:text-white",
        link: "text-gold underline-offset-4 hover:underline",
        premium: "bg-void border border-gold text-gold hover:bg-gold/10 shadow-[0_0_20px_rgba(201,168,76,0.2)]",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-none",
        sm: "h-8 rounded-none px-3 text-xs",
        lg: "h-12 rounded-none px-8 text-base",
        icon: "h-10 w-10 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    // We are simulating Radix Slot for simplicity, normally requires @radix-ui/react-slot
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
