import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-magenta text-white hover:bg-brand-magenta/90 active:bg-brand-magenta/80",
        secondary:
          "bg-brand-dark text-white hover:bg-brand-dark/90 active:bg-brand-dark/80",
        outline:
          "border-2 border-brand-magenta text-brand-magenta bg-transparent hover:bg-brand-magenta hover:text-white",
        ghost:
          "text-brand-dark hover:bg-brand-gray-100",
        cyan:
          "bg-brand-cyan text-white hover:bg-brand-cyan/90",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#20b858]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        link: "text-brand-magenta underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
