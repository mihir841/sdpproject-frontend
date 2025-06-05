import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700",
        outline: "border border-primary-200 bg-transparent hover:bg-primary-50 text-primary-700",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
        accent: "bg-accent-500 text-gray-900 hover:bg-accent-600",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-primary-700",
        link: "text-primary-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, children, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, fullWidth, className }));

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(buttonClasses, children.props.className),
        ref,
      });
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;