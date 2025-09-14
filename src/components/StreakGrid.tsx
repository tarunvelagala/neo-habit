import { cn } from "@/lib/utils";
import { format, eachDayOfInterval, subDays, parseISO, isSameDay } from "date-fns";

interface StreakGridProps {
  completions: string[]; // ISO date strings
  className?: string;
  days?: number; // how many days to show
}

export function StreakGrid({ completions, className, days = 365 }: StreakGridProps) {
  const today = new Date();
  const startDate = subDays(today, days - 1);
  
  // Generate array of all dates in the range
  const dateRange = eachDayOfInterval({ start: startDate, end: today });
  
  // Create completion lookup for better performance
  const completionDates = new Set(
    completions.map(dateStr => {
      try {
        return format(parseISO(dateStr), 'yyyy-MM-dd');
      } catch {
        return '';
      }
    }).filter(Boolean)
  );

  // Group dates by week for grid layout
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  dateRange.forEach((date, index) => {
    currentWeek.push(date);
    
    // Start a new week every 7 days or at the end
    if ((index + 1) % 7 === 0 || index === dateRange.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {/* Days of week labels */}
      <div className="flex gap-1 text-xs text-muted-foreground mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="w-3 h-3 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      
      {/* Streak grid */}
      <div className="flex flex-col gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-1">
            {week.map((date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const isCompleted = completionDates.has(dateStr);
              const isToday = isSameDay(date, today);
              
              return (
                <div
                  key={dateStr}
                  className={cn(
                    isCompleted ? 'streak-cell-filled' : 'streak-cell-empty',
                    isToday && 'ring-1 ring-primary/50',
                  )}
                  title={`${format(date, 'MMM d, yyyy')}${isCompleted ? ' - Completed' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
        <span>Less</span>
        <div className="streak-cell-empty" />
        <div className="streak-cell-filled opacity-30" />
        <div className="streak-cell-filled opacity-60" />
        <div className="streak-cell-filled" />
        <span>More</span>
      </div>
    </div>
  );
}