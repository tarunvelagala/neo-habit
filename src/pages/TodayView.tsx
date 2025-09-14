import { useState, useMemo } from "react";
import { NeumorphicCard } from "@/components/NeumorphicCard";
import { HabitCard } from "@/components/HabitCard";
import { QuickAddHabit } from "@/components/QuickAddHabit";
import { JournalEditor } from "@/components/JournalEditor";
import { Habit, JournalEntry, StreakData } from "@/types";
import { format } from "date-fns";
import { Calendar, Target, TrendingUp } from "lucide-react";

interface TodayViewProps {
  habits: Habit[];
  journalEntries: JournalEntry[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
  onToggleHabit: (habitId: string) => void;
  onSaveJournal: (content: string) => void;
  selectedDate: string;
}

export function TodayView({ 
  habits, 
  journalEntries, 
  onAddHabit, 
  onToggleHabit, 
  onSaveJournal,
  selectedDate 
}: TodayViewProps) {
  const today = selectedDate;
  const todayEntry = journalEntries.find(entry => entry.date === today);

  // Calculate streak data for each habit
  const habitStreakData = useMemo(() => {
    const streakMap = new Map<string, StreakData>();
    
    habits.forEach(habit => {
      const completions = habit.completions.sort();
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      
      // Calculate streaks (simplified logic)
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      // Check if completed today or yesterday for current streak
      const completedToday = completions.includes(format(today, 'yyyy-MM-dd'));
      const completedYesterday = completions.includes(format(yesterday, 'yyyy-MM-dd'));
      
      if (completedToday) {
        currentStreak = 1;
        // Count backward from today
        for (let i = 1; i < 365; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          if (completions.includes(format(checkDate, 'yyyy-MM-dd'))) {
            currentStreak++;
          } else {
            break;
          }
        }
      } else if (completedYesterday) {
        // Count backward from yesterday
        for (let i = 0; i < 365; i++) {
          const checkDate = new Date(yesterday);
          checkDate.setDate(yesterday.getDate() - i);
          if (completions.includes(format(checkDate, 'yyyy-MM-dd'))) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
      
      // Calculate longest streak (simplified)
      longestStreak = Math.max(currentStreak, completions.length > 0 ? 1 : 0);
      
      streakMap.set(habit.id, {
        habitId: habit.id,
        currentStreak,
        longestStreak,
        totalCompletions: completions.length,
        lastCompletion: completions[completions.length - 1]
      });
    });
    
    return streakMap;
  }, [habits]);

  // Check if habit is completed today
  const isHabitCompleted = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    return habit?.completions.includes(today) || false;
  };

  // Calculate today's stats
  const completedToday = habits.filter(habit => isHabitCompleted(habit.id)).length;
  const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Today Header */}
      <NeumorphicCard className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">
            {format(new Date(today), 'EEEE, MMMM d')}
          </h2>
        </div>
        
        {/* Daily Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{completedToday}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{habits.length}</div>
            <div className="text-sm text-muted-foreground">Total Habits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
      </NeumorphicCard>

      {/* Habits Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" />
            Today's Habits
          </h3>
          {habits.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {completedToday} of {habits.length} complete
            </div>
          )}
        </div>

        {habits.length === 0 ? (
          <NeumorphicCard className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No habits yet</h3>
            <p className="text-muted-foreground mb-6">
              Start building better habits today. Add your first habit below!
            </p>
          </NeumorphicCard>
        ) : (
          <div className="grid gap-4">
            {habits.map(habit => {
              const streakData = habitStreakData.get(habit.id) || {
                habitId: habit.id,
                currentStreak: 0,
                longestStreak: 0,
                totalCompletions: 0
              };
              
              return (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  streakData={streakData}
                  isCompleted={isHabitCompleted(habit.id)}
                  onToggleComplete={onToggleHabit}
                />
              );
            })}
          </div>
        )}

        {/* Quick Add Habit */}
        <QuickAddHabit onAddHabit={onAddHabit} />
      </div>

      {/* Journal Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Daily Reflection
        </h3>
        
        <JournalEditor
          entry={todayEntry}
          date={today}
          onSave={onSaveJournal}
        />
      </div>
    </div>
  );
}