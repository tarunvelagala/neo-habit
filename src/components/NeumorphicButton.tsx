import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'success' | 'warning' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  pressed?: boolean;
}

export const NeumorphicButton = forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ className, variant = 'default', size = 'md', pressed = false, children, ...props }, ref) => {
    const baseStyles = pressed ? 'neumorphic-pressed' : 'neumorphic-button';
    
    const variantStyles = {
      default: 'text-foreground',
      success: 'text-success-foreground bg-success hover:bg-success/90',
      warning: 'text-warning-foreground bg-warning hover:bg-warning/90', 
      accent: 'text-accent-foreground bg-accent hover:bg-accent/90',
      ghost: 'text-foreground bg-transparent hover:bg-muted/50'
    };
    
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          'font-medium focus:outline-none focus:ring-2 focus:ring-primary/20',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";