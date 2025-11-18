import { Habit, JournalEntry } from "@/types";
import { NeumorphicCard } from "@/components/NeumorphicCard";
import { StreakGrid } from "@/components/StreakGrid";
import { TrendingUp, Target, Award, Flame } from "lucide-react";
import { isToday, parseISO, differenceInDays } from "date-fns";

interface OverallViewProps {
  habits: Habit[];
  journalEntries: JournalEntry[];
}

export function OverallView({ habits, journalEntries }: OverallViewProps) {
  // Calculate overall statistics
  const totalCompletions = habits.reduce((sum, h) => sum + h.completions.length, 0);
  
  const calculateStreak = (completions: string[]) => {
    if (completions.length === 0) return 0;
    
    const sortedDates = completions
      .map(d => parseISO(d))
      .sort((a, b) => b.getTime() - a.getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if the most recent completion was today or yesterday
    const lastCompletion = sortedDates[0];
    lastCompletion.setHours(0, 0, 0, 0);
    const daysDiff = differenceInDays(today, lastCompletion);
    
    if (daysDiff > 1) return 0; // Streak broken
    
    // Count consecutive days
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = sortedDates[i];
      const next = sortedDates[i + 1];
      current.setHours(0, 0, 0, 0);
      next.setHours(0, 0, 0, 0);
      
      const diff = differenceInDays(current, next);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak + 1;
  };

  const longestStreak = Math.max(...habits.map(h => {
    const sortedDates = h.completions
      .map(d => parseISO(d))
      .sort((a, b) => a.getTime() - b.getTime());
    
    let maxStreak = 0;
    let currentStreak = 0;
    
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const current = sortedDates[i];
        const prev = sortedDates[i - 1];
        current.setHours(0, 0, 0, 0);
        prev.setHours(0, 0, 0, 0);
        
        const diff = differenceInDays(current, prev);
        if (diff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    }
    
    return maxStreak;
  }), 0);

  const currentStreaks = habits.map(h => calculateStreak(h.completions));
  const bestCurrentStreak = Math.max(...currentStreaks, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-primary" />
          Overall Statistics
        </h1>
        <p className="text-muted-foreground">Your complete habit tracking history</p>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NeumorphicCard className="p-6 text-center">
          <Target className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">{habits.length}</div>
          <div className="text-sm text-muted-foreground">Total Habits</div>
        </NeumorphicCard>

        <NeumorphicCard className="p-6 text-center">
          <Award className="w-8 h-8 text-success mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">{totalCompletions}</div>
          <div className="text-sm text-muted-foreground">Total Completions</div>
        </NeumorphicCard>

        <NeumorphicCard className="p-6 text-center">
          <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">{bestCurrentStreak}</div>
          <div className="text-sm text-muted-foreground">Best Current Streak</div>
        </NeumorphicCard>

        <NeumorphicCard className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">{longestStreak}</div>
          <div className="text-sm text-muted-foreground">Longest Streak</div>
        </NeumorphicCard>
      </div>

      {/* Year View for Each Habit */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Annual Progress (Last 365 Days)</h2>
        
        {habits.length === 0 ? (
          <NeumorphicCard className="p-8 text-center">
            <p className="text-muted-foreground">No habits yet. Add your first habit to start tracking!</p>
          </NeumorphicCard>
        ) : (
          habits.map((habit, index) => {
            const currentStreak = currentStreaks[index];
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
                    <div className="flex gap-6 text-right">
                      <div>
                        <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
                        <div className="text-xs text-muted-foreground">Current Streak</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{habit.completions.length}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* Full Year Streak Grid */}
                  <div className="overflow-x-auto">
                    <StreakGrid completions={habit.completions} days={365} />
                  </div>
                </div>
              </NeumorphicCard>
            );
          })
        )}
      </div>
    </div>
  );
}
