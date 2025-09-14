import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface NeumorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'inset' | 'hover';
  padding?: 'sm' | 'md' | 'lg';
}

export const NeumorphicCard = forwardRef<HTMLDivElement, NeumorphicCardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variantStyles = {
      default: 'neumorphic',
      inset: 'neumorphic-inset',
      hover: 'habit-card'
    };
    
    const paddingStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantStyles[variant],
          paddingStyles[padding],
          'bg-card text-card-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeumorphicCard.displayName = "NeumorphicCard";