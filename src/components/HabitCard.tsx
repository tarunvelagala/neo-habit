import { NeumorphicCard } from "@/components/NeumorphicCard";
import { NeumorphicButton } from "@/components/NeumorphicButton";
import { Habit, StreakData } from "@/types";
import { Check, Flame, Calendar, Target, Trash2 } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
  streakData: StreakData;
  isCompleted: boolean;
  onToggleComplete: (habitId: string) => void;
  onDelete?: (habitId: string) => void;
  onEdit?: (habit: Habit) => void;
}

export function HabitCard({ habit, streakData, isCompleted, onToggleComplete, onDelete, onEdit }: HabitCardProps) {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  // Recent completions for mini streak display
  const recentCompletions = habit.completions
    .slice(-7)
    .map(dateStr => {
      try {
        return parseISO(dateStr);
      } catch {
        return null;
      }
    })
    .filter(Boolean) as Date[];

  return (
    <NeumorphicCard 
      variant="hover"
      className="group cursor-pointer"
      onClick={() => onEdit?.(habit)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-muted-foreground">{habit.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {/* Delete Button */}
          {onDelete && (
            <NeumorphicButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(habit.id);
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </NeumorphicButton>
          )}
          
          {/* Completion Button */}
          <NeumorphicButton
            variant={isCompleted ? 'success' : 'default'}
            size="sm"
            pressed={isCompleted}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(habit.id);
            }}
            className={cn(
              isCompleted && "bg-success hover:bg-success/90"
            )}
          >
            <Check className="w-4 h-4" />
          </NeumorphicButton>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-4">
          {/* Current Streak */}
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-warning" />
            <span>{streakData.currentStreak} day{streakData.currentStreak !== 1 ? 's' : ''}</span>
          </div>
          
          {/* Frequency */}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{habit.frequency}</span>
          </div>
          
          {/* Total */}
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>{streakData.totalCompletions} total</span>
          </div>
        </div>
        
        {/* Best Streak */}
        <div className="text-xs">
          Best: {streakData.longestStreak} day{streakData.longestStreak !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Mini Streak Visualization */}
      <div className="flex gap-1">
        {Array.from({ length: 7 }, (_, i) => {
          const dayOffset = 6 - i; // Start from 6 days ago
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() - dayOffset);
          
          const hasCompletion = recentCompletions.some(date => 
            date && format(date, 'yyyy-MM-dd') === format(targetDate, 'yyyy-MM-dd')
          );
          
          const isCurrentDay = isToday(targetDate);
          
          return (
            <div
              key={i}
              className={cn(
                "flex-1 h-2 rounded-sm",
                hasCompletion ? 'streak-cell-filled' : 'streak-cell-empty',
                isCurrentDay && 'ring-1 ring-primary/50'
              )}
              title={format(targetDate, 'MMM d')}
            />
          );
        })}
      </div>
    </NeumorphicCard>
  );
}