import { Habit, JournalEntry } from "@/types";
import { NeumorphicCard } from "@/components/NeumorphicCard";
import { StreakGrid } from "@/components/StreakGrid";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { Calendar, TrendingUp } from "lucide-react";

interface WeeklyViewProps {
  habits: Habit[];
  journalEntries: JournalEntry[];
  selectedDate: string;
}

export function WeeklyView({ habits, journalEntries, selectedDate }: WeeklyViewProps) {
  const currentDate = new Date(selectedDate);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

  // Calculate weekly completion rate for each habit
  const getWeeklyStats = (habit: Habit) => {
    const weekDays = 7;
    const completionsThisWeek = habit.completions.filter(dateStr => {
      const date = new Date(dateStr);
      return date >= weekStart && date <= weekEnd;
    }).length;
    
    return {
      completed: completionsThisWeek,
      total: weekDays,
      rate: Math.round((completionsThisWeek / weekDays) * 100)
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-8 h-8 text-primary" />
          Weekly Overview
        </h1>
        <p className="text-muted-foreground">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </p>
      </div>

      {/* Weekly Stats Summary */}
      <NeumorphicCard className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {habits.reduce((sum, h) => sum + getWeeklyStats(h).completed, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Completions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{habits.length}</div>
            <div className="text-sm text-muted-foreground">Active Habits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {habits.length > 0 
                ? Math.round(
                    habits.reduce((sum, h) => sum + getWeeklyStats(h).rate, 0) / habits.length
                  )
                : 0}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Completion</div>
          </div>
        </div>
      </NeumorphicCard>

      {/* Habits with Weekly Streak Grids */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Habit Progress (Last 30 Days)
        </h2>
        
        {habits.length === 0 ? (
          <NeumorphicCard className="p-8 text-center">
            <p className="text-muted-foreground">No habits yet. Add your first habit to start tracking!</p>
          </NeumorphicCard>
        ) : (
          habits.map(habit => {
            const stats = getWeeklyStats(habit);
            return (
              <NeumorphicCard key={habit.id} className="p-6">
                <div className="space-y-4">
                  {/* Habit Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{habit.name}</h3>
                      {habit.description && (
                        <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{stats.rate}%</div>
                      <div className="text-xs text-muted-foreground">
                        {stats.completed}/{stats.total} this week
                      </div>
                    </div>
                  </div>

                  {/* Streak Grid */}
                  <StreakGrid completions={habit.completions} days={30} />
                </div>
              </NeumorphicCard>
            );
          })
        )}
      </div>
    </div>
  );
}
