import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "font-bold cursor-pointer",
        destructive: "bg-red-500 text-slate-50",
        outline: "border border-neutral-800 bg-white",
        secondary: "bg-slate-100 text-slate-900",
        ghost: "hover:bg-slate-100",
        link: "text-slate-900 underline-offset-4",
      },
      bgColor: {
        yellow: "bg-yellow",
        magenta: "bg-magenta",
        purple: "bg-purple",
        blue: "bg-blue",
        green: "bg-green",
      },
      size: {
        default: "h-10 px-4 text-lg w-full",
        link: "",
        min: "h-10 px-4 text-lg",
        sm: "h-8 font-bold w-full px-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, bgColor, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, bgColor, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
