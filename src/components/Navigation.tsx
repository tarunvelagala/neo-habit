import { NeumorphicButton } from "@/components/NeumorphicButton";
import { ViewMode } from "@/types";
import { Calendar, Home, BarChart3, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const navItems = [
  { id: 'today' as ViewMode, label: 'Today', icon: Home },
  { id: 'weekly' as ViewMode, label: 'Weekly', icon: Calendar },
  { id: 'overall' as ViewMode, label: 'Overall', icon: BarChart3 },
];

export function Navigation({ currentView, onViewChange, darkMode, onToggleDarkMode }: NavigationProps) {
  return (
    <nav className="neumorphic p-2 mb-8">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="neumorphic p-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg" />
          </div>
          <h1 className="text-xl font-bold text-gradient">DayOne</h1>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <NeumorphicButton
                key={item.id}
                variant={isActive ? 'accent' : 'ghost'}
                size="sm"
                pressed={isActive}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex items-center gap-2",
                  isActive && "text-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NeumorphicButton>
            );
          })}
          
          {/* Dark mode toggle */}
          <div className="w-px h-6 bg-border mx-2" />
          <NeumorphicButton
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="flex items-center gap-2"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </NeumorphicButton>
        </div>
      </div>
    </nav>
  );
}