import { NeumorphicButton } from "@/components/NeumorphicButton";
import { ViewMode } from "@/types";
import { Calendar, Home, BarChart3, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import dayOneLogo from "@/assets/dayone-logo.png";

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
    <nav className="neumorphic p-3 mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="neumorphic p-2 sm:p-3">
            <img 
              src={dayOneLogo} 
              alt="DayOne Logo" 
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground no-select">DayOne</h1>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
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
                  "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 touch-target no-select",
                  isActive && "text-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden xs:inline text-xs sm:text-sm">{item.label}</span>
              </NeumorphicButton>
            );
          })}
          
          {/* Dark mode toggle */}
          <div className="w-px h-4 sm:h-6 bg-border mx-1 sm:mx-2" />
          <NeumorphicButton
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="flex items-center gap-1 sm:gap-2 touch-target no-select"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="sr-only">Toggle dark mode</span>
          </NeumorphicButton>
        </div>
      </div>
    </nav>
  );
}